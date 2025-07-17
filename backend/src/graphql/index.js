const gql = require('graphql-tag');
const { GraphQLUpload } = require('graphql-upload');
const authSchema = require('./schemas/auth.schema');
const productSchema = require('./schemas/product.schema');
const orderSchema = require('./schemas/order.schema');
const paymentSchema = require('./schemas/payment.schema');
const repairRequestSchema = require('./schemas/repairRequest.schema');
const contactSchema = require('./schemas/contact.schema');
const authResolvers = require('./resolvers/auth.resolver');
const productResolvers = require('./resolvers/product.resolver');
const orderResolvers = require('./resolvers/order.resolver');
const paymentResolvers = require('./resolvers/payment.resolver');
const repairRequestResolvers = require('./resolvers/repairRequest.resolver');
const contactResolvers = require('./resolvers/contact.resolver');

const baseSchema = gql`
  scalar Upload
`;

module.exports = {
  typeDefs: [
    baseSchema,
    authSchema,
    productSchema,
    orderSchema,
    paymentSchema,
    repairRequestSchema,
    contactSchema,
  ],
  resolvers: [
    { Upload: GraphQLUpload },
    authResolvers,
    productResolvers,
    orderResolvers,
    paymentResolvers,
    repairRequestResolvers,
    contactResolvers,
  ],
};