import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie } from "./../../utils/cookies";
import Cookies from "js-cookie";
import {
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
} from "@chakra-ui/react";
import { FaPersonBooth, FaUser } from "react-icons/fa";
import BlogCard from "../../components/BlogCard/BlogCard";
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

  const getBlogs = async () => {
    // const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(`${baseURL}/blogs`);
    setBlogsArray(res.data);
    console.log(res);
  };

  useEffect(() => {
    getBlogs();
    // console.log(Cookies.get("jwttoken"));
  }, []);

  return (
    <Flex width="95%" m="auto">
      <Box width="50%">
        {blogsArray.length > 0 &&
          blogsArray?.map((blog) => {
            return <BlogCard blog={blog} />;
          })}
      </Box>
    </Flex>
  );
};

export default Home;
