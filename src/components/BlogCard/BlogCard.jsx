import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaPersonBooth, FaUser } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import { getBlogReadTime, monthMap } from "../../utils/blogCard";

const BlogCard = ({ blog, onProfile }) => {
  var {
    _id,
    title,
    text,
    description,
    dateCreated,
    image,
    tags,
    author,
    author_id,
    category,
    authorImage,
  } = blog;
  return (
    <Card
      border={"0px"}
      borderBottom={"solid 0.4px #d4d6d5"}
      mt={"5"}
      width={onProfile ? "80%" : "100%"}
      // direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Flex>
        <Box width="78%">
          <Stack>
            <CardBody>
              <Flex gap="1rem" alignItems="center">
                <Flex alignItems={"center"} gap=".6rem">
                  <Avatar src={authorImage} size="xs" />

                  <Link m={"0"} height="80%" to={`/profile/${author_id}`}>
                    {" "}
                    {author}
                  </Link>
                </Flex>
                <Text>
                  {monthMap[+dateCreated.substring(5, 7)]}{" "}
                  {dateCreated.substring(8, 10)} , {dateCreated.substring(0, 4)}
                </Text>
                <Text>{category} </Text>
              </Flex>
              <Heading size="md" mt={"5"}>
                {title}
              </Heading>

              <Text py="2">{text?.substring(0, 250)}...</Text>
            </CardBody>

            <CardFooter width="100%">
              <Flex gap="1.4rem" alignItems={"center"}>
                <Text bg={"#d4d6d5"} padding={"0px 10px"} borderRadius={"15px"}>
                  {tags.join(",")}
                </Text>
                <Text>{getBlogReadTime(text?.length)} read</Text>
                <Link to={`/blog/${_id}`}>
                  <Button
                    ml="auto"
                    width={"9rem"}
                    variant="solid"
                    bg={"black"}
                    color={"whitesmoke"}
                    _hover={{
                      bg: "white",
                      border: "solid 1px grey",
                      color: "black",
                    }}
                  >
                    View
                  </Button>
                </Link>
              </Flex>
            </CardFooter>
          </Stack>
        </Box>
        <Spacer />
        <Box>
          <Flex justifyContent={"center"} alignItems={"center"} height="100%">
            <Image
              objectFit="cover"
              width={"155px"}
              height={"155px"}
              // maxW={{ base: "100%", sm: "200px" }}
              src={
                image
                  ? image
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              }
              alt="Caffe Latte"
            />
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export default BlogCard;
