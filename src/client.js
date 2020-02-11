import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, Observable, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
  uri: "/graphql"
});

const wsLink = new WebSocketLink({
  uri: `ws://saasmasterdev.azurewebsites.net/`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjRmZGEyNzZiLTVmMjktNDg0ZS05MTBmLTJjMDg4MzVjNjQ0YiIsIm5iZiI6MTU4MTM5NjQ1MiwiZXhwIjoxNTgxNDgyODUyLCJpYXQiOjE1ODEzOTY0NTJ9.aZ6wXOU7vnCWEiKN0MvFY3WfszZ8LbbPoLdjm0eIPV8"
  },
  }
});

const requestLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authenticate = operation => {

  operation.setContext({
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjRmZGEyNzZiLTVmMjktNDg0ZS05MTBmLTJjMDg4MzVjNjQ0YiIsIm5iZiI6MTU4MTM5NjQ1MiwiZXhwIjoxNTgxNDgyODUyLCJpYXQiOjE1ODEzOTY0NTJ9.aZ6wXOU7vnCWEiKN0MvFY3WfszZ8LbbPoLdjm0eIPV8"
    }
  });
};

const authLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => authenticate(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export default new ApolloClient({
  link: ApolloLink.from([authLink, requestLink]),
  cache: new InMemoryCache()
});