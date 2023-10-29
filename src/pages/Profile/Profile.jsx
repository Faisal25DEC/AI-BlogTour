import React, { useEffect } from "react";
import { Avatar, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookies";
import { getUserDetails } from "../../Redux/userReducer/userActions";
import { Navigate } from "react-router";
import { getUserProducts } from "../../Redux/blogReducer/blogActions";
import { blogReducer } from "./../../Redux/blogReducer/blogReducer";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getFollowersFollowing } from "../../Redux/followerReducer/followerActions";

const Profile = () => {
  const { userDetails, isAuth } = useSelector((state) => state.userReducer);
  const { userProducts } = useSelector((state) => state.blogReducer);
  const { followers, following } = useSelector(
    (state) => state.followerReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("jwttoken");
    if (token) {
      dispatch(getUserDetails(token));
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      dispatch(getUserProducts(userDetails._id));
      dispatch(getFollowersFollowing(userDetails._id));
    }
  }, [userDetails]);
  console.log(userProducts);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box width="80%" m="auto" mt="10%">
      <Flex>
        <Box flexBasis={"70%"}>
          <Heading mb="1rem">{userDetails?.name}</Heading>
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
        <Box borderLeft={"solid 0.4px #dedad9"} height="75vh" pl="10">
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
          <Flex gap="1rem">
            <Text fontWeight={"bold"}>Followers {followers?.length}</Text>
            <Text fontWeight={"bold"}>Following {following?.length}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
