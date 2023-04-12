import { React, useContext, useEffect } from 'react'
import "./ProfilePage.css"
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import MyBlogs from '../../components/MyBlogs/MyBlogs';
import BlogCard from '../../components/blogCard/BlogCard';

const ProfilePage = () => {

  const navigate = useNavigate();
  const { account, setAccount, createBlog } = useContext(AppContext);
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
      <Navbar></Navbar>
      <div className="ProfilePage">
          <div className="heading">
              My Blogs
          </div>
          <MyBlogs />
      </div>
    </>
  )
}

export default ProfilePage