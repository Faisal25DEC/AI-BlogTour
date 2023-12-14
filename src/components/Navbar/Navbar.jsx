import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  logoutUser,
} from "../../Redux/userReducer/userActions";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Flex,
  Image,
  useMediaQuery,
  Box,
  Input,
} from "@chakra-ui/react";
import { getToken } from "../../utils/cookies";
import BlogCard from "../BlogCard/BlogCard";
import { baseUrl } from "../../Redux/util";
import axios from "axios";
const Navbar = () => {
  const { userDetails, isAuth } = useSelector((state) => state.userReducer);
  const [blogsArray, setBlogsArray] = useState(null);
  const [searchedBlogs, setSearchedBlogs] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  useEffect(() => {
    const token = getToken("jwt_token");

    if (token) {
      dispatch(getUserDetails(token));
    }
  }, [isAuth]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await axios.get(`${baseUrl}/blogs`);
      setBlogsArray(res.data);
    };
    getBlogs();
  }, []);
  useEffect(() => {
    if (!searchString) setSearchedBlogs(null);
    if (searchString) {
      setSearchedBlogs(
        blogsArray?.filter((item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchString.toLocaleLowerCase())
        )
      );
    }
  }, [searchString, blogsArray]);

  return (
    <nav>
      <Link to="/" className="logo-wrapper">
        <div className="logo">
          <img
            src="https://cdn.icon-icons.com/icons2/3398/PNG/512/old_medium_logo_icon_214707.png"
            alt=""
          />
          <h1>EDIUM</h1>
        </div>
      </Link>

      {isLargerThan800 && (
        <Box position="relative" w="50%">
          <Input
            type="text"
            id="search"
            placeholder="Search"
            w="100%"
            onChange={(e) => {
              setSearchString(e.target.value);
              if (searchString === "") setSearchString(null);
            }}
          />
          {searchedBlogs && searchedBlogs.length > 0 && (
            <Box
              position="absolute"
              w="100%"
              zIndex={"99999"}
              top="3rem"
              bgColor={"white"}
              maxH="80vh"
              overflowY={"scroll"}
            >
              {searchedBlogs &&
                searchedBlogs.map((item) => {
                  return (
                    <Link
                      onClick={() => {
                        setSearchedBlogs(null);
                        setSearchString(null);
                        window.location.href = `/blog/${item._id}`;
                      }}
                    >
                      <BlogCard blog={item} onSearch={true} />
                    </Link>
                  );
                })}
            </Box>
          )}
        </Box>
      )}
      <div className="nav-link-wrapper">
        {isAuth && (
          <Link to="/create" className="nav-link">
            {" "}
            <i className="fa-solid fa-pen-to-square"></i> Write
          </Link>
        )}

        {isAuth ? (
          <Flex alignItems={"center"} gap="5px">
            <Menu>
              <MenuButton
                as={Button}
                bg={"black"}
                color="white"
                _hover={{ color: "black", backgroundColor: "white" }}
              >
                {userDetails?.name}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <Link to="/profile">
                    {" "}
                    <MenuItem>My Account</MenuItem>
                  </Link>

                  <MenuItem
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    Logout{" "}
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
              </MenuList>
            </Menu>
            <Image
              src={
                userDetails?.image
                  ? userDetails.image
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              }
              borderRadius={"10px"}
              height="30px"
              width={"30px"}
              mb={"0"}
            />
          </Flex>
        ) : (
          <Link to="/login" className="nav-link">
            <Button bg={"black"} color={"white"}>
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
