import React from 'react'
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/context";
import BlogCard from '../blogCard/BlogCard';

const MyBlogs = () => {

    const { account, getUploadedBlogsByUser, contract } = useContext(AppContext);
    const [myBlogs, setMyBlogs] = useState([]);
    const [edit, setEdit] = useState(true);
    useEffect(() => {
      
        const getMyBlogs = async () => {
            const myAllBlogs = await getUploadedBlogsByUser(contract, account);
            console.log(myAllBlogs);
            myAllBlogs?.reverse();
            await setMyBlogs(myAllBlogs);
            // console.log(JSON.parse(localStorage.getItem(("allblogs"))));
        }
        getMyBlogs();
    }, [])

    return (
      <div className="my-blogs">
        {myBlogs?.length > 0
        ? myBlogs?.map((blog) => {
            return <BlogCard blog={blog} edit={edit} account={account}/>;
          })
        : "no blogs to show"}
      </div>
    );
}

export default MyBlogs