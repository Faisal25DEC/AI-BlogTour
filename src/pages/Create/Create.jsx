import React, { useEffect, useRef, useState } from "react";
import styles from "./create.module.css";
import axios from "axios";

import {
  Button,
  Flex,
  Input,
  Select,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { getToken } from "../../utils/cookies";
import "react-quill/dist/quill.bubble.css";
import Editor from "../../components/Quill/Editor";
import { useSelector } from "react-redux";
import { baseUrl } from "../../Redux/util";
import { AiDrawer } from "../../components/AiDrawer/AiDrawer";

const Create = () => {
  const toast = useToast();
  const toastIdRef = useRef();
  const { isAuth } = useSelector((state) => state.userReducer);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [blogPosted, setBlogPosted] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken("jwt_token");
    try {
      const res = await axios.post(
        `${baseUrl}/blogs/create`,
        {
          text,
          image,
          title,
          category,
          tags,
          description: editorContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogPosted(true);
      setText("");
      setImage(null);
      setTitle(null);
      setCategory(null);
      setTags(null);
      setEditorContent(null);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };
  function addToast() {
    toastIdRef.current = toast({
      status: "info",

      color: "blue",
      description: "Select text to upload image/video above it",
    });
  }

  useEffect(() => {
    function addSuccessToast() {
      toastIdRef.current = toast({
        status: "success",

        color: "blue",
        description: "Blog Posted Successfully ✌️",
        position: "top",
      });
    }
    if (blogPosted) {
      addSuccessToast();
      setTimeout(() => {
        setBlogPosted(false);
      }, 2000);
    }
  }, [blogPosted, toast]);
  useEffect(() => {
    addToast();
  }, []);

  return (
    <div>
      <AiDrawer onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <div>
        <Flex justifyContent={"center"}>
          <Button onClick={onOpen}>Write Blog using AI</Button>
        </Flex>
      </div>
      <input
        type="text"
        name="title"
        id={styles["title"]}
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <Editor
        onContentChange={() => {}}
        setEditorContent={setEditorContent}
        setImage={setImage}
        setText={setText}
      />
      <Flex
        width="80%"
        m="auto"
        gap="1rem"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Select
          width={{ base: "100%", md: "25%" }}
          name="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">--Choose Category--</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
          <option value="Fashion">Fashion</option>
          <option value="Business">Business</option>
        </Select>
        <Input
          placeholder={"Write tags separated by commas"}
          onChange={(e) => {
            setTags(e.target.value.split(","));
          }}
        />
        <Button
          colorScheme="green"
          width={{ base: "100%", md: "15%" }}
          isLoading={createLoading}
          onClick={(e) => {
            setCreateLoading(true);
            isAuth && handleSubmit(e);
            setTimeout(() => {
              setCreateLoading(false);
            }, 500);
          }}
        >
          Publish
        </Button>
      </Flex>
    </div>
  );
};

export default Create;
