// src/components/PinterestAuth.jsx
import React from 'react';

const PinterestAuth = () => {
  const appId = "1507772"; // Pinterest App ID
  const redirectUri = "https://pinmaster.netlify.app/callback"; // Callback URL
  const scopes = "read_public,write_public"; // Permissions requested
  const authUrl = `https://www.pinterest.com/oauth/?response_type=code&client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;

  const handleAuthClick = () => {
    window.location.href = authUrl; // Redirect to Pinterest OAuth URL
  };

  return (
    <div className="auth-container">
      <h2>Authenticate with Pinterest</h2>
      <p>
        To use PinMaster, authenticate with your Pinterest account by clicking
        the button below.
      </p>
      <button onClick={handleAuthClick} className="auth-button">
        Login with Pinterest
      </button>
    </div>
  );
};

export default PinterestAuth;
