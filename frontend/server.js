import express from 'express';
import axios from 'axios';

const app = express();

// Set up a route to proxy the API request
app.get('/api/initialize-transaction', async (req, res) => {
  const apiUrl = 'https://api.chapa.co/v1/transaction/initialize';
  const response = await axios.post(apiUrl, req.query);

  // Forward the API response to the frontend
  res.json(response.data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
