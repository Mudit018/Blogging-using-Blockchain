import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./SingleBlogPage.css";
import { useParams } from "react-router-dom";
import Default_image from "../../images/3.png";

// const data = {
//   blogDetails: [
//     "kksdjf",
//     "0xfabb0ac9d68b0b445fb7357272ff202c5651694a",
//     "Blogging Using BlockChain",
//     ["solidity", "blockchain", "web3"],
//     "2016-01-01",
//     "React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.",
//   ],
// };

const SingleBlogPage = () => {
  const navigate = useNavigate();
  const { account, contract, setAccount, createBlog, getUploadedBlogsByUser } =
    useContext(AppContext);
  // console.log(account);

  const blogAddress = useParams();
  console.log(blogAddress);
  const [data, setData] = useState();
  // useEffect(() => {
  //   console.log(localStorage.getItem("account"));
  //   if (localStorage.getItem("account")) {
  //     setAccount(localStorage.getItem("account"));
  //   } else {
  //     navigate("/");
  //     window.location.replace("/");
  //   }
  // }, []);

  useEffect(() => {
    const getBlogDetails = (blog) => {
      // console.log(blog);
      if (blog.blog.address === blogAddress.id) return blog.blogDetails;
      // return "";
    };
    const getBlog = async () => {
      const blogData = await getUploadedBlogsByUser(contract, account);
      // console.log(blogData);
      const blog = blogData.filter(getBlogDetails);
      console.log(blog);
      setData(blog[0]);
    };
    getBlog();
  }, []);

  const showImage = () => {
    if (data?.blogDetails[6]) 
      // return data?.blogDetails[6];
      return `https://gateway.pinata.cloud/ipfs/${data?.blogDetails[6].substring(6)}`;
    return Default_image;
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="SingleBlogPage">
        <div className="heading">{data?.blogDetails[2]}</div>
        <div className="tags">
          {data?.blogDetails[3]?.map((tag, i) => {
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
        <div className="img">{<img src={showImage()} alt="file" />}</div>
        <div className="content">{data?.blogDetails[5]}</div>
      </div>
    </>
  );
};

export default SingleBlogPage;
