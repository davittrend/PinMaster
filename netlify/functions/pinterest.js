const fetch = require('node-fetch');

exports.handler = async (event) => {
  console.log('Received request:', event.httpMethod);
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    const { code, redirect_uri } = JSON.parse(event.body || '{}');
    
    if (!code) {
      console.error('Missing authorization code');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Authorization code is required' })
      };
    }

    const clientId = process.env.VITE_PINTEREST_CLIENT_ID;
    const clientSecret = process.env.VITE_PINTEREST_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Server configuration error: Missing credentials');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect_uri || process.env.VITE_REDIRECT_URI
    });

    console.log('Requesting token from Pinterest...');
    const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: params
    });

    const responseText = await response.text();
    console.log('Pinterest API response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error('Failed to parse Pinterest response:', error);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: 'Invalid response from Pinterest',
          message: responseText
        })
      };
    }

    if (!response.ok) {
      console.error('Pinterest API error:', data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: 'Pinterest API error',
          message: data.message || 'Failed to exchange code for token',
          details: data
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Internal server error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred'
      })
    };
  }
};