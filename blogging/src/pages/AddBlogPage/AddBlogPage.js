import React from "react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import "./AddBlogPage.css";
import Navbar from "../../components/navbar/Navbar";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import upload_file from "../../images/upload_file.png";

const AddBlogPage = () => {
  const navigate = useNavigate();
  const { account, setAccount, createBlog, provider, contract } = useContext(AppContext);
  const initial = {
    title: "",
    tag: "",
    content: "",
    imgHash: "",
  };
  const [blog, setBlog] = useState(initial);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const toast = useToast();
  const [loadingSuccess, setLoadingSuccess] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(blog);
    try {
      const data = await createBlog(blog);
      // console.log(data);
      toast({
        title: "Success",
        description: "Blog added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFileName("No image selected");
      setFile(null);
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast({
        title: "Unable to add blog",
        description: { error },
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/home");
    }
  };

  const submitFile = async (e) => {
    e.preventDefault();
    setLoadingSuccess(true);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `4aa8c7fb3d1767998705`,
            pinata_secret_api_key: `fe5be9f0c26e28003fc3a4a76342a1410db9142d85186238b86a75d30742ae05`,
            "Content-Type": "multipart/form-data",
          },
        });
        const imgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(imgHash);
        setBlog((blog) => ({ ...blog, imgHash: imgHash }));
        // setFileName("No image selected");
        // setFile(null);
        toast({
          title: "Success",
          description: "Image uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoadingSuccess(false);
      } catch (error) {
        console.log(error);
        // alert("Unable to upload image.");
        toast({
          title: "Unable to upload image",
          description: { error },
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoadingSuccess(false);
      }
    }
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
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
      <div className="main-heading"> Blogger </div>
      <div className="heading">Add New Blog</div>
      <div className="form">
        <FormControl className="details">
          <div className="title-div">
            <FormLabel
              style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.8)" }}
            >
              Title
            </FormLabel>
            <Input type="text" onChange={(e) => handleChange(e)} name="title" />
          </div>
          
          <div className="tag-div">
            <FormLabel
              style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.8)" }}
            >
              Tag
            </FormLabel>
            <Input
              placeholder="Ex - blockchain , web3"
              type="text"
              onChange={(e) => handleChange(e)}
              name="tag"
            />
          </div>

          <div className="content-div">
            <FormLabel
              style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.8)" }}
            >
              Content
            </FormLabel>
            <Textarea
              onChange={(e) => handleChange(e)}
              name="content"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "3px solid #6affaf",
                borderRadius: "10px",
              }}
            />
          </div>

          <div className="choose-img">
            <FormLabel
              style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.8)" }}
            >
              Upload Image:
            </FormLabel>
            <label htmlFor="file-upload" className="choose">
              <img src={upload_file} alt="file" />
              <p>Choose image</p>
            </label>
          </div>

          <div className="upload-img">
            <input
              disabled={!account}
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
            />
            <span className="textArea">Image: {fileName}</span>
            <button
              type="submit"
              className="upload"
              disabled={!file}
              onClick={(e) => submitFile(e)}
            >
              Upload File
              {loadingSuccess ? <Spinner speed="0.4s" /> : ""}
            </button>
          </div>

          <Button
            colorScheme="teal"
            variant="outline"
            className="upload-button"
            onClick={(e) => handleSubmit(e)}
            style={{
              background:
                "linear-gradient(88.93deg,#5ce3fe 12.06%,#6affaf 100%,rgba(92, 227, 254, 0) 89.21%)",
              borderRadius: "25px",
              width: "10%",
              color: "#222222",
              display: "flex",
              alignSelf: "center",
              fontSize: "1.6rem",
              padding: "1.5rem",
            }}
          >
            Upload
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default AddBlogPage;
