import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Token exchange endpoint
app.post('/api/oauth/token', async (req, res) => {
  try {
    const { code } = req.body;
    
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.VITE_REDIRECT_URI,
    });

    const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.VITE_PINTEREST_CLIENT_ID}:${process.env.VITE_PINTEREST_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Pinterest API error:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pinterest API proxy
app.all('/api/pinterest/*', async (req, res) => {
  try {
    const pinterestPath = req.path.replace('/api/pinterest', '');
    const url = `https://api.pinterest.com/v5${pinterestPath}`;
    
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Pinterest API error:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});