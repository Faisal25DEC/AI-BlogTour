import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie } from "./../../utils/cookies";
import Cookies from "js-cookie";
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
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaPersonBooth, FaUser } from "react-icons/fa";
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
const initblogsArray = [
  {
    title: "blog",
    desc: "lorem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem ",
    author: "faisal",
    image:
      "https://cdn.icon-icons.com/icons2/3398/PNG/512/old_medium_logo_icon_214707.png",
    dateCreated: "2023-25-12",
    id: "1",
    category: "general",
    tags: ["fashion", "healthcare"],
  },
];
const baseURL = process.env.REACT_APP_BASE_URL;
const Home = () => {
  const [blogsArray, setBlogsArray] = useState([]);
  const { randomUsers, userDetails } = useSelector(
    (state) => state.userReducer
  );
  const { followers, following } = useSelector(
    (state) => state.followerReducer
  );
  const dispatch = useDispatch();
  const getBlogs = async () => {
    // const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(`${baseURL}/blogs`);
    setBlogsArray(res.data);
    console.log(res);
  };
  const isFollowing = (id) => {
    const res = following.findIndex((element) => element == id);
    console.log(res);
    return res != -1 ? true : false;
  };

  useEffect(() => {
    getBlogs();

    // console.log(Cookies.get("jwttoken"));
  }, []);
  useEffect(() => {
    const token = getCookie("token");
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
      <Box width="50%">
        {blogsArray.length > 0 &&
          blogsArray?.map((blog) => {
            return <BlogCard blog={blog} />;
          })}
      </Box>
      <VStack mt="2.5rem" mr="2.5rem">
        {randomUsers?.map((user, index) => {
          const { name, image } = user;
          if (userDetails && user._id != userDetails?._id && index < 4) {
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
                  <Text>{name}</Text>
                  <Button
                    onClick={() => {
                      if (isFollowing(user._id)) {
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
                    {isFollowing(user._id) ? "Following" : "Follow"}
                  </Button>
                </Flex>
              </Box>
            );
          }
        })}
      </VStack>
    </Flex>
  );
};

export default Home;
