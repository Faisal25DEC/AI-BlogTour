import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/cookies";
import { getUserDetails } from "../../Redux/userReducer/userActions";
import { Navigate } from "react-router";
import { getUserProducts } from "../../Redux/blogReducer/blogActions";
import { blogReducer } from "./../../Redux/blogReducer/blogReducer";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getFollowersFollowing } from "../../Redux/followerReducer/followerActions";
import ProfileLoader from "../../components/ProfileLoader/ProfileLoader";

const Profile = () => {
  const [auth, setAuth] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const { userDetails, isAuth } = useSelector((state) => state.userReducer);
  const { userProducts } = useSelector((state) => state.blogReducer);
  const { followers, following } = useSelector(
    (state) => state.followerReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken("jwt_token");
    if (token) {
      setProfileLoading(true);
      dispatch(getUserDetails(token));
    } else {
      setAuth(false);
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      dispatch(getUserProducts(userDetails._id));
      dispatch(getFollowersFollowing(userDetails._id));
      setTimeout(() => {
        setProfileLoading(false);
      }, 1000);
    }
  }, [userDetails]);
  console.log(userProducts);
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return profileLoading ? (
    <ProfileLoader />
  ) : (
    <Box width={{ base: "100%", md: "90%", lg: "80%" }} m="auto" mt="10%">
      <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
        <Box flexBasis={"70%"}>
          <Heading mb="1rem" display={{ base: "none", md: "block" }}>
            {userDetails?.name}
          </Heading>
          <hr />
          <Box overflow={"scroll"} height="75vh">
            {userProducts.length === 0 && (
              <Heading textAlign={"center"} mt="10%">
                No blogs written yet...
              </Heading>
            )}
            {userProducts.length > 0 &&
              userProducts?.map((userBlog) => {
                return <BlogCard blog={userBlog} onProfile={true} />;
              })}
          </Box>
        </Box>
        <Box
          borderLeft={{ base: "none", md: "solid 0.4px #dedad9" }}
          height={{ base: "35vh", md: "75vh" }}
          pl="10"
        >
          <Image
            src={
              userDetails?.image
                ? userDetails.image
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            }
            borderRadius={"full"}
            width="9rem"
            height="9rem"
          />
          <Heading size="md" mt="1rem">
            {userDetails?.name}
          </Heading>
          <Flex gap="1rem" mt="1rem">
            <Text fontWeight={"bold"}>Followers {followers?.length}</Text>
            <Text fontWeight={"bold"}>Following {following?.length}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
