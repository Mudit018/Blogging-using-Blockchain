import { useState, React } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import Post from '../artifacts/contracts/Blog.sol/Blog.json';

export const AppContext = createContext();

const Context = ({children}) => {

    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const createBlog = async (blog) => {
        console.log(account);
        console.log(blog);
        if(account === "")
            return;

        try {
            const tagArr = blog.tag.split(",").map((tag) => (tag.trim()));  
            console.log(tagArr);
            const data = await contract.createBlog(blog?.title, tagArr, Date.now().toString(), blog?.content, blog?.imgHash);
            console.log(data);
            const blogArray = await contract.getUploadedBlogs();
            console.log(blogArray);
            let contractAddress = blogArray[blogArray.length - 1];
            const newContract = new ethers.Contract(contractAddress, Post.abi, signer);
            const blogDetails = await newContract.getBlogDetails();
            console.log(blogDetails);
            return blogDetails;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllBlogs = async () => {
        if(account === "") 
            return;
        
        try {
            const blogs = await contract.getUploadedBlogs();
            let blogArray = [];
            for (let index = 0; index < blogs.length; index++) {
                const newContract = new ethers.Contract(blogs[index], Post.abi, signer);
                const blogDetails = await newContract.getBlogDetails();
                blogArray.push(blogDetails);
            }
            return blogArray;
        } catch (error) {
            console.log(error);
        }
    }

    const getUploadedBlogsByUser = async (account) => {
        if(account === "")
            return;
        try {
            const myBlogs = await contract.getUploadedBlogsByUser(account);
            console.log(myBlogs);    
            let myBlogArray = [];
            for (let index = 0; index < myBlogs.length; index++) {
                const newContract = new ethers.Contract(myBlogs[index], Post.abi, signer);
                const myBlogDetails = await newContract.getBlogDetails();
                myBlogArray.push(myBlogDetails);
            }
            return myBlogArray;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppContext.Provider value={{account, setAccount, contract, setContract, provider, setProvider, createBlog, signer, setSigner, getUploadedBlogsByUser, getAllBlogs}}>{children}</AppContext.Provider>
    )

}

export default Context;