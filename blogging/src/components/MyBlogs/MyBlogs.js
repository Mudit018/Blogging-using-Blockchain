import React from 'react'
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/context";

const MyBlogs = () => {

    const { account, getUploadedBlogsByUser } = useContext(AppContext);
    const [myBlogs, setMyBlogs] = useState([]);
    
    useEffect(() => {
      
        const getMyBlogs = async () => {
            const myAllBlogs = await getUploadedBlogsByUser(account);
            console.log(myAllBlogs);
            setMyBlogs(myAllBlogs);
            // console.log(JSON.parse(localStorage.getItem(("allblogs"))));
        }
        getMyBlogs();
    }, [])
    

    // const handleClick = async () => {
    //     const myAllBlogs = await getUploadedBlogsByUser(account);
    //     // console.log(myAllBlogs);
    // }

    return (
      <div className="my-blogs">
        My Blogs
        {/* <div className="button" onClick={() => handleClick()}>
          <button>My Blog</button>
        </div> */}
      </div>
    );
}

export default MyBlogs