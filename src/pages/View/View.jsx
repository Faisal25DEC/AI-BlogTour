import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  useDisclosure,
  Flex,
  Avatar,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import styles from "./View.module.css";
import HTMLToReact from "html-to-react";
import React, { useEffect, useRef, useState } from "react";
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
import { isFollowing, isLiked } from "../../utils/blogUtils";
import { getToken } from "../../utils/cookies";
import {
  FaRegBookmark,
  FaRegComment,
  FaRegThumbsUp,
  FaThumbsUp,
} from "react-icons/fa";
import { getBlogComments } from "../../Redux/commentReducer/commentActions";
import {
  getBlogLikes,
  likeBlog,
  unlikeBlog,
} from "../../Redux/likeReducer/likeActions";
const View = () => {
  const [currentProductLoading, setCurrentProductLoading] = useState(false);
  const [followerLoading, setFollowerLoading] = useState(null);
  const [likeLoading, setLikeLoading] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { likes } = useSelector((state) => state.likeReducer);
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
    window.scrollTo(0, 0);
    const token = getToken("jwt_token");
    if (token) {
      dispatch(getUserDetails(token));
    }

    dispatch(getSingleProduct(id, setCurrentProductLoading));
  }, []);
  useEffect(() => {
    if (currentProduct?._id) {
      dispatch(getProfileUser(currentProduct?.author_id));
      dispatch(getBlogComments(currentProduct?._id));
      dispatch(getBlogLikes(currentProduct?._id));
    }
  }, [currentProduct]);

  useEffect(() => {
    if (userDetails) {
      dispatch(getFollowersFollowing(userDetails._id));
    }
  }, [userDetails]);

  return currentProductLoading == false ? (
    <Box
      width={{ base: "100%", md: "90%", lg: "80%", xl: "50%" }}
      m="auto"
      mt={"2rem"}
    >
      <Heading ml="3.4rem" mb={"1rem"}>
        {currentProduct?.title && capitalizeFirstLetter(currentProduct?.title)}
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
                if (!isAuth) {
                  alert("login to follow");
                  return;
                }
                if (isFollowing(profileUser?._id, following)) {
                  setFollowerLoading(true);
                  dispatch(
                    unfollowUser(
                      profileUser?._id,
                      userDetails._id,
                      setFollowerLoading
                    )
                  );
                } else {
                  setFollowerLoading(true);
                  dispatch(
                    followUser(
                      profileUser?._id,
                      userDetails._id,
                      setFollowerLoading
                    )
                  );
                }
              }}
            >
              {isAuth && profileUser?._id && followerLoading ? (
                <Image
                  src="https://i.gifer.com/ZKZg.gif"
                  width="20px"
                  height="20px"
                />
              ) : isFollowing(profileUser?._id, following) ? (
                "Following"
              ) : (
                "Follow"
              )}
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
          <Flex gap="1rem" alignItems={"center"}>
            <HStack spacing={"1"}>
              <FaRegComment
                className={styles["blog-view-icons"]}
                onClick={onOpen}
                ref={btnRef}
                fontSize={"1.4rem"}
              ></FaRegComment>
              <Text>{blogComments?.length && blogComments?.length}</Text>
            </HStack>
            <HStack spacing={"1"}>
              {!isLiked(userDetails?._id, likes) ? (
                <Flex>
                  <FaRegThumbsUp
                    className={styles["blog-view-icons"]}
                    fontSize={"1.4rem"}
                    onClick={() => {
                      if (isAuth) {
                        const token = getToken("jwt_token");
                        setLikeLoading(true);
                        dispatch(
                          likeBlog(currentProduct?._id, token, setLikeLoading)
                        );
                      }
                    }}
                  />
                  <Text>{likes?.length && likes?.length}</Text>
                  {likeLoading && (
                    <Image
                      src="https://i.gifer.com/ZKZg.gif"
                      width="20px"
                      height="20px"
                    />
                  )}
                </Flex>
              ) : (
                <Flex>
                  <FaThumbsUp
                    className={styles["blog-view-icons"]}
                    fontSize={"1.4rem"}
                    onClick={() => {
                      if (isAuth) {
                        const token = getToken("jwt_token");
                        setLikeLoading(true);
                        dispatch(
                          unlikeBlog(currentProduct?._id, token, setLikeLoading)
                        );
                      }
                    }}
                  />
                  <Text>{likes?.length && likes?.length}</Text>
                  {likeLoading && (
                    <Image
                      src="https://i.gifer.com/ZKZg.gif"
                      width="20px"
                      height="20px"
                    />
                  )}
                </Flex>
              )}
            </HStack>
          </Flex>
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
  ) : (
    <Box
      padding="6"
      bg="transparent"
      width={{ base: "100%", md: "90%", lg: "80%", xl: "50%" }}
      m="auto"
      mt="4rem"
    >
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="10"
        width={"50%"}
      />
      <Box display={"flex"} mt="1rem" alignItems={"center"} gap="1rem">
        {" "}
        <SkeletonCircle size="10" w="45px" h="45px"></SkeletonCircle>
        <SkeletonText noOfLines={2} skeletonHeight="2" width={"50%"} />
      </Box>
      <Flex alignItems={"center"} gap="1rem" mt="1rem">
        <SkeletonCircle size="10" w="35px" h="35px"></SkeletonCircle>
        <SkeletonCircle size="10" w="35px" h="35px"></SkeletonCircle>
      </Flex>

      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="20" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default View;
