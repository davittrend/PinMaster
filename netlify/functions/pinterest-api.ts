import { Handler } from '@netlify/functions';

const PINTEREST_API_URL = 'https://api-sandbox.pinterest.com/v5';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const path = event.queryStringParameters?.path;
  const authorization = event.headers.authorization;

  if (!authorization) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization required' })
    };
  }

  try {
    const response = await fetch(`${PINTEREST_API_URL}${path}`, {
      method: event.httpMethod,
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
      },
      ...(event.body && { body: event.body })
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Pinterest API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      })
    };
  }
};
