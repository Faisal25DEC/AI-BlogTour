import React, { useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import { getCookie } from "../../utils/cookies";
import Cookies from "js-cookie";
const Navbar = () => {
  const { userDetails, isAuth } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("jwttoken");
    console.log(token);

    if (token) {
      dispatch(getUserDetails(token));
      console.log(userDetails);
    }
  }, [isAuth]);
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

      <input type="text" id="search" placeholder="Seach" />
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
