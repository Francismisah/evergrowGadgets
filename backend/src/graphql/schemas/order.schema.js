const { gql } = require('graphql-tag');

module.exports = gql`
  type Order {
    id: ID!
    user: String!
    products: [OrderItem!]!
    total: Float!
    status: String!
    createdAt: String!
  }

  type OrderItem {
    productId: String!
    quantity: Int!
    price: Float!
  }

  type Query {
    orders: [Order!]!
    order(id: String!): Order
  }

  type Mutation {
    createOrder(products: [OrderItemInput!]!): Order!
  }

  input OrderItemInput {
    productId: String!
    quantity: Int!
  }
`;