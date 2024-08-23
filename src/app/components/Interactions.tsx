"use client";

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import UseEther from "../hooks/UseEther";
const Interactions = (props: any) => {
  const { connect } = UseEther();

  const [transferHash, setTransferHash] = useState(null);

  const transferHandler = async (e: any) => {
    e.preventDefault();
    try {
      let transferAmount = e.target.sendAmount.value;
      let recieverAddress = e.target.recieverAddress.value;
      console.log("🚀 ~ transferHandler ~ recieverAddress:", recieverAddress)
      console.log("🚀 ~ transferHandler ~ transferAmount:", transferAmount);
      let txt = await props.contract.transfer(recieverAddress, transferAmount);
      console.log("🚀 ~ transferHandler ~ txt:", txt)

      setTransferHash(txt.hash);  // text.hash là giá trị của hàm băm 
    } catch (error:any) {
      console.log("🚀 ~ transferHandler ~ error:", error)
      if(error.code=="-32603"){
        alert("Số tiền của bạn không đủ để thực hiện giao dịch");
      }else{
        alert("Giao dịch thất bại");
      }
    }
  };

  return (
    <div className="interactionsCard">
      <form onSubmit={transferHandler}>
        <h3 className="text-lg italic font-black text-orange-300">
          {" "}
          Giao dịch{" "}
        </h3>
        <p className="text-lg italic font-bold">Địa chỉ ví muốn gửi tiền </p>
        <input
          className="addressInput mb-2"
          type="text"
          id="recieverAddress"
          required
        />

        <p className="text-lg italic font-bold"> Số tiền gửi </p>
        <input type="number" id="sendAmount" min="0" step="1" required />

        <button className="button6" type="submit">
          Gửi
        </button>
        <div>{transferHash}</div>
      </form>
    </div>
  );
};

export default Interactions;
