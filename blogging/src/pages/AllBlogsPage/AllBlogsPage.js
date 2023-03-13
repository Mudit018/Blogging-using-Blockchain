import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/context';
import Navbar from '../../components/navbar/Navbar';
import "./AllBlogsPage.css";
import { Button, ButtonGroup } from '@chakra-ui/react'

const AllBlogsPage = () => {

    const navigate = useNavigate();
    const { account, setAccount, getAllBlogs } = useContext(AppContext);
    const [allBlogs, setAllBlogs] = useState([]);
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

    const handleClick = async () => {
        const data = await getAllBlogs();
        console.log(data);
        await setAllBlogs(data);
        localStorage.setItem("allblogs", JSON.stringify(data));
    }
    
    return (
      <div className="AllBlogsPage">
        <Navbar></Navbar>
        <div className="heading">All Blogs Page</div>
        <div className="button">
          <Button colorScheme="teal" variant="outline" onClick={() => handleClick()}>
            Get All Blogs
          </Button>
        </div>
      </div>
    );
}

export default AllBlogsPage