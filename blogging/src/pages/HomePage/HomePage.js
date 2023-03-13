import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import "./HomePage.css"
import Navbar from '../../components/navbar/Navbar';
import { useEffect } from 'react';

const HomePage = () => {

    const navigate = useNavigate();
    const { account, setAccount } = useContext(AppContext);
    // console.log(account);
    useEffect(() => {
      console.log(localStorage.getItem("account"));
      if(localStorage.getItem("account")) {
        setAccount(localStorage.getItem("account"));
      } else {
        navigate("/");
        window.location.replace("/");
      }
    }, [])
    


  return (
    <div className="homePage">
      <Navbar></Navbar>
      Blogging using Blockchain
      <div className="para">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea reiciendis ut quis at animi eveniet exercitationem, odit, necessitatibus, similique laborum earum?
      </div>
    </div>
  )
}

export default HomePage