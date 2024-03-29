import { useState, React } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import Post from "../artifacts/contracts/Blog.sol/Blog.json";

export const AppContext = createContext();

const Context = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const createBlog = async (blog) => {
    console.log(account);
    console.log(blog);
    if (account === "") return;

    try {
      const tagArr = blog.tag.split(",").map((tag) => tag.trim());
      console.log(tagArr);
      const txn = await contract.createBlog(
        blog?.title,
        tagArr,
        Date.now().toString(),
        blog?.content,
        blog?.imgHash
      );
      const data = await txn.wait();
      // console.log(data);
      const blogArray = await contract.getUploadedBlogs();
      // console.log(blogArray);
      if (blogArray) {
        let contractAddress = blogArray[blogArray.length - 1];
        const newContract = new ethers.Contract(
          contractAddress,
          Post.abi,
          signer
        );
        const blogDetails = await newContract.getBlogDetails();
        // console.log(blogDetails, newContract.address);
        const obj = {
          blogDetails: blogDetails,
          blog: newContract
        }
        return obj;
      } else {
        console.log("not possible");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBlogs = async (contract) => {
    if (account === "") return;

    try {
      const blogs = await contract?.getUploadedBlogs();
      let blogArray = [];
      for (let index = 0; index < blogs?.length; index++) {
        const newContract = new ethers.Contract(blogs[index], Post.abi, signer);
        const blogDetails = await newContract.getBlogDetails();
        blogArray.push({blogDetails: blogDetails, blog: newContract});
      }
      console.log(blogArray);
      return blogArray;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getUploadedBlogsByUser = async (contract, account1) => {
    if (account1 === "") return;
    try {
      const myBlogs = await contract.getUploadedBlogsByUser(account1);
      // console.log(myBlogs);
      let myBlogArray = [];
      for (let index = 0; index < myBlogs.length; index++) {
        const newContract = new ethers.Contract(
          myBlogs[index],
          Post.abi,
          signer
        );
        const myBlogDetails = await newContract.getBlogDetails();
        myBlogArray.push({blogDetails: myBlogDetails, blog: newContract});
      }
      return myBlogArray;
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogbyAddress = async (contract, address) => {
    if (address === "") return;

    try {
      console.log(contract, address);
      const data = await address.id.getBlogDetails(); 
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlog = async (blog, title, tag, content, imgHash) => { 
    console.log(blog);
    console.log(typeof(tag));
    console.log(content);
    console.log(imgHash);
    const tagArr =tag.split(",").map((t) => t.trim());
    console.log(tagArr);
    const txn = await blog.updateBlogDetails(title, tagArr, content, imgHash);
    const data = await txn.wait();
    console.log(data);
    return data;
  }

  const updateLike = async (blog, account) => {
    console.log(blog, account);
    const txn = await blog.likePost();
    const data = await txn.wait();
    // console.log(data);
    return data;
  }

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
        contract,
        setContract,
        provider,
        setProvider,
        createBlog,
        signer,
        setSigner,
        getUploadedBlogsByUser,
        getAllBlogs,
        getBlogbyAddress,
        updateBlog,
        updateLike
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
