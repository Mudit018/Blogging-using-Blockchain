import React, { useContext } from "react";
import "./ConnectWalletPage.css";
import { Button } from "react-bootstrap";
import connectMetaMaskImg from "../../images/metamask.svg";
import { AppContext } from "../../context/context";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import BlogFactory from "../../artifacts/contracts/BlogFactory.sol/BlogFactory.json";
import homepage from "../../images/Homepage.png";
import Navbar from "../../components/navbar/Navbar";

const ConnectWalletPage = () => {
  const navigate = useNavigate();
  const { account, setAccount, setProvider, setContract, setSigner } =
    useContext(AppContext);

  const loadProvider = async (provider) => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    await setAccount(address);
    await setSigner(signer);
    localStorage.setItem("account", address);
    // if(account) {
    //     console.log(account);
    // }

    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    const contract = new ethers.Contract(
      contractAddress,
      BlogFactory.abi,
      signer
    );
    console.log(contract);
    await setContract(contract);
    
    await setProvider(provider);
    navigate("/home");
  };

  const connectToMetaMask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    if (provider) {
      loadProvider(provider);
      // if(account !== "") {
      // localStorage.setItem("account", account);
      // }
      //   if(account !== "") {
      //   }
    } else {
      window.alert("Install MetaMask");
    }
  };

  return (
    <div className="ConnectWalletPage">
      <header className="ConnectWalletPage-header">
        <h1>Blogger</h1>
        <div className="main">
          <div className="left">
            <div className="heading">Blogging Using Blockchain</div>
            <div className="text">
              Blogging using blockchain is an innovative approach to creating
              and sharing content online. Unlike traditional blogging platforms,
              where content is stored on a centralized server, blockchain-based
              blogging platforms use a decentralized network of computers to
              store and distribute content.
            </div>
            <Button
              className="btn-self"
              variant="secondary"
              onClick={() => connectToMetaMask()}
            >
              <img
                src={connectMetaMaskImg}
                alt="Metamask"
                width="50"
                height="50"
              />{" "}
              Connect to MetaMask
            </Button>
          </div>
          <div className="right">
            <img className="wallet-pic" src={homepage} alt="home-page" />
          </div>
        </div>
        {/* <div className="mt-2 mb-2">
                    Connected Account:{" "}
                    {account ? (
                    <>
                        {account}
                        {navigate(`/home`, { replace: true })}
                    </>
                    ) : (
                    "No Account Connected"
                    )}
                </div> */}
        {/* <Button variant="danger" onClick={() => (disconnectFromMetaMask())}>
                Disconnect MetaMask <img src={ disconnectMetaMaskImg } alt="Disconnect MetaMask" width="50" height="50" />
                </Button> */}
      </header>
    </div>
  );
};

export default ConnectWalletPage;
