const ContactService = require('../../services/contact.service');

module.exports = {
  Mutation: {
    sendContactMessage: async (_, { input }) => {
      return await ContactService.sendContactMessage(input);
    },
  },
};