const axios = require('axios');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Extract authorization code from query parameters (not from the body)
    const { code } = event.queryStringParameters || {};
    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Authorization code is missing' }),
      };
    }

    // Token Exchange
    const tokenResponse = await axios.post('https://api.pinterest.com/v5/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: '1507772',
      client_secret: '12e86e7dd050a39888c5e753908e80fae94f7367',
      redirect_uri: 'https://pinmaster.netlify.app/callback',
    });

    // Fetch User Info
    const userResponse = await axios.get('https://api.pinterest.com/v5/user_account', {
      headers: {
        Authorization: `Bearer ${tokenResponse.data.access_token}`,
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        access_token: tokenResponse.data.access_token,
        user: userResponse.data,
      }),
    };
  } catch (error) {
    console.error('Authentication Error:', error.response ? error.response.data : error.message);
    return {
      statusCode: error.response ? error.response.status : 500,
      headers,
      body: JSON.stringify({
        error: error.response ? error.response.data : 'Internal Server Error',
      }),
    };
  }
};
