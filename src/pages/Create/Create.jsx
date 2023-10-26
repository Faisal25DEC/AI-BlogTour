import React, { useEffect, useState } from "react";
import styles from "./create.module.css";
import axios from "axios";

import { Alert, AlertIcon, Textarea } from "@chakra-ui/react";
import { getCookie } from "../../utils/cookies";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const baseUrl = "http://localhost:7700";
const Create = () => {
  const [formData, setFormData] = useState();
  const [blogPosted, setBlogPosted] = useState(false);

  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;

    if (name == "tags") {
      setFormData({
        ...formData,
        [name]: value.split(","),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie("jwttoken");
    try {
      const res = await axios.post(`${baseUrl}/blogs/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  return (
    <div>
      {blogPosted && (
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      )}
      <form id={styles["create-blog-form"]} action="" onSubmit={handleSubmit}>
        <input
          onChange={handleFormFieldChange}
          type="text"
          id="title"
          placeholder="Title"
          required
          name="title"
        />
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          name="description"
          placeholder="Tell your story..."
        />
        <div id={styles["form-footer"]}>
          <select
            onChange={handleFormFieldChange}
            name="category"
            id="category"
            required
          >
            <option value="">Choose Category</option>
            <option value="Coding">Coding</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Fashion">Fashion</option>
            <option value="Politics">Politics</option>
            <option value="Others">Others</option>
          </select>
          <input
            onChange={handleFormFieldChange}
            type="text"
            id="tags"
            placeholder="Add tags separated by ',"
            name="tags"
            required
          />
          <input
            onChange={handleFormFieldChange}
            type="text"
            id="image"
            placeholder="image URL"
            name="image"
            required
          />
        </div>
        <input type="submit" id={styles["submit"]} />
      </form>
    </div>
  );
};

export default Create;
