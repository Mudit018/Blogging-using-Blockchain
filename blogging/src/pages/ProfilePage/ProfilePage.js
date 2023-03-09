import { React, useContext } from 'react'
import "./ProfilePage.css"
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import MyBlogs from '../../components/MyBlogs/MyBlogs';

const ProfilePage = () => {

  const navigate = useNavigate();
  const { account, createBlog } = useContext(AppContext);
  // console.log(account);

  if(account === "" || !account) {
    navigate('/');
    window.location.replace("/");
  }

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