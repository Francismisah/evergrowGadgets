const RepairRequestService = require('../../services/repairRequest.service');

module.exports = {
  Mutation: {
    createRepairRequest: async (_, { input, image }, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await RepairRequestService.createRepairRequest(input, image, user);
    },
  },
  Query: {
    repairRequests: async (_, __, { user }) => {
      if (!user || user.role !== 'seller') throw new Error('Requires seller role');
      return await RepairRequestService.getRepairRequests();
    },
  },
};