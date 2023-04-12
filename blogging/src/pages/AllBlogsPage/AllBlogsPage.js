import React, { useState , useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/context";
import Navbar from "../../components/navbar/Navbar";
import "./AllBlogsPage.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import BlogCard from "../../components/blogCard/BlogCard";

const data = [
  {
    id: 1,
    title: "Blogging Using BlockChain",
    date: "2016-01-01",
    author: "mudit",
    tags: ["solidity", "blockchain", "web3"],
    content:
    "React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.",
  },
  {
    id: 2,
    title: "React.js",
    date: "2016-01-01",
    author: "mudit",
    tags: ["solidity", "blockchain", "web3"],
    content:
    "React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.",
  },
  {
    id: 3,
    title: "React.js",
    date: "2016-01-01",
    author: "mudit",
    tags: ["solidity", "blockchain", "web3"],
    content:
      "React.js is a JavaScript library for building user interfaces. It is a fast, powerful, and fun library that allows you to build interactive web apps and mobile apps.",
  }
];

const AllBlogsPage = () => {

  const navigate = useNavigate();
  const { account, setAccount, getAllBlogs, contract } = useContext(AppContext);
  const [allBlogs, setAllBlogs] = useState([]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    const allBlogs = async () => {
      // console.log(contract);
      const data = await getAllBlogs(contract);
      // console.log(data);
      data?.reverse();
      await setAllBlogs(data);
      // localStorage.setItem("allblogs", JSON.stringify(data));
    };
    allBlogs();
  }, []);

  const handleClick = async () => {
    const data = await getAllBlogs();
    console.log(data);
    await setAllBlogs(data);
    localStorage.setItem("allblogs", JSON.stringify(data));
  };

  const setSearchValue = (e) => {
    setSearch(e.target.value);
    console.log(search);
  }

  const filteredBlogs = useMemo(() => {
    const filters = search?.split(":");
    // console.log(typeof(filters));
    const first = filters[0];
    const second = filters[1]?.trim();
    if(search === "" || "tag".includes(search) || "user".includes(search)) {
      return allBlogs;
    } else {
      // const second = filters.slice(1);
      // console.log(first, second[0]?.split(",").map((elem) => elem.trim()));

      if(first === "user") {
        return allBlogs?.filter((blog) =>
          blog?.blogDetails[1].toLowerCase()?.includes(second?.toLowerCase())
        );
      } else if(first === "tag") {
        return allBlogs?.filter((blog) =>
          blog?.blogDetails[3]?.some((tag) =>
            tag.toLowerCase().includes(second?.toLowerCase())
          )
        );
      }

    }
  }, [allBlogs, search]);

  return (
    <div className="AllBlogsPage">
      <Navbar></Navbar>

      <div className="search-bar">
        <input type="text" placeholder="Search for tags" onChange={e => (setSearchValue(e))}></input>
        <SearchIcon />
      </div>

      {
        filteredBlogs?.length > 0
        ? filteredBlogs.map((blog) => {
            return <BlogCard blog={blog} account={account}/>;
          })
        : "no blogs to show"
      }
    </div>
  );
};

export default AllBlogsPage;
