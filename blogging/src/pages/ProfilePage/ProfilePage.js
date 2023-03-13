import { React, useContext, useEffect } from 'react'
import "./ProfilePage.css"
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import MyBlogs from '../../components/MyBlogs/MyBlogs';

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
    <div className="ProfilePage">
      <Navbar></Navbar>
        <div className="heading">
            ProfilePage
        </div>
        <div className="PersonalBlogs">
            { account }
        </div>
        <MyBlogs></MyBlogs>
    </div>
  )
}

export default ProfilePage