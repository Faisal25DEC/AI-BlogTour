// OAuthCallback.js

import { useEffect } from "react";

const OAuthCallback = () => {
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const token = urlSearchParams.get("token");

      if (token) {
        localStorage.setItem("jwt_token", token);

        window.location.href = "https://medium-blog-app-pi.vercel.app"; // Update the URL as needed
      }
    }
  }, []);

  return null;
};

export default OAuthCallback;
