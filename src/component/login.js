import React, { useState, useEffect } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Wallet from './wallet';

const Login = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [signer, Setsigner] = useState('');
  let provider;

   useEffect(() => {
      const Address = localStorage.getItem('Address');
      if (Address !== '' && Address !== null && Address !== undefined) {
        setIsConnected(true);
        navigate('/user');
      }
   }, [])


  const handleConnect = async () => {
    await connect();
    setIsConnected(true);
    navigate('/user');
  };


  return (
    <div style ={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      {!isConnected ? (
        <div style ={{paddingTop:"10%"}}>
        <div>
           <img src={"/asset/dragon.svg"} 
           alt="Alternative Text" 
           style={{ width: "200px", height: "200px" }} 
           />
            <span> 
            <img src={"/asset/squire.svg"}
            alt="Alternative Text"
            style={{ width: "200px", height: "200px" }}
            />
            </span>
          </div>
          <div >
            <strong> HONOR QUEST </strong>
          </div>
          <div>
             <Button variant="info" onClick={handleConnect} disabled={connecting}>
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          </div>
        </div>
      ) : (
        <Wallet address={address} />
      )}
    </div>
  );
};

export default Login;