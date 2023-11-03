import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleOAuthButton = () => {
  return (
    <Button
      width={"61%"}
      mt={"5"}
      leftIcon={<FaGoogle />}
      colorScheme="red"
      onClick={() => {
        // Redirect to the Google OAuth authentication URL
        window.location.href =
          "https://medium-backend-ut1y.vercel.app/auth/google";
      }}
    >
      Sign In with Google
    </Button>
  );
};

export default GoogleOAuthButton;
