"use client";
declare const window: any;
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import UseEther from "../hooks/UseEther";
import Interactions from "./Interactions";

export default function Wallet() {
  const { connect, address,balance,getBalance,contract } = UseEther();
  const handleConnect=() => {
    connect() 
  }
  
  useEffect(() => {
    if(address){
        getBalance()
        // connect()
    }
  }, [address]);
  return (
    <div>    
      {
        address? (<h2 className="text-3xl font-bold text-center">Đã liên kết ví</h2>):(
          <div>
        <button className="button6" onClick={handleConnect}>Liên kết ví MetaMask </button>
          </div>
      )
      }

      <div className="walletCard">
        <div >
          <h2>
            Địa chỉ Ip: {address}
          </h2>
        </div>
        <div>
          <h2> Số dư: {ethers.utils.formatUnits(balance)}</h2>
          {/* <h2> Số dư: {balance}</h2> */}
        </div>
      </div>
      <Interactions getBalance={getBalance} contract={contract} />
    </div>
  );
}
