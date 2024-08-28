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

    const contractAddress = '0x73579d4255bD670A77784CDc567A7Cf317FD1e91';
    // là địa chỉ của hợp đồng thông minh (Đó là địa chỉ cố định trên blockchain.), nơi chứa logic để thực hiện các giao dịch token. (cho phép  gọi các hàm của hợp đồng, chẳng hạn như chuyển tiền, kiểm tra số dư, v.v.)

    const getBalance = async () => {
      if (signer) {
        const balance = await signer.getBalance(); // lấy ra số dư
        setBalance(balance.toString());
      } else {
        alert("Vui lòng kết nối ví trước khi lấy số dư!");
      }
    };
    const connect = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        ); //  giúp kết nối ứng dụng của bạn với mạng blockchain thông qua một nhà cung cấp Web3. any : có thể sử dụng bất kỳ mạng nào
        await provider.send("eth_requestAccounts", []); // gửi yêu cầu truy cập tk  
        const signer = provider.getSigner(); // lấy được tk mà người dùng đã chọn trong MetaMask.
        setSigner(signer)
        const address = await signer.getAddress(); // lấy địa chỉ
        setAddress(address);

        let tempSigner = provider.getSigner();

        let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner) // Khởi tạo hợp đồng thông minh (contract)
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
