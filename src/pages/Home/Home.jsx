import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken } from "./../../utils/cookies";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import BlogCard from "../../components/BlogCard/BlogCard";
import { getRandomProducts } from "../../Redux/blogReducer/blogActions";
import {
  getRandomUsers,
  getUserDetails,
} from "../../Redux/userReducer/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowersFollowing,
  unfollowUser,
} from "../../Redux/followerReducer/followerActions";
import { isFollowing } from "../../utils/blogUtils";
import { baseUrl } from "../../Redux/util";

const Home = () => {
  const { randomProducts } = useSelector((state) => state.blogReducer);
  const [blogsArray, setBlogsArray] = useState([]);

  const { randomUsers, userDetails, isAuth } = useSelector(
    (state) => state.userReducer
  );
  const { followers, following } = useSelector(
    (state) => state.followerReducer
  );
  const toastIdRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const getBlogs = async () => {
    // const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(`${baseUrl}/blogs`);
    setBlogsArray(res.data);
    console.log(res);
  };

  function addToast() {
    toastIdRef.current = toast({
      description: "You need to login to follow users",
      status: "error",
      position: "top",
    });
  }

  useEffect(() => {
    getBlogs();
    dispatch(getRandomProducts());

    // console.log(Cookies.get("jwttoken"));
  }, []);
  useEffect(() => {
    const token = getToken("jwt_token");
    if (token) {
      dispatch(getUserDetails(token));
    }
  }, []);
  useEffect(() => {
    dispatch(getFollowersFollowing(userDetails?._id));
    dispatch(getRandomUsers());
  }, [userDetails]);
  console.log(following);

  return (
    <Flex width="95%" m="auto" justifyContent={"space-between"}>
      <Box width="60%">
        {blogsArray.length > 0
          ? blogsArray?.map((blog) => {
              return <BlogCard blog={blog} />;
            })
          : Array.from({ length: 5 }, (_, index) => {
              return (
                <Box padding="6" bg="transparent">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              );
            })}
      </Box>

      <VStack mt="2.5rem" mr="2.5rem" width="30%" alignItems={"flex-start"}>
        <Box width={"100%"}>
          {randomProducts?.length > 0
            ? randomProducts.map((blog, index) => {
                const { title, category, author, text } = blog;
                if (index < 4) {
                  return (
                    <Link to={`/blog/${blog._id}`}>
                      <Box mb="1rem">
                        <Link to={`/profile/${blog.author_id}`}>
                          <Flex alignItems={"center"} gap="0.6rem">
                            <Avatar
                              size="xs"
                              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                            />
                            <Text fontSize={"0.9rem"} fontWeight={"medium"}>
                              {author}
                            </Text>
                          </Flex>
                        </Link>
                        <Flex
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          mt="0.5rem"
                        >
                          <Heading size="sm">{title}</Heading>
                        </Flex>
                        <Box p="0.3rem 0">
                          <hr></hr>
                        </Box>
                      </Box>
                    </Link>
                  );
                }
              })
            : Array.from({ length: 4 }, (_, index) => {
                return (
                  <Box padding="2" bg="transparent">
                    <SkeletonCircle size="10" />
                    <SkeletonText mt="2" noOfLines={1} skeletonHeight="2" />
                  </Box>
                );
              })}
        </Box>
        {randomUsers?.length > 0 ? (
          randomUsers?.map((user, index) => {
            const { name, image, _id } = user;
            if (user._id != userDetails?._id && index < 4) {
              return (
                <Box width={"100%"}>
                  <Flex justifyContent={"flex-start"} width="100%" gap="1rem">
                    <Avatar
                      size="sm"
                      name="Kent Dodds"
                      src={
                        image
                          ? image
                          : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                      }
                    />
                    <Link to={`/profile/${_id}`}>{name}</Link>
                    <Button
                      onClick={() => {
                        if (!isAuth) {
                          addToast();
                        }
                        if (following && isFollowing(user._id, following)) {
                          dispatch(unfollowUser(user._id, userDetails?._id));
                        } else {
                          dispatch(followUser(user._id, userDetails?._id));
                        }
                      }}
                      p="0 0.2rem"
                      height="2rem"
                      fontSize="0.8rem"
                      variant={"outline"}
                    >
                      {isFollowing(user._id, following)
                        ? "Following"
                        : "Follow"}
                    </Button>
                  </Flex>
                </Box>
              );
            }
          })
        ) : (
          <Box padding="2" bg="transparent" width={"100%"} display={"flex"}>
            <SkeletonCircle size="10" />

            <SkeletonText noOfLines={1} skeletonHeight="5" />
            <SkeletonText noOfLines={1} skeletonHeight="5" />
          </Box>
        )}
      </VStack>
    </Flex>
  );
};

export default Home;
