const { gql } = require('graphql-tag');

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    mediaUrls: [String]!
    owner: ID!
  }

  type Query {
    products: [Product!]!
    product(id: String!): Product
  }

  type Mutation {
    createProduct(
      name: String!
      description: String
      price: Float!
      mediaUrls: [String!]
    ): Product!
    updateProduct(
      id: String!
      name: String
      description: String
      price: Float
      mediaUrls: [String!]
    ): Product!
    deleteProduct(id: String!): String!
  }
`;