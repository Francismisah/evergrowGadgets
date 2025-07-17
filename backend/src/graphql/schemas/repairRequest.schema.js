const { gql } = require('graphql-tag');

const repairRequestSchema = gql`

type RepairRequest {
  id: ID!
  user: User!
  commodity: String!
  complaint: String!
  imageUrl: String!
  status: String!
  createdAt: String!
}

input RepairRequestInput {
  commodity: String!
  complaint: String!
}

type Mutation {
  createRepairRequest(input: RepairRequestInput!, image: Upload!): RepairRequest!
}

type Query {
  repairRequests: [RepairRequest!]!
}
`;

module.exports = repairRequestSchema;