import React, {useState, useContext} from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

const BlogCardEdit = ({blog}) => {

    const toast = useToast();
    const navigate = useNavigate();
    const {updateBlog} = useContext(AppContext);
    // console.log(blog);
    const [title, setTitle] = useState(blog.blogDetails[2]);
    const [content, setContent] = useState(blog.blogDetails[5]);
    const [tag, setTag] = useState(blog.blogDetails[3].join(', '));
    // console.log(data);
    
    const handleEdit = async (e) => {
      e.preventDefault();
      console.log(tag);
      try {
        const data = await updateBlog(blog.blog, title, tag, content, blog.blogDetails[6]);
        if(data?.status === 1) {
            toast({
              title: "Success",
              description: "Blog updated successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            navigate("/home");
        } else {
            toast({
                title: "Unable to update blog",
                description: "",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            navigate("/home");
        }
      } catch (error) {
        toast({
          title: "Unable to update blog",
          description: { error },
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

    };

  return (
    <>
      <FormControl
        className="details"
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div className="title-div">
          <FormLabel
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Title
          </FormLabel>
          <Input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "3px solid #6affaf",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="tag-div">
          <FormLabel
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Tag
          </FormLabel>
          <Input
            placeholder="Ex - blockchain , web3"
            type="text"
            name="tag"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "3px solid #6affaf",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="content-div">
          <FormLabel
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Content
          </FormLabel>
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            name="content"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "3px solid #6affaf",
              borderRadius: "10px",
            }}
            value={content}
          />
        </div>
        {/* 
                                <div className="choose-img">
                                <FormLabel
                                    style={{
                                    fontSize: "1.5rem",
                                    color: "rgba(255,255,255,0.8)",
                                    }}
                                >
                                    Upload Image:
                                </FormLabel>
                                <label htmlFor="file-upload" className="choose">
                                    <img src={upload_file} alt="file" />
                                    <p>Choose image</p>
                                </label>
                                </div> */}

        {/* <div className="upload-img">
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
                                </div> */}
        <div className="edit">
          <Button
            colorScheme="teal"
            variant="outline"
            className="upload-button"
            onClick={(e) => handleEdit(e)}
            style={{
              background:
                "linear-gradient(88.93deg,#5ce3fe 12.06%,#6affaf 100%,rgba(92, 227, 254, 0) 89.21%)",
              borderRadius: "25px",
              width: "12%",
              color: "#222222",
              display: "flex",
              alignSelf: "center",
              fontSize: "1rem",
              padding: "1.2rem",
            }}
          >
            Edit
          </Button>
        </div>
      </FormControl>
    </>
  );
}

export default BlogCardEdit