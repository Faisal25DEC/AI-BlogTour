import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Heading,
  SkeletonText,
} from "@chakra-ui/react";

import { Button, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { baseUrl } from "../../Redux/util";
import { FaCopy } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const AiDrawer = ({ isOpen, onClose, onOpen }) => {
  const [title, setTitle] = useState(null);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const btnRef = useRef();

  const getBlog = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a Blog on "${title}" in no more than 300 words. Just Give the Blog don't give any other response.`,
          },
        ],
        max_tokens: 1000,
      }),
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();

      setBlog(data.choices[0].message.content);
      setLoading(false);
      setTitle(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(blog);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading textAlign="center" py="1rem">
              Let AI Generate your Blog
            </Heading>
          </DrawerHeader>

          <DrawerBody
            width={{ base: "100%", md: "90%", lg: "80%", xl: "50%" }}
            m={"auto"}
            display={"flex"}
            flexDirection={"column"}
            gap={"3rem"}
          >
            <Flex gap="1rem">
              <Input
                placeholder="Type here..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Button
                w="20%"
                onClick={() => {
                  title && getBlog();
                }}
                colorScheme="green"
                isDisabled={loading}
              >
                {" "}
                Generate Blog
              </Button>
            </Flex>

            <Box h="80vh">
              {loading ? (
                <Box
                  padding="6"
                  bg="transparent"
                  width={{ base: "100%", md: "90%", lg: "80%", xl: "50%" }}
                  m="auto"
                >
                  <SkeletonText
                    mt="4"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="10"
                    width={"50%"}
                  />

                  <SkeletonText
                    mt="4"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="20"
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              ) : (
                <div style={{ textAlign: "center", fontSize: "22px" }}>
                  {blog}
                </div>
              )}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              leftIcon={copied ? <IoMdCheckmarkCircleOutline /> : <FaCopy />}
              isDisabled={copied || blog === null}
              colorScheme="blue"
              onClick={onCopy}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </DrawerFooter>
          {loading && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
              gap="2rem"
              zIndex={"100"}
              pos={"absolute"}
              top="50%"
              left="50%"
              transform={"translate(-50%, -50%)"}
            >
              <Heading fontWeight={"bold"} size="xl" textAlign={"center"}>
                {" "}
                Please wait while we generate your blog
              </Heading>
              <div class="loader"></div>
            </Box>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
