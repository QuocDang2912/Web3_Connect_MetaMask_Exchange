  "use client";
  declare const window: any;
  import { ethers } from "ethers";
  import React, { useState } from "react";
  import simple_token_abi from "../contracts/token_api.json"; // ABI định nghĩa các hàm và sự kiện trong hợp đồng thông minh

  export default function UseEther() {
    const [address, setAddress] = useState<string>("");
    const [balance, setBalance] = useState("0");
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    const contractAddress = '0xb7B8285363Ae8f755f9db674a6D528d8715863Ae';
    // là địa chỉ của hợp đồng thông minh (Đó là địa chỉ cố định trên blockchain.), nơi chứa logic để thực hiện các giao dịch token. (cho phép bạn gọi các hàm của hợp đồng, chẳng hạn như chuyển tiền, kiểm tra số dư, v.v.)

    const getBalance = async () => {
      const balance = await signer.getBalance();
      setBalance(balance.toString());
    };
    const connect = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer)
        const address = await signer.getAddress();
        setAddress(address);

        let tempSigner = provider.getSigner();

        let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner)
        setContract(tempContract);
      }else{
        alert("Vui lòng cài đặt ví MetaMask trước khi liên kết")
      }
    };
    return {
      connect,
      address,
      balance,
      getBalance,
      contract
    };
  }
