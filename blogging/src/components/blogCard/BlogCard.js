import React, { useState, useContext } from "react";
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
import { EditIcon } from "@chakra-ui/icons";
import BlogCardEdit from "./BlogCardEdit";
// import filledHeart from "../../images/filled-heart.png";
// import unfilledHeart from "../../images/unfilled-heart.png";
import filledHeart from "../../images/filled-hand.png";
import unfilledHeart from "../../images/unfilled-hand.png";
import { AppContext } from "../../context/context";

const BlogCard = ({ blog, edit, account }) => {
  // console.log(blog);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateLike } = useContext(AppContext);
  const checkLike = () => {
    console.log(blog.blogDetails[8]?.includes(account));
    return blog.blogDetails[8]?.includes(account);
  };
  const [like, setLike] = useState(checkLike);
  const [showModal, setShowModal] = useState(false);
  const [len, setLen] = useState(blog.blogDetails[8].length);
  const findDate = () => {
    const date = new Date(Number(blog.blogDetails[4]));
    // console.log(date.toUTCString());
    return date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" });
  };

  const getImgUrl = () => {
    if (blog.blogDetails[6]) {
      return `https://gateway.pinata.cloud/ipfs/${blog.blogDetails[6].substring(
        6
      )}`;
    }
    return BlogImg;
  };

  const handleLike = async () => {
    // console.log(account);
    const data = await updateLike(blog?.blog, account);
    console.log(data);
    if (data.status === 1) {
      setLike(!like);
      setShowModal(true);
      setLen(prev => prev + 1);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="card-container">
        <div className="card-child card-left-container">
          {/* {BlogImg} */}
          <img src={getImgUrl()} alt="Blog" />
        </div>
        <div className="card-child card-right-container">
          <div className="same">
            <div className="blog-heading">{blog.blogDetails[2]}</div>
            {like ? (
              <div className="like like-type">
                <img src={filledHeart} alt="like" style={{ width: "2.1rem" }} />
                <div className="like-number">
                  {len}
                </div>
              </div>
            ) : (
              <div className="unlike like-type" onClick={handleLike} style={{cursor: "pointer"}}>
                <img
                  src={unfilledHeart}
                  alt="unlike"
                  style={{ width: "2.1rem" }}
                />
                <div className="like-number">
                  {blog.blogDetails[8].length}
                </div>
              </div>
            )}
            {showModal && (
              <div className="like-modal-overlay" onClick={handleClose}>
                <div className="like-modal-content" style={{ height: "60vh" }}>
                  <iframe src="https://embed.lottiefiles.com/animation/20953"></iframe>
                </div>
              </div>
            )}
            <div className="edit">
              {edit ? (
                <>
                  <EditIcon onClick={onOpen} style={{ cursor: "pointer" }} />
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent
                      style={{ background: "#3e4746", maxWidth: "80vw" }}
                      className="content"
                    >
                      <ModalHeader className="modal-heading" color={"white"}>
                        Edit Blog
                      </ModalHeader>
                      <ModalCloseButton color={"white"} />
                      <ModalBody color={"white"} style={{ fontSize: "1.5rem" }}>
                        <BlogCardEdit blog={blog} />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={onClose}
                          style={{ background: "#3e4746", color: "#6affaf" }}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="blog-author">{blog.blogDetails[1]}</div>
          <div className="blog-date">{findDate()}</div>
          <div className="blog-content">{blog.blogDetails[5]}</div>
          <div className="blog-tags">
            {blog.blogDetails[3]?.map((tag, i) => {
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
          <Link to={`/blog/${blog?.blogDetails[1]}/${blog?.blog?.address}`}>
            <Button
              style={{
                background: "none",
                fontSize: "1.5rem",
                margin: "0",
                padding: "0",
              }}
              onClick={onOpen}
              className="read-more"
            >
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
