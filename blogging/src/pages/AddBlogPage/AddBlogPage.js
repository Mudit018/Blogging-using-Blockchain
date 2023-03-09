import React from 'react'
import { useContext, useState } from 'react';
import { AppContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import "./AddBlogPage.css"
import Navbar from '../../components/navbar/Navbar';
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import axios from "axios";

const AddBlogPage = () => {

  const navigate = useNavigate();
  const { account, createBlog, provider, contract } = useContext(AppContext);
  const initial = {
    title: "",
    tag: "",
    content: "",
    imgHash: "",
  }
  const [blog, setBlog] = useState(initial);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  // console.log(account);

  if (account === "" || !account) {
    navigate("/");
    window.location.replace("/");
  }

  const handleSubmit = async (e) => {
    createBlog(blog);
    console.log(blog);  
  };
  
  const submitFile = async (e) => {
    e.preventDefault();
    if(file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `5716f55588629da9f107`,
            pinata_secret_api_key: `a0021eab4b86b81a3fd74d7572b342a979663d52b0529ccd712039ab1f048d8b`,
            "Content-Type": "multipart/form-data",
          },
        });
        const imgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(imgHash);
        setBlog(blog => ({...blog, "imgHash": imgHash}));
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
        console.log(blog);
      } catch (error) {
        console.log(error);
        alert("Unable to upload image.");
      }
    }
  }

  const handleChange = (e) => {
    setBlog({...blog, [e.target.name]: e.target.value});
  }

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="AddBlogPage">
      <Navbar></Navbar>
      AddBlogPage
      <div className="form">
        <FormControl className="details">
          <FormLabel>Title</FormLabel>
          <Input type="text" onChange={(e) => handleChange(e)} name="title" />

          <FormLabel>Tag</FormLabel>
          <Input type="text" onChange={(e) => handleChange(e)} name="tag" />

          <FormLabel>Content</FormLabel>
          <Textarea
            placeholder="Here is a sample placeholder"
            onChange={(e) => handleChange(e)}
            name="content"
          />

          {/* <FormLabel>Upload Image</FormLabel> */}
          <label htmlFor="file-upload" className="choose">
            Choose Image
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <span className="textArea">Image: {fileName}</span>
          <button type="submit" className="upload" disabled={!file} onClick={((e) => submitFile(e))}>
            Upload File
          </button>

          <Button
            colorScheme="teal"
            variant="outline"
            onClick={(e) => handleSubmit(e)}
          >
            Write a New Blog
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default AddBlogPage