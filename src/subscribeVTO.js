import gql from "graphql-tag";

export default gql`
  subscription SUBSCRIBEVTO {
    GetNode(type: "vto", under: "1ac090cf-b5e1-4178-b7b0-e9b07c675d68") {
      node {
        name
      }
      operation {
        action
        path
      }
    }
  }
`;
