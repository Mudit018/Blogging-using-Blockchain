const hre = require("hardhat");

async function main() {
  const BlogFactory = await hre.ethers.getContractFactory("BlogFactory");
  const blogFactory = await BlogFactory.deploy();

  await blogFactory.deployed();

  console.log("Library deployed to:", blogFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
