"use client";

import { ethers } from "ethers";
import React, { useState } from "react";
const Interactions = (props: any) => {
  const [transferHash, setTransferHash] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const transferHandler = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);  

    try {
      let transferAmount = e.target.sendAmount.value;
      let recieverAddress = e.target.recieverAddress.value;

      // Kiểm tra địa chỉ ví
      if (!ethers.utils.isAddress(recieverAddress)) {
        alert("Địa chỉ ví không hợp lệ");
        setIsLoading(false); 
        return;
      }
      // Gửi giao dịch
      let tx = await props.contract.transfer(recieverAddress, transferAmount);
      console.log("Giao dịch đã gửi:", tx);

      setTransferHash(tx.hash); // text.hash là giá trị của hàm băm
      alert("Giao dịch thành công!");

      await props.getBalance(); // Cập nhật số dư
    } catch (error: any) {
      console.log("Lỗi khi chuyển tiền:", error);
      if (error.code == "-32603") {
        alert("Số tiền của bạn không đủ để thực hiện giao dịch hoặc vượt quá số tiền được gửi");
      } else {
        alert("Giao dịch thất bại");
      }
    }
    finally {
      setIsLoading(false);  // Dừng loading sau khi hoàn thành
    }
  };

  return (
    <div className="interactionsCard">
      <form onSubmit={transferHandler}>
        <h3 className="text-lg italic font-black text-orange-300">
          {" "}
          Giao dịch{" "}
        </h3>
        <p className="text-lg italic font-bold">Địa chỉ ví muốn gửi Token </p>
        <input
          className="addressInput mb-2"
          type="text"
          id="recieverAddress"
          required
        />

        <p className="text-lg italic font-bold"> Số Token gửi </p>
        <input type="number" id="sendAmount" min="0" step="1" required />

        <button className="button6" type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Gửi"}  
        </button>
        <div>{transferHash}</div>
      </form>
    </div>
  );
};

export default Interactions;
