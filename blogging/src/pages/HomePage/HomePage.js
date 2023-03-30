import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import "./HomePage.css";
import { useEffect } from "react";
import view from "../../images/View_my_blog.png";
import add from "../../images/Add_new_blog.png";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AppContext);
  // console.log(account);

  useEffect(() => {
    console.log(localStorage.getItem("account"));
    if (localStorage.getItem("account")) {
      setAccount(localStorage.getItem("account"));
    } else {
      navigate("/");
      window.location.replace("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="homePage">
        <Link to="/addblog">
          <img src={add} alt="Add New Blogs" />
        </Link>
        <Link to="/profile">
          <img src={view} alt="View My Blogs" />
        </Link>
      </div>
    </>
  );
};

export default HomePage;
