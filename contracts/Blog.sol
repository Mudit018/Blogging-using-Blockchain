// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.9;

contract Blog {
    uint public blogId;
    address public blogAuthor;
    string public blogTitle;
    string[] public blogTag;
    string public blogTimeStamp;
    string public blogContent;
    string public blogImgHash;
    uint256 public blogLikeCount;

    // mapping(address => bool) public didLike; // > a particular user liked this blog or not
    // address[] public likersAddresses; // > those who have liked this blog

    // struct Likers {
    //     address creator;
    //     uint likeCount;
    //     bool isLiked;
    //     mapping(address => bool) likes;
    // }

    // Likers[] public likes;

    constructor(
        uint _blogId,
        string memory _blogTitle,
        address _blogAuthor,
        string[] memory _blogTag,
        string memory _blogTimestamp,
        string memory _blogContent,
        string memory _blogImgHash
    ) {
        blogId = _blogId;
        blogTitle = _blogTitle;
        blogAuthor = _blogAuthor;
        blogTag = _blogTag;
        blogTimeStamp = _blogTimestamp;
        blogContent = _blogContent;
        blogImgHash = _blogImgHash;
        blogLikeCount = 0;
    }

    // function likePost() public {
    //     require(didLike[msg.sender] == false, "You already liked the post.");
    //     didLike[msg.sender] = true;
    //     blogLikeCount += 1;
    //     likersAddresses.push(msg.sender);
    // }

    // function getBlogAuthor() public view returns (address) {
    //     return blogAuthor;
    // }
    // function getBlogTitle() public view returns (string memory) {
    //     return blogTitle;
    // }
    // function getBlogTag() public view returns (string memory) {
    //     return blogTag;
    // }
    // function getBlogTimeStamp() public view returns (string memory) {
    //     return blogTimeStamp;
    // }
    // function getBlogContent() public view returns (string memory) {
    //     return blogContent;
    // }

    function getBlogDetails() public view returns (
            uint,
            address,
            string memory,
            string[] memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        return (
            blogId,
            blogAuthor,
            blogTitle,
            blogTag,
            blogTimeStamp,
            blogContent,
            blogImgHash,
            blogLikeCount
        );
    }

}