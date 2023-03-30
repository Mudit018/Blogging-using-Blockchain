import React, { useContext } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import { Avatar, AvatarBadge, AvatarGroup, Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // MenuItemOption,
  // MenuGroup,
  // MenuOptionGroup,
  // MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AppContext);
  // console.log(account);

  const handleRemoveMetamaskAccount = () => {
    localStorage.clear();
    setAccount("");
    navigate("/");
    window.location.reload();
  };

  // const verticalNav = (e) => {
  //   const nav = document.querySelector(".nav-links-horizontal");
  //   nav.classList.toggle("responsive");
  //   const temp = document.querySelector("#nav-link2");
  //   temp.classList.toggle("open");
  // };

  return (
    <div>
      <header>
        <div className="navbar">
          <div className="logo">
            <p>Blogger</p>
            {/* <div className="icon" onClick={(e) => {verticalNav(e);}}> */}
            {/*  <i className="fa fa-bars" style={{ fontSize: "3rem", color: "#49516f" }} ></i> */}
          </div>
          <div className="nav-links-horizontal">
            <ul
              className="links-horizontal"
              style={{ margin: "0", padding: "0" }}
            >
              <li class="active">
                <Link to="/home">
                  <span className="home-span">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/getallblogs">All Blogs</Link>
              </li>
              <li>
                {
                  <>
                    <p className="profile">
                      <Menu maxW="10px">
                        <MenuButton
                          as={Button}
                          style={{ color: "black" }}
                          rightIcon={
                            <ChevronDownIcon style={{ color: "black" }} />
                          }
                        >
                          {/* <Avatar size="md" name={account} /> */}
                          {account}
                        </MenuButton>
                        <MenuList maxW="inherit">
                          {/* <MenuItem maxW="inherit">
                            <Link to="/profile">My Blogs</Link>
                          </MenuItem>
                          <MenuItem maxW="inherit">
                            <Link to="/addBlog">Add Blog</Link>
                          </MenuItem> */}
                          <MenuItem
                            maxW="inherit"
                            onClick={() => {
                              handleRemoveMetamaskAccount();
                            }}
                            style={{ color: "black" }}
                          >
                            Disconnect Account
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </p>
                  </>
                }
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
