import React, { useEffect, useState } from "react";
import { Avatar, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/cookies";
import { getProfileUser } from "../../Redux/userReducer/userActions";
import { Navigate, useParams } from "react-router";
import { getUserProducts } from "../../Redux/blogReducer/blogActions";
import { blogReducer } from "./../../Redux/blogReducer/blogReducer";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getFollowersFollowing } from "../../Redux/followerReducer/followerActions";
import ProfileLoader from "../../components/ProfileLoader/ProfileLoader";

const ProfileUser = () => {
  const [profileLoading, setProfileLoading] = useState(false);
  const { profileUser, isAuth } = useSelector((state) => state.userReducer);
  const { userProducts } = useSelector((state) => state.blogReducer);
  const { followers, following } = useSelector(
    (state) => state.followerReducer
  );
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setProfileLoading(true);
    dispatch(getProfileUser(userId));
  }, [userId]);

  useEffect(() => {
    if (profileUser) {
      dispatch(getUserProducts(profileUser._id));
      dispatch(getFollowersFollowing(profileUser._id));
      setTimeout(() => {
        setProfileLoading(false);
      }, 1000);
    }
  }, [profileUser]);

  return profileLoading ? (
    <ProfileLoader />
  ) : (
    <Box width={{ base: "100%", md: "90%", lg: "80%" }} m="auto" mt="10%">
      <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
        <Box flexBasis={"70%"}>
          <Heading mb="1rem" display={{ base: "none", lg: "block" }}>
            {profileUser?.name}
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
          borderLeft={"solid 0.4px #dedad9"}
          height={{ base: "35vh", md: "75vh" }}
          pl="10"
        >
          <Image
            src={
              profileUser?.image
                ? profileUser.image
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            }
            borderRadius={"full"}
            width="9rem"
            height="9rem"
          />
          <Heading size="md" mt="1rem">
            {profileUser?.name}
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

export default ProfileUser;
