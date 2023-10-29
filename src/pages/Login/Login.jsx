import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/userReducer/userActions";
import { getCookie } from "../../utils/cookies";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { Navigate } from "react-router";

const initialFormData = {
  name: "",
  password: "",
  email: "",
  phone: null,
};
const redirectUrl = "http://localhost:3000";
const baseUrl = "http://localhost:7700";
const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { isAuth } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Flex alignItems={"center"} justifyContent={"center"} height={"70vh"}>
      <Box width="40%">
        <Formik
          width="70%"
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            dispatch(loginUser(values));
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input {...field} placeholder="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                bg={"black"}
                isLoading={props.isSubmitting}
                color="white"
                type="submit"
                _hover={{
                  bg: "white",
                  color: "black",
                  borderColor: "grey",
                  border: "solid 1px grey",
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Center>
          <Button
            width={"61%"}
            mt={"5"}
            leftIcon={<FaGoogle />}
            colorScheme="red"
            onClick={() => {
              window.location.href = "http://localhost:7700/auth/google";
            }}
          >
            Sign In with Google
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};

export default Login;
