"use client";
declare const window: any;
import { ethers } from "ethers";
import React, { useState } from "react";
import simple_token_abi from "../contracts/token_api.json";

export default function UseEther() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState(0);
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const contractAddress = '0xC141334a57DDd61Dda76A0dA32fe750E7Cb7f81B';

  const getBalance = async () => {
    const balance = await signer.getBalance();
    console.log("🚀 ~ getBalance ~ balance:", balance)
    console.log("🚀 ~ getBalance ~ balance:", balance.toString())
    setBalance(balance);
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
