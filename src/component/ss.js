import React, { useState } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'

const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '<INFURA_KEY>'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

init({
  apiKey,
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    },
    {
      id: '0x5390985',
      token: 'MATIC',
      label: 'Matic Mumbai',
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/'
    }
  ]
})

const Wallet = () =>{
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState(null);

  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    console.log(ethersProvider);
   ethersProvider.getSigner().then((result)=>{
        return result.address;
    }).then((address)=>{
        localStorage.setItem('Address',address)
        setAddress(address);
    }); 
  }

  return (
    <div>
     <div>
      <h1>Wallet Info</h1>
      <button onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
      <p>Address: {wallet ? address : ''} </p>
    </div>
    </div>
  )
}

const WalletComponent = () => {
  //const [chainId, setChainId] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    console.log(window.ethereum)
    if (window.ethereum) {
      try {
        //await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        // const network = await provider.getNetwork();
        // setChainId(network.chainId);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  return (
    <div>
      <h1>Wallet Info</h1>
      <button onClick={connectWallet}>Connect to MetaMask</button>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
};

export {WalletComponent,Wallet}


   if (localStorage.getItem('Address') == null && wallet) {
      provider = new ethers.BrowserProvider(wallet.provider, 'any');
      console.log(provider,"=============proveider");
      provider.getNetwork().then(network => {
         console.log(network.chainId,'=== 11155111n',"========networks")
          if (network.chainId != '11155111') { 
              Settoast(true);
              Settoastmessage("Connect with Sepolia network");
          } else {
              provider.getSigner().then((result) => {
                  signer = result;
                  return result.address;
              }).then((address) => {
                  localStorage.setItem('Address', address);
                  setAddress(address);
              });
          }
      }).catch(error => {
          console.error("Error fetching network:", error);
      });
      console.log(wallet,"============wallet ---- ")
  }

  async function Stake() {
      try {
         if (clicks === 0) {
            Settoast(true);
            Settoastmessage("Give quatity to mint");
         }
         if (address && address !== null && address !== undefined) {
            QuestStakeContract = new ethers.Contract('0x6aC749daFa892B167A38FC9FA4D971859d974964', Questabi, signer);
            NftContract = new ethers.Contract('0xC340B86092c6dA8d6a68F3407cB57F62a9635a66', Nftabi, signer);

            //const minted = await NftContract.getmintedTokens(address)
            //console.log(minted,"======================NFt mint")
            const approve = await NftContract.approve(QuestStakeContract, 12)
            await approve.wait();

            //console.log(approve);
            const staking = await QuestStakeContract.tokenstake(address, [12], [1]);
            console.log(staking);
            await staking.wait();
            setClicks(0);
            const totalstaked = await QuestStakeContract.totalStaked();
            console.log(totalstaked.toString())
            const array = await QuestStakeContract.getStakedTokens(address);
            console.log(array);
            const CurrentReward = await QuestStakeContract.CurrentReward(address, 7)
            console.log(CurrentReward)
            Settoast(true);
            Settoastmessage("Stake Successfull")
         }
      }
      catch (error) {
         Settoast(false)
         Settoastmessage("")
         console.log(error, "==========")
      }

   }


   async function Vaultstack() {
      try {
         if (clicks === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in the Vault");
         }
         else if (address && address !== null && address !== undefined) {
            honorQuest = new ethers.Contract("0xF5604dFdafcEd930A39641947beeb4Ba236e6542", HonorQuest, signer);
            vaultContract = new ethers.Contract("0x88190D6B6A83fcD72530Ee0166edB7d56C24EC2D", vault, signer);
            const ownerOf = await honorQuest.ownerof(2);
            console.log("ownerof", ownerOf)
            const approveall = await honorQuest.setApprovalforAll(vaultContract, true);
            await approveall.wait();

            const vaultStake = await vaultContract.depositToken(address, [2]);
            console.log(vaultStake, "===========vaultStake");
            await vaultStake.wait();
            setClicks(0);
            const ownerOf1 = await honorQuest.ownerof(2);
            console.log("ownerof", ownerOf1)
            const array = await vaultContract.getVaultTokens(address);
            console.log(array.toString());
            Settoast(true);
            Settoastmessage("Vault Staked Successfull")
         }
      }
      catch (err) {
         Settoast(false)
         Settoastmessage("")
         console.log("error:", err)
      }
   }



   async function VaultUnstack() {
      try {
         if (clicks === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in the Vault");
         }
         else if (address && address !== null && address !== undefined) {
            honorQuest = new ethers.Contract("0xF5604dFdafcEd930A39641947beeb4Ba236e6542", HonorQuest, signer);
            vaultContract = new ethers.Contract("0x88190D6B6A83fcD72530Ee0166edB7d56C24EC2D", vault, signer);
            const ownerOf = await honorQuest.ownerof(2);
            console.log("ownerof", ownerOf)
            // const approveall = await honorQuest.setApprovalforAll(vaultContract,true);
            // await approveall.wait();

            const vaultStake = await vaultContract.retrieveToken(address, [2]);
            console.log(vaultStake, "===========vaultStake");
            await vaultStake.wait();
            setClicks(0);
            const ownerOf1 = await honorQuest.ownerof(2);
            console.log("ownerof", ownerOf1)
            const array = await vaultContract.getVaultTokens(address);
            console.log(array.toString());
            Settoast(true);
            Settoastmessage("Vault Staked Successfull")
         }
      }
      catch (err) {
         Settoast(false)
         Settoastmessage("")
         console.log("error:", err)
      }
   }


import React, {  useState, useEffect } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { Gen0abi, Questabi, Nftabi, HonorQuest, vault } from "../lib/abi";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { stake, unstake, getstakedtokens,gettokenUri } from "../Service/L2apis/Stakingapi";
import { Navbar, Nav, Modal } from 'react-bootstrap';
import "../css/wallet.css"
const bgimage = require('../img/bg.jpg');
const bgimage1 = require('../img/bg1.jpg');
//const squire = require('../img/squire.svg');

const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '165e1bf150414830abae5b4af6cc9a75'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

init({
   apiKey,
   wallets: [injected],
   chains: [
      {
         id: '0x1',
         token: 'ETH',
         label: 'Ethereum Mainnet',
         rpcUrl
      },
      {
         id: '0x2105',
         token: 'ETH',
         label: 'Base',
         rpcUrl: 'https://mainnet.base.org'
      },
      {
         id: '11155111',
         token: 'ETH',
         label: 'Sepolia Network',
         rpcUrl: 'https://sepolia.network'
     }
   ]
})

const Wallet = () => {
   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
   const [address, setAddress] = useState(null);
   const [clicks, setClicks] = useState(0);
   const [toast, Settoast] = useState(false);
   const [toastmessage, Settoastmessage] = useState("");
   const [mintedTokens,Setmintedtokens] = useState([]);
   const [metadata, Setmetadata] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [Istoken,SetIstoken] = useState(false);
   const [login,setLogin]=useState(false);
   let provider;
   let signer;
   const mintValueInEther = 0.01;
   const mintValueInWei = ethers.parseEther(mintValueInEther.toString());
   let Gen0Contract;
   let QuestStakeContract;
   let NftContract;
   let honorQuest;
   let vaultContract;
   let array = [];

    useEffect(() => {
      Tokens();
    }, [address]);

   useEffect(() => {
      Tokens();
      if (mintedTokens.length > 0 && currentIndex < mintedTokens.length) {
        Mint(mintedTokens[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, [address, currentIndex, mintedTokens]);


   if (wallet ) {
      provider = new ethers.BrowserProvider(wallet.provider, 'any');
      console.log(provider);
      provider.getSigner().then((result) => {
         signer = result;
         return result.address;
      }).then((address) => {
         setLogin(true);
         localStorage.setItem('Address', address)
         setAddress(address);
      });
   }

 
   const DisconnectWallet = async () => {
      await disconnect(wallet);
      localStorage.removeItem('Address');
      setLogin(false);
      setAddress(null);
   }
   const IncrementItem = () => {
      setClicks(clicks + 1);
   }
   const DecreaseItem = () => {
      if (clicks !== 0) {
         setClicks(clicks - 1);
      }
   }

   const toggletoast = () => {
      Settoast(!toast);
   }

   async function Tokens() {
      try{
         if(login === true){
         const stakeresponse=await getstakedtokens(address)

         Setmintedtokens(stakeresponse.tokens)
         console.log(stakeresponse,"===================================================stakedtokens api");
      }
      }catch(error){
         console.log(error)
      }
   }


  async function Mints() {
      try{
      if(clicks===0){
         Settoast(true);
         Settoastmessage("Give quatity to mint");
      }
      if (address && address !== null && address !== undefined) {
         Gen0Contract = new ethers.Contract('0xEe6a5Bb62B42e7288092671f90B80b62Db1516bc', Gen0abi, signer);
         console.log(Gen0Contract);
         const minting = await Gen0Contract.mint(address, clicks, { value: mintValueInWei });
         console.log(minting);
         await minting.wait();
         setClicks(0);
         //const limit = await Gen0Contract.balanceOf(address);
         //console.log(limit.toString())
         const minted= await Gen0Contract.minted();
          console.log(minted.toString())
         Settoast(true);
         Settoastmessage("Mint Successfull")
         //const meta = await showmetadata(minted.toString())
      }
     }
   catch(error){
      Settoast(false)
      Settoastmessage("")
     console.log(error,"==========")
   }

   }

   async function Mint(minted){
   try{
      
     const mintedtokenUri = await gettokenUri(minted);
     console.log(mintedtokenUri.tokenUri,"==========metadatauri")
     axios.get(`${mintedtokenUri.tokenUri}`)
      .then((res) => {
         if(res.data.attributes[0].trait_type === 'Character' && res.data.attributes[0].value === 'Squire'){
               Setmetadata(oldArray => [...oldArray,'../img/squire.svg'] );
         }
         if(res.data.attributes[0].trait_type === 'Character' && res.data.attributes[0].value === 'Dragon'){
               Setmetadata(oldArray => [...oldArray,'../img/dragon.svg'] );
         }
      })
      console.log(metadata,"==========metadatauri");

   }catch(error){
      console.log(error);
   }
   }


   async function Stake() {
//       try {
//          if (clicks === 0) {
//             Settoast(true);
//             Settoastmessage("Give quatity to mint");
//          }
//          if (address && address !== null && address !== undefined) {
//             QuestStakeContract = new ethers.Contract('0x6aC749daFa892B167A38FC9FA4D971859d974964', Questabi, signer);
//             NftContract = new ethers.Contract('0xC340B86092c6dA8d6a68F3407cB57F62a9635a66', Nftabi, signer);

//             //const minted = await NftContract.getmintedTokens(address)
//             //console.log(minted,"======================NFt mint")
//             const approve = await NftContract.approve(QuestStakeContract, 12)
//             await approve.wait();

//             //console.log(approve);
//             const staking = await QuestStakeContract.tokenstake(address, [12], [1]);
//             console.log(staking);
//             await staking.wait();
//             setClicks(0);
//             const totalstaked = await QuestStakeContract.totalStaked();
//             console.log(totalstaked.toString())
//             const array = await QuestStakeContract.getStakedTokens(address);
//             console.log(array);
//             const CurrentReward = await QuestStakeContract.CurrentReward(address, 7)
//             console.log(CurrentReward)
//             Settoast(true);
//             Settoastmessage("Stake Successfull")
//          }
//       }
//       catch (error) {
//          Settoast(false)
//          Settoastmessage("")
//          console.log(error, "==========")
//       }

   }

async function Vaultstack() {
//       try {
//          if (clicks === 0) {
//             Settoast(true);
//             Settoastmessage("Select Tokens to Stake in the Vault");
//          }
//          else if (address && address !== null && address !== undefined) {
//             honorQuest = new ethers.Contract("0xF5604dFdafcEd930A39641947beeb4Ba236e6542", HonorQuest, signer);
//             vaultContract = new ethers.Contract("0x88190D6B6A83fcD72530Ee0166edB7d56C24EC2D", vault, signer);
//             const ownerOf = await honorQuest.ownerof(2);
//             console.log("ownerof", ownerOf)
//             const approveall = await honorQuest.setApprovalforAll(vaultContract, true);
//             await approveall.wait();

//             const vaultStake = await vaultContract.depositToken(address, [2]);
//             console.log(vaultStake, "===========vaultStake");
//             await vaultStake.wait();
//             setClicks(0);
//             const ownerOf1 = await honorQuest.ownerof(2);
//             console.log("ownerof", ownerOf1)
//             const array = await vaultContract.getVaultTokens(address);
//             console.log(array.toString());
//             Settoast(true);
//             Settoastmessage("Vault Staked Successfull")
//          }
//       }
//       catch (err) {
//          Settoast(false)
//          Settoastmessage("")
//          console.log("error:", err)
//       }
   }


   async function VaultUnstack() {
//       try {
//          if (clicks === 0) {
//             Settoast(true);
//             Settoastmessage("Select Tokens to Stake in the Vault");
//          }
//          else if (address && address !== null && address !== undefined) {
//             honorQuest = new ethers.Contract("0xF5604dFdafcEd930A39641947beeb4Ba236e6542", HonorQuest, signer);
//             vaultContract = new ethers.Contract("0x88190D6B6A83fcD72530Ee0166edB7d56C24EC2D", vault, signer);
//             const ownerOf = await honorQuest.ownerof(2);
//             console.log("ownerof", ownerOf)
//             // const approveall = await honorQuest.setApprovalforAll(vaultContract,true);
//             // await approveall.wait();

//             const vaultStake = await vaultContract.retrieveToken(address, [2]);
//             console.log(vaultStake, "===========vaultStake");
//             await vaultStake.wait();
//             setClicks(0);
//             const ownerOf1 = await honorQuest.ownerof(2);
//             console.log("ownerof", ownerOf1)
//             const array = await vaultContract.getVaultTokens(address);
//             console.log(array.toString());
//             Settoast(true);
//             Settoastmessage("Vault Staked Successfull")
//          }
//       }
//       catch (err) {
//          Settoast(false)
//          Settoastmessage("")
//          console.log("error:", err)
//       }
   }


   
   //0x66D199111c610eeA843853478465766e5Ce42390 -- sepolia - 1
   //0x6Cc79E33dEFc20Be05A5D337706c0AcEA9EFC50D -- sepolia - 2
   //0x07d3b8E5efeE970AEC1DC5E1f4c180360a1e7334 -- sepolia - 3
   //0x9EA8327D8E8ACEb507B3Cfd25f36f909F6A9204b -- sepolia - 4
   //0x5AC1e141F618040A30852604eDAC10330f23ff12
   //0x2b08fa6A479A1aAF75c92e33e186eeea1B79404d
   //0x06c73690f57423169de0fd74f0d6dd830ee64fe2c1e65e5b87483cdd7e5cdf2d

   return (
      <div>
         <div className="cont">
            <div className="header">
               <Navbar expand="lg" sticky="top" className="fixed-header">
                  <ToastContainer className="p-3" position='top-left' style={{ zIndex: 1 }}>
                     <Toast show={toast} onClose={toggletoast} bg="dark">
                        <Toast.Header>
                           <strong className="me-auto">HonorQuest - Mint0</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'> {toastmessage}</Toast.Body>
                     </Toast>
                  </ToastContainer>
                  {wallet && (
                     <Nav style={{ marginRight: "auto", marginLeft: "45vw", border: "2px solid", borderRadius: "5px" }}>
                        <FloatingLabel controlId="walletAddress" label="Wallet Address" className="mr-2" style={{ width: "30vw" }}>
                           <Form.Control type="text" placeholder="Wallet Address" readOnly value={address} />
                        </FloatingLabel>
                     </Nav>
                  )}
                  <Nav style={{ marginLeft: "80vw", marginLeft: "auto", display: "flex" }}>
                     <Button variant="info" onClick={() => (wallet ? DisconnectWallet() : connect())} style={{ display: "flex" }}>
                        {connecting ? 'connecting' : wallet ? 'Disconnect' : 'Connect'}
                     </Button>
                  </Nav>
               </Navbar>
            </div>
            <div className='firstRow'>
               <div className='mint'>
                  {address && (
                     <div style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                        <p>Select how many quantities to mint</p>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="info" onClick={DecreaseItem}>-</Button>
                        <span style={{ paddingRight: "2%", paddingLeft: "2%" }}> {clicks} </span>
                        <Button variant="info" onClick={IncrementItem}>+</Button>
                        <br></br>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="success" onClick={Mint}>Mint</Button>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                       <img src="/asset/squire.svg" alt="Alternative Text" width="2" height="2" />
                     </div>
                  )}
               </div>

               <div className='vault'>
                  <div className='heading' >
                     <div>
                        {address && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" onClick={Stake}>
                                 Quest
                              </Button>
                           </div>
                        )}
                     </div>

                     <div>
                        {address && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" onClick={VaultUnstack}>UnLock</Button>
                           </div>
                        )}
                     </div>
                  </div>
                  <div className='row'>
                     {array.map((data) => (
                        <div className='col-3'>
                           <div className="card">
                              <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                              <div className="card-body">
                                 <p className="card-text">{data}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="lastRow">
               <div className="lock">
                  <div>
                     {address && (
                        <div style={{ marginLeft: "50vh" }}>
                           <Button variant="success" onClick={Vaultstack}>Lock</Button>
                        </div>
                     )}
                  </div>
                  <div className='row'>
                     {array.map((data) => (
                        <div className='col-3'>
                           <div className="card">
                              <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                              <div className="card-body">
                                 <p className="card-text">{data}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div class="stacks">
                  <div class='stacks_first'>
                     <div class='Quest'>
                        <div class='title'>
                           <strong>QUEST</strong>
                           <button className='btn'>Unstack</button>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className='Liyer'>
                        <div className='title'>
                           <strong>LIYER</strong>
                           <button class='btn'>Unstack</button>
                        </div>
                        <div class='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <



   <div className='mint'>
  <div style={{ height: "auto", width: "auto" }}>
    {metadata.map((item, i) => (
      <img
        key={i}
        src={item === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
        alt="Alternative Text"
        style={{ width: "20px", height: "20px" }} // Adjust width and height as needed
      />
    ))}
  </div>
  {address && (
    <div style={{ paddingLeft: "3%", paddingTop: "2%" }}>
      <p>Select how many quantities to mint</p>
    </div>
  )}

  {address && (
    <div style={{ paddingTop: "1%" }}>
      <Button variant="info" onClick={DecreaseItem}>-</Button>
      <span style={{ paddingRight: "2%", paddingLeft: "2%" }}> {clicks} </span>
      <Button variant="info" onClick={IncrementItem}>+</Button>
      <br></br>
    </div>
  )}

  {address && (
    <div style={{ paddingTop: "1%" }}>
      <Button variant="success" onClick={Mint}>Mint</Button>
    </div>
  )}
</div>

<div className='mint'>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    {metadata.map((item, i) => (
      <div key={i}>
        <img
          src={item === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
          alt="Alternative Text"
          style={{ width: "20px", height: "20px" }} // Adjust width and height as needed
        />
        <span>{i}</span>
      </div>
    ))}
  </div>
  {address && (
    <div style={{ paddingLeft: "3%", paddingTop: "2%" }}>
      <p>Select how many quantities to mint</p>
    </div>
  )}

  {address && (
    <div style={{ paddingTop: "1%" }}>
      <Button variant="info" onClick={DecreaseItem}>-</Button>
      <span style={{ paddingRight: "2%", paddingLeft: "2%" }}> {clicks} </span>
      <Button variant="info" onClick={IncrementItem}>+</Button>
      <br></br>
    </div>
  )}

  {address && (
    <div style={{ paddingTop: "1%" }}>
      <Button variant="success" onClick={Mint}>Mint</Button>
    </div>
  )}
</div>

<Nav style={{ marginLeft: "80vw", marginLeft: "auto", display: "flex" }}>
                      <Button variant="info" onClick={() => (address ? DisconnectWallet() : connect())} style={{ display: "flex" }}>
                         {connecting ? 'connecting' :  wallet ? 'Disconnect' : 'Connect'}
                      </Button>
                   </Nav> 


import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const YourComponent = () => {
  const [showpopup, setShowpopup] = useState(false);
  const [apiData, setApiData] = useState(null);

  const handlepopupOpen = () => {
    setShowpopup(true);
    // Fetch your API data here
    axios.get('your_api_url')
      .then(response => {
        setApiData(response.data); // Assuming the API response is an array of objects
      })
      .catch(error => {
        console.error('Error fetching API data:', error);
      });
  };

  const handlepopupClose = () => {
    setShowpopup(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handlepopupOpen}>
        Open Modal
      </Button>

      <Modal show={showpopup} onHide={handlepopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Minted Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Check if API data exists before rendering */}
          {apiData && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {/* Assuming the API response contains keys for column headings */}
                  {Object.keys(apiData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Map through the API data to generate rows */}
                {apiData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlepopupClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default YourComponent;
import React, { useState, useEffect } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react';
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, Table } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Mints, vaultStake, VaultUnstake, vaultstakedTokens, getQuesttokens, ClaimedReward, Isunstake, changetimeperiod, CurrentReward} from '../utils/interact.js'
import { stake, unstake, getmintedtokens, gettokenUri, signature, claimrewards, unstakabletoken } from "../Service/L2apis/Stakingapi";
import { getmintdetails, getalldetails} from "../Service/activityapis"
import { Navbar, Nav } from 'react-bootstrap';
import "../css/wallet.css"
   
const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '165e1bf150414830abae5b4af6cc9a75'
const rpcUrl = `https://sepolia.infura.io/v3/${infuraKey}`

init({
   apiKey,
   wallets: [injected],
   chains: [
      {
         id: '0x1',
         token: 'ETH',
         label: 'Ethereum Mainnet',
         rpcUrl
      },

      {
         id: '0x2105',
         token: 'ETH',
         label: 'Base',
         rpcUrl: 'https://mainnet.base.org'
      },
      {
         id: '11155111',
         token: 'ETH',
         label: 'Sepholia',
         rpcUrl: `https://sepolia.infura.io/v3/${infuraKey}`
      }
   ]
})

const Wallet = () => {
   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
   const navigate = useNavigate();
   const [address, setAddress] = useState("");
   const [clicks, setClicks] = useState(0);
   const [toast, Settoast] = useState(false);
   const [toastmessage, Settoastmessage] = useState("");
   const [mintedTokens, Setmintedtokens] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [vaultStakedTokens, setvaultstakedTokens] = useState([]);
   const [QuestStakedTokens, setQueststakedTokens] = useState([]);
   const [metadata, Setmetadata] = useState([]);
   const [Vstaketokens, SetVstaketokens] = useState([]);
   const [Vunstaketokens, SetVunstaketokens] = useState([]);
   const [Qunstaketokens,SetQunstaketokens] = useState([]);
   const [questClaimedRewards, setQuestClaimedRewards] = useState({});
   const [claimedRewards, setclaimedRewards]= useState("");
   const [signer, Setsigner] = useState("");
   const [Provider, Setprovider] = useState("");
   const [isMinting, SetisMinting] = useState(false);
   const [isStacking, SetisStacking] = useState(false);
   const [isUnstacking, SetisUnstacking] = useState(false);
   const [isQuesting,SetisQuesting] = useState(false);
   const [isUnquesting, SetisUnquesting] = useState(false);
   const [isClaiming, SetisClaiming] = useState(false);
   const [isStake, SetisStake] = useState(false);
   const [login, setLogin] = useState(false);
   const [showpopup, setShowpopup] = useState(false);
   const [showAllpopup, setshowAllpopup] = useState(false);
   const [mintedDetails,SetmintedDetails] = useState(null);
   const [Alldetails, setAlldetails] = useState(null);
   let provider;
   const mintValueInEther = 0.0001 ;
   const mintValueInWei = ethers.parseEther(mintValueInEther.toString());
   let array = [];


   useEffect(() => {
      Tokens(true)
   }, [login]);


   useEffect(() => {
      const Address = localStorage.getItem('Address');
      if (Address !== '' && Address !== null && Address !== undefined) {
          connect();
         setAddress(Address);
         setLogin(false);
         Setsigner('');
      }
   }, [])


   useEffect(() => {
      console.log(mintedTokens, "======================================================mints")
      if (mintedTokens.length > 0 && currentIndex < mintedTokens.length) {
         console.log(mintedTokens, "======================================================ifcondition")
         if (mintedTokens[currentIndex] !== "") {
            Metadata(mintedTokens[currentIndex], 'metadata');
            setCurrentIndex((prevIndex) => prevIndex + 1);
         }
         else {
            Setmetadata([])

         }
      }
   }, [address, currentIndex, mintedTokens]);

    if (wallet && !login) {
      provider = new ethers.BrowserProvider(wallet.provider, 'any')
    provider.getNetwork().then(network => {
         console.log(network.chainId,'=== 11155111n',"========networks")
          if (network.chainId != '11155111') { 
              Settoast(true);
              Settoastmessage("Connect with Sepolia network");
              navigate("/login")
          } else {
            provider.getSigner().then((result) => {
         //let signer = result
         Setsigner(result)
         setLogin(true);
         localStorage.setItem('Address', result.address)
         setAddress(result.address);
         console.log(address, 'Address')
      })
         }
      })

   }

   const DisconnectWallet = async () => {
      try {
         await disconnect(wallet);
         localStorage.removeItem('Address')
         setLogin(false);
         setCurrentIndex(0);
         setClicks(0)
         Setmetadata([]);
         setvaultstakedTokens([]);
         Setsigner('');
         SetVstaketokens([])
         Setmintedtokens([]);
         SetVunstaketokens([]);
         SetQunstaketokens([]);
         setQueststakedTokens([]);
         setclaimedRewards([]);
         setQuestClaimedRewards({});
         setAddress('');
         Setprovider('');
         navigate('/login');
      } catch (error) {
         console.error('Error disconnecting wallet:', error);
      }
   }

   const handlepopupClose = () => setShowpopup(false);
   const handlepopupShow = async () => {
      const details = await getmintdetails(address); 
      SetmintedDetails(details);
      setShowpopup(true);

   }

   const handleClose = () => setshowAllpopup(false);
   const handleShow = async () => {
      const details = await getalldetails(address); 
      SetmintedDetails(details);
      setshowAllpopup(true);

   }

   const IncrementItem = () => {
      setClicks(clicks + 1);
   }
   const DecreaseItem = () => {
      if (clicks !== 0) {
         setClicks(clicks - 1);
      }
   }


   const toggletoast = () => {
      Settoast(!toast);
   }

   async function Tokens(value) {
      try {
         if (address && value === true) {
            Setmintedtokens([]);
            const mintedresponse = await getmintedtokens(address);
            console.log(mintedresponse, "===================================================mintedtokens api");
            //let minted=mintedresponse.tokens
           //const uniqueMinted = minted.filter((token) => !getVaulttokens.includes(token));
            Setmintedtokens(mintedresponse.tokens);
            await getVaulttokens();
         }
          if (address && value === false) {
            Setmintedtokens([]);
            const mintedresponse = await getmintedtokens(address);
            console.log(mintedresponse, "===================================================mintedtokens api");
            //let minted=mintedresponse.tokens
           //const uniqueMinted = minted.filter((token) => !getVaulttokens.includes(token));
            Setmintedtokens(mintedresponse.tokens);
         }
      } catch (error) {
         console.log(error)
      }
   }

   async function getVaulttokens() {
      const getVaultTokens = await vaultstakedTokens(signer, address);
      console.log(getVaultTokens, "===================================================vault api");
       const getQuesttoken= await getQuesttokens(signer,address);
       console.log(getQuesttoken,'=========================getQuesttoken')
      if (getVaultTokens.length > 0) {
         console.log(getQuesttoken);
         const vaulttokens = getVaultTokens.filter((token) => !getQuesttoken.includes(token));
         setvaultstakedTokens([]);
         for (var i = 0; i < vaulttokens.length; i++) {
            if (vaulttokens[i] !== "") {
               await Metadata(vaulttokens[i], 'vault');
            }
         }
      }
      await getQuestTokens(getQuesttoken);
   }

   async function getQuestTokens(Questtoken) {
      setQueststakedTokens([]);
      setQuestClaimedRewards({});
      console.log(Questtoken, "===================================================get Quest api");
      if (Questtoken.length > 0 ) {
         await userclaim();
         for (var i = 0; i < Questtoken.length; i++) {
            if (Questtoken[i] !== "") {
               await Metadata(Questtoken[i], 'Quest');
               await rewards(Questtoken[i])
            }
         }
      }
      //await rewards();
   }

   async function rewards(token){
      const reward = await CurrentReward(signer,address,token,1)
      console.log(reward,"=============================reward")
               const updatedRewards = {};
                 updatedRewards[token] = Math.round(ethers.formatEther(reward));
               setQuestClaimedRewards((prevRewards) => ({ ...prevRewards, ...updatedRewards }));
         
   }

   async function userclaim(){
     const claim= await ClaimedReward(signer,address);
     setclaimedRewards(Math.round(ethers.formatEther(claim)))
   }

    async function Metadata(minted, from) {
      try {
      if(address){
         const mintedtokenUri = await gettokenUri(minted);
         console.log(mintedtokenUri.tokenUri, "==========metadatauri")
         await axios.get(`${mintedtokenUri.tokenUri}`)
            .then((res) => {
               console.log(res);
               if (res.data.attributes[0].trait_type === 'Character' && res.data.attributes[0].value === 'Squire') {
               console.log('squire====================================')
                  const value = 'squire';
                  if(from === 'metadata'){
                     Setmetadata(oldArray => [...oldArray, { minted, value }]);
                  } 
                  else if (from === 'vault'){
                     setvaultstakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
                  else if (from === 'Quest'){
                     setQueststakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
               }
             
               if (res.data.attributes[0].trait_type === 'Character' && res.data.attributes[0].value === 'Dragon') {
                  console.log('dragon====================================')
                  const value = 'dragon'
                  if(from === 'metadata'){
                     Setmetadata(oldArray => [...oldArray, { minted, value }]);
                  } 
                  else if (from === 'vault'){
                     setvaultstakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
                  else if (from === 'Quest'){
                     setQueststakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
                }

            })
            }
      } catch (error) {
         console.log(error);
      }
   }

   async function Mint() {
      try {
         SetisMinting(true);
         if (clicks === 0) {
            Settoast(true);
            Settoastmessage("Give quatity to mint");
         }
         else if (address && address !== null && address !== undefined) {
            const sign = await signature(address,clicks);
            const mint = await Mints(signer,address,clicks,sign,mintValueInWei);
            //const limit = await Gen0Contract.balanceOf(address);
            //console.log(limit.toString())
            Settoast(true);
            Settoastmessage("Mint Successfull");
             setClicks(0);
            await Tokens(false);

            //const meta = await showmetadata(minted.toString())
         }
         SetisMinting(false);
      }
      catch (error) {
         Settoast(false)
         Settoastmessage("")
         SetisMinting(false);
         console.log(error, "==========")
      }

   }

   async function QuestStake() {
      try {
         SetisQuesting(true);
          if (Vunstaketokens.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in the Quest");
         }
         if (address && address !== null && address !== undefined) {
            const Queststake = await stake(address,Vunstaketokens,[1]);
            console.log(Queststake);
            if(Queststake){
             await Tokens(true);
          }
            Settoast(true);
            SetisStake(true);
            Settoastmessage("Stake Successfull")
         }
         SetisQuesting(false);
         SetVunstaketokens([]);
      }
      catch (error) {
         Settoast(false);
         Settoastmessage("");
         SetisQuesting(false);
          SetVunstaketokens([]);
         console.log(error, "==========")
      }

   }
    async function QuestUnstake() {
      try {
         SetisUnquesting(true);
         if (Qunstaketokens.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to unstake from the Quest");
         }
         else if(Qunstaketokens.length && address){
         const canunstake = await unstakabletoken(address);
         const unstakingtokens=canunstake.filter((token) =>Qunstaketokens.includes(token) )
         console.log(unstakingtokens,"====================================unstakingtokens")
         if(unstakingtokens.length==0){
         Settoast(true);
         Settoastmessage("you can only unstake",canunstake,"now" );
         }
         else if (Qunstaketokens.length && address && address !== null && address !== undefined) {
            ////const time = await Isunstake(signer,address)
          //  console.log(time[0],"=================================================time")
          const Questunstake = await unstake(address,Qunstaketokens,[1]);
            await Tokens(true);
            const reward = await ClaimedReward(signer,address)
            setclaimedRewards(reward);
            Settoast(true);
            SetisStake(true);
            Settoastmessage("Questunstake Successfull")
         }
         SetisUnquesting(false);
         SetQunstaketokens([]);
         }
         
      }
      catch (error) {
         Settoast(false)
         Settoastmessage("")
         SetisUnquesting(false)
         SetQunstaketokens([]);
         console.log(error, "==========")
      }

   }


   async function Vaultstack() {
      try {
         SetisStacking(true);
         if (Vstaketokens.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in the Vault");
         }
         else if (address && address !== null && address !== undefined) {
            const vaultstack = await vaultStake(Vstaketokens, signer, address);
            setCurrentIndex(0);
            Setmetadata([])
            await Tokens(true);
            Settoast(true);
            Settoastmessage("Vault Staked Successfull")
         }
         SetisStacking(false);
         SetVstaketokens([]);
      }
      catch (err) {
         Settoast(false)
         Settoastmessage("")
         SetisStacking(false);
          SetVstaketokens([]);
         console.log("error:", err)
      }
   }

   async function VaultUnstack() {
      try {
         SetisUnstacking(true);
         if (Vunstaketokens.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in the Vault");
         }
         else if (address && address !== null && address !== undefined) {
            console.log(Vunstaketokens, "123")
            const vaultunstack = await VaultUnstake(Vunstaketokens, signer, address);
            setCurrentIndex(0);
            Setmetadata([])
            await Tokens(true);
            //SetisStake(true);
            Settoast(true);
            Settoastmessage("Vault UnStaked Successfull")
         }
         SetisUnstacking(false);
         SetVunstaketokens([]);
      }
      catch (err) {
         Settoast(false)
         SetisUnstacking(false);
         Settoastmessage("")
         SetVunstaketokens([]);
         console.log("error:", err)
      }
   }

   async function claim() {
      try{
         SetisClaiming(true);
         if(Qunstaketokens.length === 0){
           Settoast(true);
           Settoastmessage("Select tokens to Claim");
         }
         else if(address && address !== null && address !== undefined){
         const reward = await claimrewards(address, Qunstaketokens, [1]);
         if(reward){
         await userclaim();
         await Tokens(true);
         Settoast(true)
         Settoastmessage("Claimed Succesfully")
      }
      }
      //const reward = await changetimeperiod(signer);
      SetisClaiming(false);
      SetQunstaketokens([]);
      }catch(error){
         Settoast(false)
         Settoastmessage("")
         console.log("error:", error)
         SetisClaiming(false)
         SetQunstaketokens([]);
      }
   }

   const mintedcheckbox = (event, index) => {
      const isChecked = event.target.checked;
      if (isChecked) {
         SetVstaketokens(oldArray => [...oldArray, event.target.value])
      }
      if (!isChecked) {
         SetVstaketokens((current) => current.filter((token) => token !== event.target.value))
      }
      console.log(Vstaketokens, "Vstaketokens=================")
   };

   const vaultcheckbox = (event, index) => {
      const isChecked = event.target.checked;
      if (isChecked) {
         SetVunstaketokens(oldArray => [...oldArray, event.target.value])
      }
      if (!isChecked) {
         SetVunstaketokens((current) => current.filter((token) => token !== event.target.value))
      }
      console.log(Vunstaketokens, "Vunstaketokens================")

   };

   const questcheckbox = (event, index) => {
      const isChecked = event.target.checked;
      if (isChecked) {
         SetQunstaketokens(oldArray => [...oldArray, event.target.value])
      }
      if (!isChecked) {
         SetQunstaketokens((current) => current.filter((token) => token !== event.target.value))
      }
      console.log(Qunstaketokens, "Questtokens===========================")

   };



   //0x66D199111c610eeA843853478465766e5Ce42390 -- sepolia - 1
   //0x6Cc79E33dEFc20Be05A5D337706c0AcEA9EFC50D -- sepolia - 2
   //0x07d3b8E5efeE970AEC1DC5E1f4c180360a1e7334 -- sepolia - 3
   //0x9EA8327D8E8ACEb507B3Cfd25f36f909F6A9204b -- sepolia - 4
   //0x5AC1e141F618040A30852604eDAC10330f23ff12
   //0x2b08fa6A479A1aAF75c92e33e186eeea1B79404d
   //0x06c73690f57423169de0fd74f0d6dd830ee64fe2c1e65e5b87483cdd7e5cdf2d

     return (
      <div>
         <div className="cont">
            <div className="header">
               <Navbar expand="lg" sticky="top" className="fixed-header">
                  <ToastContainer className="p-3" position='top-left' style={{ zIndex: 1 }}>
                     <Toast show={toast} onClose={toggletoast} bg="dark">
                        <Toast.Header>
                           <strong className="me-auto">HonorQuest - Mint0</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'> {toastmessage}</Toast.Body>
                     </Toast>
                  </ToastContainer>
                    {address && (<Nav style={{ marginRight: "17vw", marginLeft: "auto", borderRadius: "5px" }}>
          {/* Button to open the ledger popup */}
          <Button variant="info" onClick={handleShow}>
            Transaction History
          </Button>
                  </Nav>
                  )}

             <Modal show={showAllpopup} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Transaction History</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {/* Check if API data exists before rendering */}
          {mintedDetails && mintedDetails.length>0 ? (
            <Table striped bordered hover style={{ width: '100%', tableLayout: 'fixed', wordWrap: 'break-word' }}>
              <thead>
                <tr>
                  {/* Assuming the API response contains keys for column headings */}
                  {Object.keys(mintedDetails[0]).map((key, index) => (
                    <th key={index || 0}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Map through the API data to generate rows */}
                {mintedDetails.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                     <td key={colIndex || 0} >
                        {Array.isArray(value) ? value.join(', ') : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          ):(
            <p>No results found</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                  {address && (<Nav style={{ marginRight: "auto", marginLeft: "30vw", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="walletAddress" label="Wallet Address" className="mr-2" style={{ width: "30vw" }}>
                        <Form.Control type="text" placeholder="Wallet Address" readOnly value={address} />
                     </FloatingLabel>
                  </Nav>
                  )}
              <Nav style={{ marginLeft: "80vw", marginLeft: "auto", display: "flex" }}>
                      <Button variant="info" onClick={() => (address ? DisconnectWallet() : connect())} style={{ display: "flex" }}>
                         {connecting ? 'connecting' :  wallet ? 'Disconnect' : 'Connect'}
                      </Button>
                   </Nav> 

               </Navbar>
            </div>
            <div className='firstRow'>
               <div className='mint'>

                  {address && (
                     <div style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                        <p>Select how many quantities to mint</p>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="info" onClick={DecreaseItem}>-</Button>
                        <span style={{ paddingRight: "2%", paddingLeft: "2%" }}> {clicks} </span>
                        <Button variant="info" onClick={IncrementItem}>+</Button>
                        <br></br>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting || isUnquesting || isClaiming} onClick={Mint}>{isMinting ? 'Minting' : 'Mint'}</Button>
                     </div>
                  )}

            {address && (
            <CrossmintPayButton disabled={isMinting || isUnstacking || isStacking || isQuesting || isUnquesting || isClaiming}
                collectionId="d8be5d64-60d9-4a68-8249-adfa3a3bbf2d"
                projectId="a96d8eb8-083f-406c-991f-610f50ad4745"
                mintConfig={{"totalPrice":"0.0001","quantity":clicks}}
                environment="staging"
                mintTo={address}
            />
            )}

            {address && (
        <div style={{ paddingTop: '1%' }}>
          {/* Button to open the ledger popup */}
          <Button variant="primary" onClick={handlepopupShow}>
            Minted History
          </Button>
        </div>
      )}

             <Modal show={showpopup} onHide={handlepopupClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Minted History</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {/* Check if API data exists before rendering */}
          {mintedDetails ? (
            <Table striped bordered hover style={{ width: '100%', tableLayout: 'fixed', wordWrap: 'break-word' }}>
              <thead>
                <tr>
                  {/* Assuming the API response contains keys for column headings */}
                  {Object.keys(mintedDetails[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Map through the API data to generate rows */}
                {mintedDetails.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                     <td key={colIndex} >
                        {Array.isArray(value) ? value.join(', ') : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          ):(
            <p>No search results</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlepopupClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
               </div>

               <div className='vault'>
                  <div className='heading' >
                     <div>
                        {address && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming} onClick={QuestStake}>
                                 {isQuesting ? 'Questing...' : 'Quest'}
                              </Button>
                           </div>
                        )}
                     </div>

                     <div>
                        {address && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming} onClick={VaultUnstack}>{isUnstacking ? 'Unlocking...' : 'Unlock'}</Button>
                           </div>
                        )}
                     </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                     {vaultStakedTokens.map(({ minted, value }) => (
                        <div key={minted} value={value}>
                           <img
                              src={value === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
                              alt="Alternative Text"
                              style={{ width: "40px", height: "40px" }}
                           />
                           <p>{minted}</p>
                           <input
                              type="checkbox"
                              id={`checkbox-${minted}`}
                              name={`checkbox-${minted}`}
                              value={minted}
                              onChange={(e) => vaultcheckbox(e, minted)}
                           />
                           <label htmlFor={`checkbox-${minted}`}>
                           </label>
                        </div>
                     ))}
                  </div>

                  <div className='row'>
                     {array.map((data) => (
                        <div className='col-3'>
                           <div className="card">
                              <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                              <div className="card-body">
                                 <p className="card-text">{data}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="lastRow">
               <div className="lock">
                  <div>
                     {address && (
                        <div style={{ marginLeft: "50vh" }}>
                           <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming} onClick={Vaultstack}>{isStacking ? 'Locking...' : 'Lock'}</Button>
                        </div>
                     )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "30%" }}>
                     {metadata.map(({ minted, value }) => (
                        <div key={minted} value={value}>
                           <img
                              src={value === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
                              alt="Alternative Text"
                              style={{ width: "40px", height: "40px" }}
                           />
                           <p>{minted}</p>
                           <input
                              type="checkbox"
                              id={`checkbox-${minted}`}
                              name={`checkbox-${minted}`}
                              value={minted}
                              onChange={(e) => mintedcheckbox(e, minted)}
                           />
                           <label htmlFor={`checkbox-${minted}`}>
                           </label>
                        </div>
                     ))}
                  </div>
                  {mintedDetails && mintedDetails.length > 0 ? (
    <Table striped bordered hover style={{ width: '100%', tableLayout: 'fixed', wordWrap: 'break-word', marginTop: '20px' }}>
      <thead>
        <tr>
          {Object.keys(mintedDetails[0]).map((key, index) => (
            <th key={index || 0}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mintedDetails.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex || 0}>
                {Array.isArray(value) ? value.join(', ') : value}
              </td>
            ))}
             <td>
              {/* Define your action button here */}
              <Button variant="primary" onClick={handlepopupShow}>
                view
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <p>No results found</p>
  )}
                  <div className='row'>
                     {array.map((data) => (
                        <div className='col-3'>
                           <div className="card">
                              <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                              <div className="card-body">
                                 <p className="card-text">{data}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="stacks">
                  <div className='stacks_first'>
                     <div className='Quest'>
                        <div className='title' style={{display: "flex", flexDirection: "row", alignItems: "left" }}>
                           <strong>QUEST</strong>
                           <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming} onClick={QuestUnstake} > {isUnquesting ? 'Unstaking...' : 'Unstake'}</Button>
                        <span>
                        <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming} onClick={claim}> {isClaiming ? 'Claiming...' : 'Claim'}</Button>
                        </span>
                        <span style = {{paddingLeft: "1%"}} >
                         {address && claimedRewards && (<Nav style={{ marginRight: "1vh", marginLeft: "1vw", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="walletAddress" label="Wallet Rewards" className="mr-2" style={{ width: "10vw",  height: "4vw"}}>
                        <Form.Control type="text" placeholder="Wallet Rewards" readOnly value={claimedRewards || 0} />
                     </FloatingLabel>
                  </Nav>
                  )}
                        </span>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                     {QuestStakedTokens.map(({ minted, value }) => (
                        <div key={minted} value={value}>
                           <img
                              src={value === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
                              alt="Alternative Text"
                              style={{ width: "40px", height: "40px" }}
                           />
                           <p>{minted}</p>
                           <input
                              type="checkbox"
                              id={`checkbox-${minted}`}
                              name={`checkbox-${minted}`}
                              value={minted}
                              onChange={(e) => questcheckbox(e, minted)}
                           />
                           <label htmlFor={`checkbox-${minted}`}>
                           </label>
                           <div>
                            <input readOnly value={questClaimedRewards[minted] || 0 } style = {{width: "4vw", height: "4vh"}}/>
                            </div>
                        </div>
                     ))}
                  </div>
                        </div>
                     </div>
                     <div className='Liyer'>
                        <div className='title'>
                           <strong>LAIR</strong>
                           <button className='btn'>Unstack</button>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className='stacks_last'>
                     <div className='Training'>
                        <div className='title'>
                           <strong>TRAINING</strong>
                           <button className='btn'>Unstack</button>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className='Joesting'>
                        <div className='title'>
                           <strong>JOUSTING</strong>
                           <button className='btn'>Unstack</button>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>


         </div>
      </div>

   )
}

export default Wallet
<Modal show={showpopup} onHide={handlepopupClose} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Transaction History</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Check if API data exists before rendering */}
    {viewDetails && (
      <ul>
        {/* Map through the API data to generate list items */}
        {viewDetails.map((row, rowIndex) => (
          <li key={rowIndex}>
            {/* Map through the object keys to generate details */}
            {Object.entries(row).map(([key, value], index) => (
              <span key={index}>
                <strong>{key}:</strong> 
                {Array.isArray(value) ? value.join(', ') : 
                  (key === 'thirdKey' && typeof value === 'string' && value.endsWith('.svg')) ? 
                  <img src={value} alt={key} style={{ maxHeight: '100px' }} /> : 
                  value}
                <br />
              </span>
            ))}
          </li>
        ))}
      </ul>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handlepopupClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


=================================================wallet 15Mar=================================================

import React, { useState, useEffect } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react';
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, Table } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { successtoaster, errortoaster } from "../lib/Toast.js";
import { Mints, Gen1Mints, vaultStake, VaultUnstake, vaultstakedTokens, getQuesttokens, ClaimedReward, Isunstake, changetimeperiod, totalSupply, CurrentReward, Honrs} from '../utils/interact.js'
import { stake, unstake, getmintedtokens, gettokenUri, signature, claimrewards, unstakabletoken } from "../Service/L2apis/Stakingapi";
import { getviewdetails, getalldetails} from "../Service/activityapis"
import { Navbar, Nav } from 'react-bootstrap';
import "../css/wallet.css"
   
const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '165e1bf150414830abae5b4af6cc9a75'
const rpcUrl = `https://sepolia.infura.io/v3/${infuraKey}`

init({
   apiKey,
   wallets: [injected],
   chains: [
      {
         id: '0x1',
         token: 'ETH',
         label: 'Ethereum Mainnet',
         rpcUrl
      },

      {
         id: '0x2105',
         token: 'ETH',
         label: 'Base',
         rpcUrl: 'https://mainnet.base.org'
      },
      {
         id: '11155111',
         token: 'ETH',
         label: 'Sepholia',
         rpcUrl: `https://sepolia.infura.io/v3/${infuraKey}`
      }
   ]
})

const Wallet = () => {
   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
   const navigate = useNavigate();
   const [address, setAddress] = useState("");
   const [clicks, setClicks] = useState(0);
   const [toast, Settoast] = useState(false);
   const [toastmessage, Settoastmessage] = useState("");
   const [mintedTokens, Setmintedtokens] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [vaultStakedTokens, setvaultstakedTokens] = useState([]);
   const [QuestStakedTokens, setQueststakedTokens] = useState([]);
   const [metadata, Setmetadata] = useState([]);
   const [Vstaketokens, SetVstaketokens] = useState([]);
   const [Vunstaketokens, SetVunstaketokens] = useState([]);
   const [Qunstaketokens,SetQunstaketokens] = useState([]);
   const [questClaimedRewards, setQuestClaimedRewards] = useState({});
   const [claimedRewards, setclaimedRewards]= useState("");
   const [signer, Setsigner] = useState("");
   const [Provider, Setprovider] = useState("");
   const [isMinting, SetisMinting] = useState(false);
   const [isStacking, SetisStacking] = useState(false);
   const [isUnstacking, SetisUnstacking] = useState(false);
   const [isQuesting,SetisQuesting] = useState(false);
   const [isUnquesting, SetisUnquesting] = useState(false);
   const [isClaiming, SetisClaiming] = useState(false);
   const [isStake, SetisStake] = useState(false);
   const [login, setLogin] = useState(false);
   const [showpopup, setShowpopup] = useState(false);
   const [supply, setsupply]= useState(false);
   const [showAllpopup, setshowAllpopup] = useState(false);
   const [viewDetails,SetviewDetails] = useState([]);
   const [Alldetails, setAlldetails] = useState(null);
   const [honr,setHonr]=useState(0);
   let provider;
   const mintValueInEther = 0.0001 ;
   const mintValueInWei = ethers.parseEther(mintValueInEther.toString());
   let array = [];


   useEffect(() => {
      Tokens(true)
   }, [login]);


   useEffect(() => {
      const Address = localStorage.getItem('Address');
      if (Address !== '' && Address !== null && Address !== undefined) {
          connect({
          autoSelect: {
            label: 'MetaMask',
            disableModals: true,
    }});
         setAddress(Address);
         setLogin(false);
         Setsigner('');
      }
   }, [])


   useEffect(() => {
      console.log(mintedTokens, "======================================================mints")
      if (mintedTokens.length > 0 && currentIndex < mintedTokens.length) {
         console.log(mintedTokens, "======================================================ifcondition")
         if (mintedTokens[currentIndex] !== "") {
            Metadata(mintedTokens[currentIndex], 'metadata');
            setCurrentIndex((prevIndex) => prevIndex + 1);
         }
         else {
            Setmetadata([])

         }
      }
   }, [address, currentIndex, mintedTokens]);

    if (wallet && !login) {
      provider = new ethers.BrowserProvider(wallet.provider, 'any')
    provider.getNetwork().then(network => {
         console.log(network.chainId,'=== 11155111n',"========networks")
          if (network.chainId != '11155111') { 
              errortoaster("Connect with Sepolia network");
              navigate("/login")
          } else {
            provider.getSigner().then((result) => {
         //let signer = result
         Setsigner(result)
         setLogin(true);
         localStorage.setItem('Address', result.address)
         setAddress(result.address);
         console.log(address, 'Address')
      })
         }
      })

   }

   const DisconnectWallet = async () => {
      try {
         await disconnect(wallet);
         localStorage.removeItem('Address')
         setLogin(false);
         setCurrentIndex(0);
         setClicks(0)
         Setmetadata([]);
         setvaultstakedTokens([]);
         Setsigner('');
         SetVstaketokens([])
         Setmintedtokens([]);
         SetVunstaketokens([]);
         SetQunstaketokens([]);
         setQueststakedTokens([]);
         setclaimedRewards([]);
         setQuestClaimedRewards({});
         setAddress('');
         Setprovider('');
         navigate('/login');
      } catch (error) {
         console.error('Error disconnecting wallet:', error);
      }
   }

   const handlepopupClose = () => setShowpopup(false);
   const handlepopupShow = async (value) => {
      console.log(value,'=======================Popupvalue')
      const details = await getviewdetails(value); 
      SetviewDetails([details]);
      setShowpopup(true);

   }

   const handleClose = () => setshowAllpopup(false);
   const handleShow = async () => {
      const details = await getalldetails(address); 
      setAlldetails(details);
      setshowAllpopup(true);

   }

   const IncrementItem = () => {
      setClicks(clicks + 1);
   }
   const DecreaseItem = () => {
      if (clicks !== 0) {
         setClicks(clicks - 1);
      }
   }

   async function Tokens(value) {
      try {
      if (address && address !== null && address !== undefined) {
         if (value === true) {
            Setmintedtokens([]);
            const mintedresponse = await getmintedtokens(address);
            console.log(mintedresponse, "===================================================mintedtokens api");
            Setmintedtokens(mintedresponse.tokens);
            await getVaulttokens();
         }
          if (value === false) {
            Setmintedtokens([]);
            const mintedresponse = await getmintedtokens(address);
            console.log(mintedresponse, "===================================================mintedtokens api");
            //let minted=mintedresponse.tokens
           //const uniqueMinted = minted.filter((token) => !getVaulttokens.includes(token));
            Setmintedtokens(mintedresponse.tokens);
         }
          await historytable();
          await honrs();
          await totals();
         }
      } catch (error) {
         console.log(error)
      }
   }

   async function getVaulttokens() {
      const getVaultTokens = await vaultstakedTokens(signer, address);
      console.log(getVaultTokens, "===================================================vault api");
       const getQuesttoken= await getQuesttokens(signer,address);
       console.log(getQuesttoken,'=========================getQuesttoken')
      if (getVaultTokens.length > 0) {
         console.log(getQuesttoken);
         const vaulttokens = getVaultTokens.filter((token) => !getQuesttoken.includes(token));
         setvaultstakedTokens([]);
         for (var i = 0; i < vaulttokens.length; i++) {
            if (vaulttokens[i] !== "") {
               await Metadata(vaulttokens[i], 'vault');
            }
         }
      }
      await getQuestTokens(getQuesttoken);
   }

   async function getQuestTokens(Questtoken) {
      setQueststakedTokens([]);
      setQuestClaimedRewards({});
      console.log(Questtoken, "===================================================get Quest api");
      if (Questtoken.length > 0 ) {
         await userclaim();
         for (var i = 0; i < Questtoken.length; i++) {
            if (Questtoken[i] !== "") {
               await Metadata(Questtoken[i], 'Quest');
               await rewards(Questtoken[i])
            }
         }
      }
   }

   async function rewards(token){
      if (address && address !== null && address !== undefined) {
      const reward = await CurrentReward(signer,address,token,1)
      console.log(reward,"=============================reward")
               const updatedRewards = {};
                 updatedRewards[token] = Math.round(ethers.formatEther(reward));
               setQuestClaimedRewards((prevRewards) => ({ ...prevRewards, ...updatedRewards }));
      }
         
   }

   async function totals(){
      const istotal = await totalSupply(signer);
      if(istotal<=9999){
         setsupply(true);
      }
      if(istotal>10000){
         setsupply(false);
      }
   }

   async function honrs(){
      if (address && address !== null && address !== undefined) {
      const honr = await Honrs(signer,address);
      setHonr(ethers.formatEther(honr))
   }
   }

   async function userclaim(){
      if (address && address !== null && address !== undefined) {
     const claim= await ClaimedReward(signer,address);
     setclaimedRewards(Math.round(ethers.formatEther(claim)))
  }
   }

   async function historytable(){
      if (address && address !== null && address !== undefined) {
      const details = await getalldetails(address); 
      setAlldetails(details);
        //setshowAllpopup(true);
   }
   }

    async function Metadata(minted, from) {
      try {
      if(address){
         const mintedtokenUri = await gettokenUri(minted);
         console.log(mintedtokenUri.tokenUri, "==========metadatauri")
         await axios.get(`${mintedtokenUri.tokenUri}`)
            .then((res) => {
               console.log(res);
               if (res.data.attributes[0].trait_type === 'Character' && res.data.attributes[0].value === 'Squire') {
               console.log('squire====================================')
                  const value = 'squire';
                  if(from === 'metadata'){
                     Setmetadata(oldArray => [...oldArray, { minted, value }]);
                  } 
                  else if (from === 'vault'){
                     setvaultstakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
                  else if (from === 'Quest'){
                     setQueststakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
               }
             
               if (res.data.attributes[0].trait_type === 'Character' && res.data.attributes[0].value === 'Dragon') {
                  console.log('dragon====================================')
                  const value = 'dragon'
                  if(from === 'metadata'){
                     Setmetadata(oldArray => [...oldArray, { minted, value }]);
                  } 
                  else if (from === 'vault'){
                     setvaultstakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
                  else if (from === 'Quest'){
                     setQueststakedTokens(oldArray => [...oldArray, { minted, value }]);
                  }
                }

            })
            }
      } catch (error) {
         console.log(error);
      }
   }

   async function Mint() {
      try {
         SetisMinting(true);
         if (clicks === 0) {
            errortoaster("Give quantity to mint");
            SetisMinting(false);
            return;
         }
         else if (address && address !== null && address !== undefined && supply == true) {
            const sign = await signature(address,clicks,"Gen0");
            const mint = await Mints(signer,address,clicks,sign,mintValueInWei);
         }
          else if (address && address !== null && address !== undefined && supply == false) {
            const sign = await signature(address,clicks,"Gen1");
            const mint = await Gen1Mints(signer,address,clicks,sign);
         }
         successtoaster("Mint Successfull");
         setClicks(0);
         await Tokens(false);
         SetisMinting(false);
      }
      catch (error) {
         SetisMinting(false);
         console.log(error, "==========")
      }

   }

   async function QuestStake() {
      try {
         SetisQuesting(true);
          if (Vunstaketokens.length === 0) {
            errortoaster("Select Tokens to Stake in the Quest");
         }
         if (address && address !== null && address !== undefined) {
            const Queststake = await stake(address,Vunstaketokens,[1]);
            console.log(Queststake);
            if(Queststake){
             await Tokens(true);
          }
            SetisStake(true);
            successtoaster("Stake Successfull")
         }
         SetisQuesting(false);
         SetVunstaketokens([]);
      }
      catch (error) {
         SetisQuesting(false);
          SetVunstaketokens([]);
         console.log(error, "==========")
      }

   }
    async function QuestUnstake() {
      try {
         SetisUnquesting(true);
         if (Qunstaketokens.length === 0) {
            errortoaster("Select Tokens to unstake from the Quest");
         }
         else if(Qunstaketokens.length && address){
         const canunstake = await unstakabletoken(address);
         const unstakingtokens=canunstake.filter((token) =>Qunstaketokens.includes(token) )
         console.log(unstakingtokens,"====================================unstakingtokens")
         if(unstakingtokens.length==0){
         successtoaster(`you can only unstake ${canunstake} now` );
         }
         else if (Qunstaketokens.length && address && address !== null && address !== undefined) {
          const Questunstake = await unstake(address,Qunstaketokens,[1]);
            await Tokens(true);
            const reward = await ClaimedReward(signer,address)
            setclaimedRewards(reward);
            SetisStake(true);
            successtoaster("Questunstake Successfull")
         }
         SetisUnquesting(false);
         SetQunstaketokens([]);
         }
         
      }
      catch (error) {
         SetisUnquesting(false)
         SetQunstaketokens([]);
         console.log(error, "==========")
      }

   }


   async function Vaultstack() {
      try {
         SetisStacking(true);
         if (Vstaketokens.length === 0) {
            errortoaster("Select Tokens to Stake in the Vault");
         }
         else if (address && address !== null && address !== undefined) {
            const vaultstack = await vaultStake(Vstaketokens, signer, address);
            setCurrentIndex(0);
            Setmetadata([])
            await Tokens(true);
            successtoaster("Vault Staked Successfull")
         }
         SetisStacking(false);
         SetVstaketokens([]);
      }
      catch (err) {
         SetisStacking(false);
          SetVstaketokens([]);
         console.log("error:", err)
      }
   }

   async function VaultUnstack() {
      try {
         SetisUnstacking(true);
         if (Vunstaketokens.length === 0) {
            errortoaster("Select Tokens to Stake in the Vault");
         }
         else if (address && address !== null && address !== undefined) {
            console.log(Vunstaketokens, "123")
            const vaultunstack = await VaultUnstake(Vunstaketokens, signer, address);
            setCurrentIndex(0);
            Setmetadata([])
            await Tokens(true);
            successtoaster("Vault UnStaked Successfull")
         }
         SetisUnstacking(false);
         SetVunstaketokens([]);
      }
      catch (err) {
         SetisUnstacking(false);
         SetVunstaketokens([]);
         console.log("error:", err)
      }
   }

   async function claim() {
      try{
         SetisClaiming(true);
         if(Qunstaketokens.length === 0){
           errortoaster("Select tokens to Claim");
         }
         else if(address && address !== null && address !== undefined){
         const reward = await claimrewards(address, Qunstaketokens, [1]);
         if(reward){
         await userclaim();
         await Tokens(true);
         successtoaster("Claimed Succesfully")
      }
      }
      //const reward = await changetimeperiod(signer);
      SetisClaiming(false);
      SetQunstaketokens([]);
      }catch(error){
         console.log("error:", error)
         SetisClaiming(false)
         SetQunstaketokens([]);
      }
   }

   const mintedcheckbox = (event, index) => {
      const isChecked = event.target.checked;
      if (isChecked) {
         SetVstaketokens(oldArray => [...oldArray, event.target.value])
      }
      if (!isChecked) {
         SetVstaketokens((current) => current.filter((token) => token !== event.target.value))
      }
      console.log(Vstaketokens, "Vstaketokens=================")
   };

   const vaultcheckbox = (event, index) => {
      const isChecked = event.target.checked;
      if (isChecked) {
         SetVunstaketokens(oldArray => [...oldArray, event.target.value])
      }
      if (!isChecked) {
         SetVunstaketokens((current) => current.filter((token) => token !== event.target.value))
      }
      console.log(Vunstaketokens, "Vunstaketokens================")

   };

   const questcheckbox = (event, index) => {
      const isChecked = event.target.checked;
      if (isChecked) {
         SetQunstaketokens(oldArray => [...oldArray, event.target.value])
      }
      if (!isChecked) {
         SetQunstaketokens((current) => current.filter((token) => token !== event.target.value))
      }
      console.log(Qunstaketokens, "Questtokens===========================")

   };

     return (
      <div>
         <div className="cont">
            <div className="header">
               <Navbar expand="lg" sticky="top" className="fixed-header">
                   {address && (<Nav style={{ marginRight: "14vw", marginLeft: "auto", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="walletAddress" label="Honr" className="mr-2" style={{ width: "10vw" }}>
                        <Form.Control type="text" placeholder="Wallet Address" readOnly value={honr} />
                     </FloatingLabel>
                  </Nav>
                  )}
            
                  {address && (<Nav style={{ marginRight: "auto", marginLeft: "30vw", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="walletAddress" label="Wallet Address" className="mr-2" style={{ width: "30vw" }}>
                        <Form.Control type="text" placeholder="Wallet Address" readOnly value={address} />
                     </FloatingLabel>
                  </Nav>
                  )}
              <Nav style={{ marginLeft: "80vw", marginLeft: "auto", display: "flex" }}>
                      <Button variant="info" onClick={() => (address ? DisconnectWallet() : connect())} style={{ display: "flex" }}>
                         {connecting ? 'connecting' :  wallet ? 'Disconnect' : 'Connect'}
                      </Button>
                   </Nav> 

               </Navbar>
            </div>
            <div className='firstRow'>
               <div className='mint'>

                  {address && (
                     <div style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                        <p>Select how many quantities to mint</p>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="info" onClick={DecreaseItem}>-</Button>
                        <span style={{ paddingRight: "2%", paddingLeft: "2%" }}> {clicks} </span>
                        <Button variant="info" onClick={IncrementItem}>+</Button>
                        <br></br>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting || isUnquesting || isClaiming} onClick={Mint}>{isMinting ? 'Minting' : 'Mint'}</Button>
                     </div>
                  )}

            {address && supply && (
            <CrossmintPayButton disabled={isMinting || isUnstacking || isStacking || isQuesting || isUnquesting || isClaiming}
                collectionId="d8be5d64-60d9-4a68-8249-adfa3a3bbf2d"
                projectId="a96d8eb8-083f-406c-991f-610f50ad4745"
                mintConfig={{"totalPrice":"0.0001","quantity":clicks}}
                environment="staging"
                mintTo={address}
            />
            )}
               </div>

               <div className='vault'>
                  <div className='heading' >
                     <div>
                        {address && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming} onClick={QuestStake}>
                                 {isQuesting ? 'Questing...' : 'Quest'}
                              </Button>
                           </div>
                        )}
                     </div>

                     <div>
                        {address && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming} onClick={VaultUnstack}>{isUnstacking ? 'Unlocking...' : 'Unlock'}</Button>
                           </div>
                        )}
                     </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                     {vaultStakedTokens.map(({ minted, value }) => (
                        <div key={minted} value={value}>
                           <img
                              src={value === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
                              alt="Alternative Text"
                              style={{ width: "40px", height: "40px" }}
                           />
                           <p>{minted}</p>
                           <input
                              type="checkbox"
                              id={`checkbox-${minted}`}
                              name={`checkbox-${minted}`}
                              value={minted}
                              onChange={(e) => vaultcheckbox(e, minted)}
                           />
                           <label htmlFor={`checkbox-${minted}`}>
                           </label>
                        </div>
                     ))}
                  </div>
                  <div className='row'>
                     {array.map((data) => (
                        <div className='col-3'>
                           <div className="card">
                              <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                              <div className="card-body">
                                 <p className="card-text">{data}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="lastRow" >
               <div className="lock" >
                  <div>
                     {address && (
                        <div style={{ marginLeft: "50vh" }}>
                           <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming} onClick={Vaultstack}>{isStacking ? 'Locking...' : 'Lock'}</Button>
                        </div>
                     )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", paddingLeft: "1%" ,justifyContent: "space-around" }}>
                     {metadata.map(({ minted, value }) => (
                        <div key={minted} value={value}>
                           <img
                              src={value === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
                              alt="Alternative Text"
                              style={{ width: "40px", height: "40px" }}
                           />
                           <p>{minted}</p>
                           <input
                              type="checkbox"
                              id={`checkbox-${minted}`}
                              name={`checkbox-${minted}`}
                              value={minted}
                              onChange={(e) => mintedcheckbox(e, minted)}
                           />
                           <label htmlFor={`checkbox-${minted}`}>
                           </label>
                        </div>
                     ))}
                  </div>
                  <div style={{overflow: 'auto'}}>
                   {Alldetails && Alldetails.length > 0 ? (
    <Table striped bordered hover style={{ width: '100%', tableLayout: 'fixed', wordWrap: 'break-word', marginTop: '20px' }}>
      <thead>
        <tr>
          <th >Details</th>
           <th >Action</th>
        </tr>
      </thead>
  <tbody>
    {Alldetails.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {/* Accessing the second key-value pair directly */}
        <td>
          {Object.values(row)[1]} {/* Assuming the second key-value pair */}
        </td>
        <td>
          {/* Define your action button here */}
          <Button variant="primary" onClick={()=>handlepopupShow(Object.values(row)[0])}>
            View
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
    </Table>
  ) : (
    <p>No results found</p>
  )}
   <Modal show={showpopup} onHide={handlepopupClose}>
  <Modal.Header closeButton>
    <Modal.Title>Transaction History</Modal.Title>
  </Modal.Header>
 <Modal.Body>
    {/* Check if API data exists before rendering */}
    {viewDetails && (
      <ul>
        {/* Map through the API data to generate list items */}
        {viewDetails.map((row, rowIndex) => (
          <li key={rowIndex}>
            {/* Map through the object keys to generate details */}
            {Object.entries(row).map(([key, value], index) => (
              <span key={index}>
                <strong>{key}:</strong> 
                {Array.isArray(value) ? value.join(', ') : 
                  (typeof value === 'string' && value.endsWith('.svg')) ? 

                  <img src={'http://localhost:4000/NFT/squire.svg'} alt={key} style={{ maxHeight: '100px' }} /> : 
                  value}
                <br />
              </span>
            ))}
          </li>
        ))}
      </ul>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handlepopupClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

  </div>
                  <div className='row'>
                     {array.map((data) => (
                        <div className='col-3'>
                           <div className="card">
                              <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                              <div className="card-body">
                                 <p className="card-text">{data}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="stacks">
                  <div className='stacks_first'>
                     <div className='Quest'>
                        <div className='title' style={{display: "flex", flexDirection: "row", alignItems: "left" }}>
                           <strong>QUEST</strong>
                           <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming} onClick={QuestUnstake} > {isUnquesting ? 'Unstaking...' : 'Unstake'}</Button>
                        <span>
                        <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming} onClick={claim}> {isClaiming ? 'Claiming...' : 'Claim'}</Button>
                        </span>
                        <span style = {{paddingLeft: "1%"}} >
                         {address && claimedRewards && (<Nav style={{ marginRight: "1vh", marginLeft: "1vw", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="walletAddress" label="Wallet Rewards" className="mr-2" style={{ width: "10vw",  height: "4vw"}}>
                        <Form.Control type="text" placeholder="Wallet Rewards" readOnly value={claimedRewards || 0} />
                     </FloatingLabel>
                  </Nav>
                  )}
                        </span>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
         <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                     {QuestStakedTokens.map(({ minted, value }) => (
                        <div key={minted} value={value}>
                           <img
                              src={value === "squire" ? "/asset/squire.svg" : "/asset/dragon.svg"}
                              alt="Alternative Text"
                              style={{ width: "40px", height: "40px" }}
                           />
                           <p>{minted}</p>
                           <input
                              type="checkbox"
                              id={`checkbox-${minted}`}
                              name={`checkbox-${minted}`}
                              value={minted}
                              onChange={(e) => questcheckbox(e, minted)}
                           />
                           <label htmlFor={`checkbox-${minted}`}>
                           </label>
                           <div>
                            <input readOnly value={questClaimedRewards[minted] || 0 } style = {{width: "4vw", height: "4vh"}}/>
                            </div>
                        </div>
                     ))}
                  </div>
                        </div>
                     </div>
                     <div className='Liyer'>
                        <div className='title'>
                           <strong>LAIR</strong>
                           <button className='btn'>Unstack</button>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className='stacks_last'>
                     <div className='Training'>
                        <div className='title'>
                           <strong>TRAINING</strong>
                           <button className='btn'>Unstack</button>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className='Joesting'>
                        <div className='title'>
                           <strong>JOUSTING</strong>
                           <button className='btn'>Unstack</button>
                        </div>
                        <div className='row'>
                           {array.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src="https://cryptosaurs.one/wp-content/uploads/2022/01/the-shadow-void.jpg" class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>


         </div>
      </div>

   )
}

export default Wallet




