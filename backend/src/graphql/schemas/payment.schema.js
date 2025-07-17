const { gql } = require('graphql-tag');

module.exports = `
  type Payment {
    id: ID!
    orderId: String!
    amount: Float!
    status: String!
    authorizationUrl: String
    createdAt: String!
  }

  type VerifyResponse {
    id: ID!
    orderId: String!
    amount: Float!
    status: String!
    createdAt: String!
  }

  input PaymentInput {
    orderId: String!
    amount: Float!
  }

  type Mutation {
    processPayment(input: PaymentInput!): Payment!
    verifyPayment(reference: String!): VerifyResponse!
  }
`;