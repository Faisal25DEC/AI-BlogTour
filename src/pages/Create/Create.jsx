import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { getCookie } from "../../utils/cookies";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Editor from "../../components/Quill/Editor";

const baseUrl = "http://localhost:7700";
const Create = () => {
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
      setBlogPosted(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (blogPosted) {
      setTimeout(() => {
        setBlogPosted(false);
      }, 2000);
    }
  }, [blogPosted]);
  console.log(editorContent);

  return (
    <div>
      {blogPosted && (
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      )}
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
