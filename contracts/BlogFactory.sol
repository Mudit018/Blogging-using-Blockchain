// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.9;

import "./Blog.sol";

contract BlogFactory {

    Blog[] public uploadedBlogs; // > an array to keeps all the uploaded blogs
    uint blogId = 0; // > Unique id for all blogs
    mapping (address => Blog[]) ownerToBlogs; // > to keep track of all the blogs by a single owner

    /*
        - a function to create blogs
    */
    function createBlog (
        string memory _blogTitle,
        string memory _blogTag,
        string memory _blogTimestamp,
        string memory _blogContent,
        string memory _blogImgHash
    ) public returns (Blog){
        blogId++;
        Blog newBlog = new Blog(
            blogId,
            _blogTitle,
            msg.sender,
            _blogTag,
            _blogTimestamp,
            _blogContent,
            _blogImgHash
        );

        uploadedBlogs.push(newBlog);
        ownerToBlogs[msg.sender].push(newBlog);
        return newBlog;
    }

    /*
        - a function to get all uploaded blogs
    */
    function getUploadedBlogs() public view returns (Blog[] memory) {
        return uploadedBlogs;
    }

    /*
        - a function to get blogs uploaded by a particular user
    */
    function getUploadedBlogsByUser(address user) public view returns (Blog[] memory) {
        return ownerToBlogs[user];
    }
}