import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import HTMLToReact from "html-to-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSingleProduct } from "../../Redux/blogReducer/blogActions";
import DrawerComp from "../../components/Drawer/Drawer";
const blogsArray = [
  {
    title: "blog",
    desc: "lorem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem ",
    author: "faisal",
    image:
      "https://cdn.icon-icons.com/icons2/3398/PNG/512/old_medium_logo_icon_214707.png",
    dateCreated: "2023-25-12",
    id: "1",
    category: "general",
    tags: ["fashion", "healthcare"],
  },
];
const View = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { currentProduct } = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  const htmlToReactParser = new HTMLToReact.Parser();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  return (
    <Box width={"65%"} m="auto" mt={"2rem"}>
      <Heading ml="3.4rem" mb={"1rem"}>
        {currentProduct?.title}
      </Heading>

      <Grid
        templateColumns={"repeat(2,1fr)"}
        templateRows={"repeat(2,1fr)"}
        width={"80%"}
        m="auto"
        mt="1.5rem"
        gap="1rem"
      >
        <GridItem>
          <HStack>
            <Text fontWeight={"bold"}>Category:</Text>
            <Text>{currentProduct?.category}</Text>
          </HStack>
        </GridItem>
        <GridItem ml="auto">
          <HStack>
            <Text fontWeight={"bold"}>Tags:</Text>
            <Text>{currentProduct?.tags?.join(",")}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack>
            <Text fontWeight={"bold"}>Author:</Text>
            <Text>{currentProduct?.author}</Text>
          </HStack>
        </GridItem>
        <GridItem ml="auto">
          <HStack>
            <Text fontWeight={"bold"}>Date Created:</Text>
            <Text>{currentProduct?.dateCreated}</Text>
          </HStack>
        </GridItem>
      </Grid>
      <Box>
        <Button ref={btnRef} onClick={onOpen}>
          Comment
        </Button>
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
  );
};

export default View;
