"use client";
declare const window: any;
import React, { useEffect, useState } from "react";
// import styles from "./Wallet.module.css";
import simple_token_abi from "../contracts/token_api.json";
import { ethers } from "ethers";
import UseEther from "../hooks/UseEther";
import Interactions from "./Interactions";
// import Interactions from './Interactions';

export default function Wallet() {
  const { connect, address,balance,getBalance,contract } = UseEther();
  console.log("🚀 ~ Wallet ~ contract:", contract)

  useEffect(() => {
        connect()   
  }, []);


  useEffect(() => {
    if(address){
        getBalance()
    }
  }, [address]);
  return (
    <div>
      <h2>{/* {tokenName + " ERC-20 Wallet"} */}</h2>      
      {
        address? (<div>{address}</div>):(<button className="button6" onClick={connect}>connect wallet MetaMask </button>)
      }

      <div>
        <div>
          {/* <h3>
            Address:
          </h3> */}
        </div>
        <div>
          <h3> Balance: {ethers.utils.formatUnits(balance.toString())}</h3>
        </div>
        {/* {error} */}
      </div>
      <Interactions contract={contract} />
    </div>
  );
}
