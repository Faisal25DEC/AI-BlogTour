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
} from "@chakra-ui/react";

import { Button, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { baseUrl } from "../../Redux/util";
export const AiDrawer = ({ isOpen, onClose, onOpen }) => {
  const [title, setTitle] = useState(null);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const btnRef = useRef();

  const getBlog = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: `Write a Blog on "${title}" in no more than 300 words. Just Give the Blog don't give any other response.`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/completions`, options);
      const data = await res.json();
      setBlog(data.choices[0].message.content);
      setLoading(false);
      setTitle(null);
      console.log(data);
    } catch (error) {
      setLoading(false);
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
            w="60%"
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
              >
                {" "}
                Generate Blog
              </Button>
            </Flex>

            <Box h="80vh">
              {loading ? (
                <Flex justifyContent={"center"} alignItems={"center"}>
                  {" "}
                  <h1>Loading....</h1>
                </Flex>
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
              colorScheme="blue"
              onClick={onCopy}
              disabled={blog === null}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
