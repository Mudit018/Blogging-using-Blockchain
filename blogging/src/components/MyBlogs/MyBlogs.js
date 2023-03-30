import React from 'react'
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/context";
import BlogCard from '../blogCard/BlogCard';

const MyBlogs = () => {

    const { account, getUploadedBlogsByUser, contract } = useContext(AppContext);
    const [myBlogs, setMyBlogs] = useState([]);
    
    useEffect(() => {
      
        const getMyBlogs = async () => {
            const myAllBlogs = await getUploadedBlogsByUser(contract, account);
            console.log(myAllBlogs);
            await setMyBlogs(myAllBlogs);
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
        {myBlogs?.length > 0
        ? myBlogs?.map((blog) => {
            console.log(blog)
            return <BlogCard blog={blog} />;
          })
        : "no blogs to show"}
      </div>
    );
}

export default MyBlogs