import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import "./SingleBlogPage.css"
import { useParams } from 'react-router-dom';

const SingleBlogPage = ({Blog}) => {

    const navigate = useNavigate();
    const { account, contract, setAccount, createBlog, getBlogbyAddress } = useContext(AppContext);
    // console.log(account);

    const address = useParams();
    console.log(address.id);

    useEffect(() => {
      console.log(localStorage.getItem("account"));
      if (localStorage.getItem("account")) {
        setAccount(localStorage.getItem("account"));
      } else {
        navigate("/");
        window.location.replace("/");
      }
    }, []);

    useEffect(() => {
      const getBlog = async () => {
        const data = await getBlogbyAddress(contract, address);
      } 
      getBlog();
    }, [])
    

  return (
    <>
        <Navbar></Navbar>
        <div className="SingleBlogPage">
            Single Blog Page
        </div>
    </>
  )
}

export default SingleBlogPage