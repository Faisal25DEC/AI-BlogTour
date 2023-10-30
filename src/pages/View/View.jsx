import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import styles from "./View.module.css";
import HTMLToReact from "html-to-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSingleProduct } from "../../Redux/blogReducer/blogActions";
import DrawerComp from "../../components/Drawer/Drawer";
import {
  capitalizeFirstLetter,
  getBlogReadTime,
  monthMap,
} from "../../utils/blogCard";
import {
  getProfileUser,
  getUserDetails,
} from "../../Redux/userReducer/userActions";
import {
  followUser,
  getFollowersFollowing,
  unfollowUser,
} from "./../../Redux/followerReducer/followerActions";
import { isFollowing } from "../../utils/blogUtils";
import { getCookie } from "../../utils/cookies";
import {
  FaComment,
  FaRegBookmark,
  FaRegComment,
  FaRegSave,
} from "react-icons/fa";
import { getBlogComments } from "../../Redux/commentReducer/commentActions";
import { Link } from "react-router-dom";
const blogsArray = [
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
const View = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { blogComments } = useSelector((state) => state.commentReducer);
  const { currentProduct } = useSelector((state) => state.blogReducer);
  const { profileUser, userDetails, isAuth } = useSelector(
    (state) => state.userReducer
  );
  const { followers, following } = useSelector(
    (state) => state.followerReducer
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const htmlToReactParser = new HTMLToReact.Parser();

  useEffect(() => {
    const token = getCookie("jwttoken");
    if (token) {
      dispatch(getUserDetails(token));
    }

    dispatch(getSingleProduct(id));
  }, []);
  useEffect(() => {
    dispatch(getProfileUser(currentProduct?.author_id));
    dispatch(getBlogComments(currentProduct?._id));
  }, [currentProduct]);

  useEffect(() => {
    if (userDetails) {
      dispatch(getFollowersFollowing(userDetails._id));
    }
  }, [userDetails]);

  return (
    <Box width={"50%"} m="auto" mt={"2rem"}>
      <Heading ml="3.4rem" mb={"1rem"}>
        {currentProduct.title && capitalizeFirstLetter(currentProduct?.title)}
        <Box mt="1rem">
          <hr></hr>
        </Box>
      </Heading>

      <Flex alignItems={"center"} gap="1rem" ml="4rem" mt="3.5rem">
        <Avatar
          src={
            profileUser?.image
              ? profileUser?.image
              : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
          }
        />
        <Box>
          <Flex gap="1rem">
            <Text fontWeight={"medium"}>{profileUser?.name}</Text>
            <Text
              color="green"
              cursor={"pointer"}
              onClick={() => {
                if (isFollowing(profileUser?._id, following)) {
                  dispatch(unfollowUser(profileUser?._id, userDetails._id));
                } else {
                  dispatch(followUser(profileUser?._id, userDetails._id));
                }
              }}
            >
              {isAuth &&
              profileUser?._id &&
              isFollowing(profileUser?._id, following)
                ? "Following"
                : "Follow"}
            </Text>
          </Flex>
          <Flex gap="1rem">
            <Text>{getBlogReadTime(currentProduct?.text?.length)} read</Text>
            <Text>
              {" "}
              {currentProduct?.dateCreated &&
                monthMap[+currentProduct?.dateCreated.substring(5, 7)]}{" "}
              {currentProduct?.dateCreated &&
                currentProduct?.dateCreated.substring(8, 10)}{" "}
              ,{" "}
              {currentProduct?.dateCreated &&
                currentProduct?.dateCreated.substring(0, 4)}
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Box width="85%" m="auto" mt="1rem">
        <hr></hr>

        <Flex p="0.5rem 0rem" justifyContent={"space-between"}>
          <HStack spacing={"1"}>
            <FaRegComment
              className={styles["blog-view-icons"]}
              onClick={onOpen}
              ref={btnRef}
              fontSize={"1.4rem"}
            ></FaRegComment>
            <Text>{blogComments?.length && blogComments?.length}</Text>
          </HStack>
          <HStack>
            <FaRegBookmark
              className={styles["blog-view-icons"]}
              fontSize={"1.4rem"}
            ></FaRegBookmark>
          </HStack>
        </Flex>

        <hr></hr>
      </Box>
      <Box width="85%" m="auto" mt="1rem">
        {htmlToReactParser.parse(currentProduct?.description)}
      </Box>
      <DrawerComp
        blogId={currentProduct?._id}
        btnRef={btnRef}
        onClose={onClose}
        onOpen={onClose}
        isOpen={isOpen}
      />
    </Box>
  );
};

export default View;
