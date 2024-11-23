const axios = require('axios');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Extract authorization code from query parameters
    const { code } = event.queryStringParameters || {};
    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Authorization code is missing' }),
      };
    }

    // Exchange the code for an access token
    const tokenResponse = await axios.post('https://api.pinterest.com/v5/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: '1507772',  // Replace with your Pinterest App ID
      client_secret: '12e86e7dd050a39888c5e753908e80fae94f7367',  // Replace with your Pinterest App Secret
      redirect_uri: 'https://pinmaster.netlify.app/callback',  // Ensure this matches Pinterest app settings
    });

    // Handle successful token exchange
    if (tokenResponse.data.access_token) {
      const accessToken = tokenResponse.data.access_token;

      // Now you can fetch user information or take other actions
      const userResponse = await axios.get('https://api.pinterest.com/v5/user_account', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // You can store the access token and user data as needed
      console.log(userResponse.data); // Log or store user info in session, DB, etc.

      // Optionally, send a response or redirect the user
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Pinterest authentication successful!',
          user: userResponse.data,  // Or handle the user data as you wish
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve access token from Pinterest' }),
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
