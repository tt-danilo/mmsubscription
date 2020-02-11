import gql from "graphql-tag";

export default gql`
  mutation UpdateVTO($id: String!, $name: String!) {
    updateNode(node: { id: $id, name: $name }) {
      id
      name
    }
  }
`;
