import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import App from "./App";
import client from "./client";


ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
          <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
