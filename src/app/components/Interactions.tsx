"use client";

import React, { useState,useEffect } from "react";

import {ethers} from 'ethers'


const Interactions = (props:any) => {

	const [transferHash, setTransferHash] = useState(null);

	const transferHandler = async (e:any) => {
        e.preventDefault();
        try {
            let transferAmount = e.target.sendAmount.value;
            let recieverAddress = e.target.recieverAddress.value;
    
            let txt = await props.contract.transfer(recieverAddress, transferAmount);
            console.log("🚀 ~ transferHandler ~ txt:", txt)
            setTransferHash(txt.hash);
        } catch (error) {
           alert("địa chỉ Ip không tồn tại")
        }
	}
	
return (
			<div >
				<form onSubmit={transferHandler}>
					<h3> Transfer Coins </h3>
						<p>Địa chỉ account muốn gửi </p>
						<input type='text' id='recieverAddress' required/>

						<p> số tiền gửi </p>
						<input type='number' id='sendAmount' min='0' step='1' required/>

						<button type='submit'>Gửi</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
}

export default Interactions;