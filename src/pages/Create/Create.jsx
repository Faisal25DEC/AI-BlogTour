import React, { useEffect, useRef, useState } from "react";
import styles from "./create.module.css";
import axios from "axios";

import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { getCookie } from "../../utils/cookies";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Editor from "../../components/Quill/Editor";
import { useSelector } from "react-redux";

const baseUrl = "http://https://medium-backend-ut1y.vercel.app";
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

  // const handleFormFieldChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name == "tags") {
  //     setFormData({
  //       ...formData,
  //       [name]: value.split(","),
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie("jwttoken");
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
      console.log("posted");
      console.log(text);
      setBlogPosted(true);
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
  function addSuccessToast() {
    toastIdRef.current = toast({
      status: "success",

      color: "blue",
      description: "Blog Posted Successfully ✌️",
      position: "top",
    });
  }
  useEffect(() => {
    if (blogPosted) {
      addSuccessToast();
      setTimeout(() => {
        setBlogPosted(false);
      }, 2000);
    }
  }, [blogPosted]);
  useEffect(() => {
    addToast();
  }, []);
  console.log(text);

  return (
    <div>
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
      <Flex width="80%" m="auto" gap="1rem">
        <Select
          width="25%"
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
        <Button colorScheme="green" width="15%" onClick={handleSubmit}>
          Publish
        </Button>
      </Flex>
    </div>
  );
};

export default Create;
