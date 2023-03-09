import React, { useContext } from 'react'
import "./ConnectWalletPage.css"
import { Button } from "react-bootstrap";
import connectMetaMaskImg from "../../images/metamask.svg"
import { AppContext } from '../../context/context';
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';
import BlogFactory from "../../artifacts/contracts/BlogFactory.sol/BlogFactory.json"

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
        // if(account)
        //   console.log(account);

        let contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

        const contract = new ethers.Contract(
            contractAddress,
            BlogFactory.abi,
            signer
        );
        // console.log(contract);
        await setContract(contract);
        await setProvider(provider);
    };

    const connectToMetaMask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        if(provider)
            loadProvider(provider);
        else
            window.alert("Install MetaMask");

        // try {
        //   console.log(window);
        //   const { ethereum } = window;
        //   if (!ethereum) {
        //     alert("Get metamask");
        //     return;
        //   }
        //   const accounts = await ethereum.request({
        //     method: "eth_requestAccounts",
        //   });
        //   console.log(accounts);
        //   setAccount(accounts[0]);

        //   let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        //   const contract = new ethers.Contract(contractAddress, BlogFactory.abi, signer);
        //   console.log(contract);
        //   setContract(contract);
        // } catch (error) {
        //   console.log(error);
        // }
    };

    return (
        <div className="ConnectWalletPage">
            <header className="ConnectWalletPage-header">
            <h1>Blogging Using Blockchain</h1>
            <Button className="btn-self" variant="secondary" onClick={() => connectToMetaMask()}>
                <img
                src={connectMetaMaskImg}
                alt="Metamask"
                width="50"
                height="50"
                />{" "}
                Connect to MetaMask
            </Button>
            <div className="mt-2 mb-2">
                Connected Account:{" "}
                {account ? (
                <>
                    {account}
                    {navigate(`/home`, { replace: true })}
                </>
                ) : (
                "No Account Connected"
                )}
            </div>
            {/* <Button variant="danger" onClick={() => (disconnectFromMetaMask())}>
            Disconnect MetaMask <img src={ disconnectMetaMaskImg } alt="Disconnect MetaMask" width="50" height="50" />
            </Button> */}
            </header>
        </div>
  );
}

export default ConnectWalletPage