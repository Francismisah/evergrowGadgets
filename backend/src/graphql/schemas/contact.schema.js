const { gql } = require('graphql-tag');

module.exports = gql`
type ContactResponse {
  success: Boolean!
  message: String!
}

input ContactInput {
  name: String!
  email: String!
  message: String!
}

type Mutation {
  sendContactMessage(input: ContactInput!): ContactResponse!
}`;