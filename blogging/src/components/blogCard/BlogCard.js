import React from "react";
import "./BlogCard.css";
import BlogImg from "../../images/3.png";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const BlogCard = ({ blog }) => {
  // console.log(blog);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const findDate = () => {
    const date = new Date(Number(blog[4]))
    console.log(date.toUTCString());
    return date.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  }

  const getImgUrl = () => {
    if(blog[6]) {
      return `https://gateway.pinata.cloud/ipfs/${blog[6].substring(6)}`;
    } return BlogImg;
  }

  return (
    <div>
      <div className="card-container">
        <div className="card-child card-left-container">
          {/* {BlogImg} */}
          <img src={getImgUrl()} alt="Blog" />
        </div>
        <div className="card-child card-right-container">
          <div className="blog-heading">{blog[2]}</div>
          <div className="blog-author">{blog[1]}</div>
          <div className="blog-date">{findDate()}</div>
          <div className="blog-content">{blog[5]}</div>
          <div className="blog-tags">
            {blog[3]?.map((tag, i) => {
              return (
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(88.93deg, #5CE3FE, #6AFFAF)",
                    backgroundClip: "text",
                    borderRadius: "25px",
                    padding: "0.4rem  2rem 0.4rem 2rem",
                    color: "black",
                    fontSize: "15px",
                  }}
                >
                  {tag}
                </div>
              );
            })}
          </div>
          {/* <Link to={`/blog/${blog?.id}`}> */}
          <Button
            style={{
              background: "none",
              fontSize: "1.5rem",
              margin: "0",
              padding: "0",
            }}
            onClick={onOpen}
          >
            Read More
          </Button>
          {/* </Link> */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent style={{ background: "#3e4746" }} className="content">
              <ModalHeader className="modal-heading">{blog[2]}</ModalHeader>
              <ModalCloseButton color={"white"} />
              <ModalBody color={"white"} style={{fontSize: "1.5rem"}}>{blog[5]}</ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                  style={{ background: "#3e4746", color: "#6affaf" }}
                >
                  Close
                </Button>
                {/* <Button variant="ghost">Secondary Action</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;