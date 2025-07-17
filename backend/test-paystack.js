require('dotenv').config();
const axios = require('axios');

axios
  .post(
    'https://api.paystack.co/transaction/initialize',
    {
      amount: 5998,
      email: 'chiamakamichael58@gmail.com',
      reference: `test_${Date.now()}`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  .then(response => console.log('Success:', response.data))
  .catch(error => console.error('Error:', error.response?.data || error.message));