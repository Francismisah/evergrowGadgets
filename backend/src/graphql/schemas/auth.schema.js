const { gql } = require('graphql-tag');

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    name: String
    role: String!
    isVerified: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type SignupResponse {
    message: String!
  }

  type Query {
    me: User!
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!, name: String, role: String): SignupResponse!
    login(email: String!, password: String!): AuthPayload!
    verifyEmail(email: String!, otp: String!): AuthPayload!
    sendOtp(email: String!): Boolean!
    googleAuth(code: String!): AuthPayload!
  }`;