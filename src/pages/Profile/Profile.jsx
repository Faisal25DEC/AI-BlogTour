import React, { useEffect } from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookies";
import { getUserDetails } from "../../Redux/userReducer/userActions";
import { Navigate } from "react-router";

const Profile = () => {
  const { userDetails, isAuth } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("jwttoken");
    if (token) {
      dispatch(getUserDetails(token));
    }
  }, []);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <Flex
        alignItems={"center"}
        border={"solid 0.4px grey"}
        width={"50%"}
        m="auto"
      >
        <Avatar name="Dan Abrahmov" src={userDetails?.image} />
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {userDetails?.name}
        </Text>
      </Flex>
    </Box>
  );
};

export default Profile;
