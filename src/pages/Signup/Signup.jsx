import React, { useEffect, useRef, useState } from "react";
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
  Text,
  useToast,
} from "@chakra-ui/react";
import { loginUser, signupUser } from "../../Redux/userReducer/userActions";
import { useDispatch, useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { createAction } from "../../Redux/util";
import { SIGNUP_ERROR } from "../../Redux/userReducer/userTypes";
const initialFormData = {
  name: "",
  password: "",
  email: "",
  phone: null,
};
const baseUrl = "http://localhost:https://medium-backend-ut1y.vercel.app/";
const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { signUp, signUpError } = useSelector((state) => state.userReducer);
  const toast = useToast();
  const toastIdRef = useRef();

  function addToast() {
    toastIdRef.current = toast({
      status: "error",
      description: "User Already Registered",
    });
  }

  useEffect(() => {
    if (signUpError === "user already exist") {
      addToast();
      setTimeout(() => {
        dispatch(createAction(SIGNUP_ERROR, ""));
      }, 2000);
    }
  }, [signUpError]);
  if (signUp) {
    return <Navigate to="/login" />;
  }

  return (
    <Flex alignItems={"center"} justifyContent={"center"} height={"70vh"}>
      <Box width="40%">
        <Formik
          width="70%"
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values, actions) => {
            dispatch(signupUser(values));
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="Name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
        <Text textAlign="center" mt="1.5rem" color="#0f73d1">
          <Link to="/login">Already have an account? Login</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
