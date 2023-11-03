// OAuthCallback.js

import { useEffect } from "react";

const OAuthCallback = () => {
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const token = urlSearchParams.get("token");

      if (token) {
        // Store the token in localStorage
        localStorage.setItem("jwt_token", token);

        // Redirect the user to the desired page
        window.location.href = "http://localhost:3000"; // Update the URL as needed
      }
    }
  }, []);

  return null; // or any UI component for the callback
};

export default OAuthCallback;
