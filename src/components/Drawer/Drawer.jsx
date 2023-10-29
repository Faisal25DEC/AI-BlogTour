import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Box,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogComments,
  postComment,
} from "../../Redux/commentReducer/commentActions";
const DrawerComp = ({ btnRef, onOpen, isOpen, onClose, blogId }) => {
  const { blogComments } = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();
  const commentRef = useRef();
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getBlogComments(blogId));
  }, [isOpen]);
  console.log(blogId);
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Comments</DrawerHeader>

        <DrawerBody>
          <Box>
            <Textarea
              ref={commentRef}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></Textarea>
            <Button
              colorScheme="teal"
              mt="2"
              onClick={() => {
                if (comment != "") {
                  dispatch(postComment(comment, blogId));
                  setComment("");
                  commentRef.current.value = "";
                }
              }}
            >
              Comment
            </Button>
          </Box>
          <VStack spacing={"4"} align={"flex-start"} mt="4">
            {blogComments?.map((blogComment) => {
              const { author, comment } = blogComment;
              return (
                <Text display={"inline-block"}>
                  <Text display={"inline-block"} fontWeight={"bold"}>
                    {author}
                  </Text>{" "}
                  {comment}
                </Text>
              );
            })}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComp;
