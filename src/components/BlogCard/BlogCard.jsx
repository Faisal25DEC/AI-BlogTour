import {
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

const BlogCard = ({ blog }) => {
  var { _id, title, description, P, image, tags, author, category } = blog;
  return (
    <Card
      border={"0px"}
      borderBottom={"solid 0.4px #d4d6d5"}
      mt={"5"}
      width={"50%"}
      // direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Flex>
        <Box>
          <Stack>
            <CardBody>
              <Flex gap="1.4rem" alignItems="center">
                <Flex alignItems={"center"} gap="4px">
                  <FaUser />

                  <Text m={"0"} height="80%">
                    {" "}
                    {author}
                  </Text>
                </Flex>
                <Text>{dateCreated} </Text>
                <Text>{category} </Text>
              </Flex>
              <Heading size="md" mt={"5"}>
                {title}
              </Heading>

              <Text py="2">{description?.substring(0, 120)}</Text>
            </CardBody>

            <CardFooter>
              <Flex gap="1.4rem" alignItems={"center"}>
                <Text bg={"#d4d6d5"} padding={"0px 10px"} borderRadius={"15px"}>
                  {tags.join(",")}
                </Text>
                <Text>25 min read</Text>
                <Link to={`/blog/${_id}`}>
                  <Button
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
              src={image}
              alt="Caffe Latte"
            />
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export default BlogCard;
