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
import { Mints, Gen1Mints, vaultStake, VaultUnstake, vaultstakedTokens, getQuesttokens, getTraintokens, ClaimedReward, Isunstake, changetimeperiod, totalSupply, CurrentReward, Honrs, getlevel, getbonus, l1withdraw, deposit } from '../utils/interact.js'
import { stake, unstake, getmintedtokens, gettokenUri, signature, claimrewards, unstakabletoken, Trainstake, Trainunstake } from "../Service/L2apis/Stakingapi";
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
   const [depositAmount,setdepositAmount]=useState(0);
   const [toast, Settoast] = useState(false);
   const [toastmessage, Settoastmessage] = useState("");
   const [mintedTokens, Setmintedtokens] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [vaultStakedTokens, setvaultstakedTokens] = useState([]);
   const [QuestStakedTokens, setQueststakedTokens] = useState([]);
   const [TrainStakedTokens, setTrainstakedTokens] = useState([]);
   const [metadata, Setmetadata] = useState([]);
   const [Vstaketokens, SetVstaketokens] = useState([]);
   const [Vunstaketokens, SetVunstaketokens] = useState([]);
   const [Qunstaketokens,SetQunstaketokens] = useState([]);
   const [questClaimedRewards, setQuestClaimedRewards] = useState({});
   const [claimedRewards, setclaimedRewards]= useState(0);
   const [signer, Setsigner] = useState("");
   const [Provider, Setprovider] = useState("");
   const [isMinting, SetisMinting] = useState(false);
   const [isStacking, SetisStacking] = useState(false);
   const [isUnstacking, SetisUnstacking] = useState(false);
   const [isQuesting,SetisQuesting] = useState(false);
   const [isUnquesting, SetisUnquesting] = useState(false);
   const [isClaiming, SetisClaiming] = useState(false);
   const [isTraining,SetisTraining] = useState(false);
   const [isTrainUnstacking, SetisTrainUnstacking] = useState(false);
   const [isL1withdraw, SetisL1withdraw] = useState(false);
   const [isStake, SetisStake] = useState(false);
   const [login, setLogin] = useState(false);
   const [showpopup, setShowpopup] = useState(false);
   const [supply, setsupply]= useState(false);
   const [showAllpopup, setshowAllpopup] = useState(false);
   const [viewDetails,SetviewDetails] = useState([]);
   const [Alldetails, setAlldetails] = useState(null);
   const [honr,setHonr]=useState(0);
   const [isLoading,setisLoading]=useState(false);
   const [showModal, setShowModal] = useState(false);
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
         setTrainstakedTokens([])
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

  const handleShowModal = () => 
    setShowModal(true);

  const handleCloseModal = () =>
    setShowModal(false);
  


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
            setisLoading(true);
            Setmintedtokens([]);
            const mintedresponse = await getmintedtokens(address);
            console.log(mintedresponse, "===================================================mintedtokens api");
            Setmintedtokens(mintedresponse.tokens);
            await getVaulttokens();
            setisLoading(false);
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
      setvaultstakedTokens([]);
      const getVaultTokens = await vaultstakedTokens(signer, address);
      console.log(getVaultTokens, "===================================================vault api");
       const getQuesttoken= await getQuesttokens(signer,address);
       console.log(getQuesttoken,'=========================getQuesttoken')
       const getTrainingtoken = await getTraintokens(signer,address);
       console.log(getTrainingtoken,'=========================getTrainingtoken')
      if (getVaultTokens.length > 0) {
         const vaulttokens = getVaultTokens.filter((token) => (!getQuesttoken.includes(token) && !getTrainingtoken.includes(token)));
         setvaultstakedTokens([]);
         for (var i = 0; i < vaulttokens.length; i++) {
            if (vaulttokens[i] !== "") {
               await Metadata(vaulttokens[i], 'vault');
            }
         }
      }
      await getQuestTokens(getQuesttoken);
      await getTrainingTokens(getTrainingtoken);
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

   async function getTrainingTokens(Traintoken) {
      setTrainstakedTokens([]);
      console.log(Traintoken, "===================================================get Training api");
      if (Traintoken.length > 0 ) {
         for (var i = 0; i < Traintoken.length; i++) {
            if (Traintoken[i] !== "") {
               await Metadata(Traintoken[i], 'Train');
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
     console.log(claim,"=============================claiminuserclaim()")
     setclaimedRewards(Math.round(ethers.formatEther(claim)))
     console.log(claimedRewards,"=============================claimedrewards()")
  }
   }

   async function historytable(){
      if (address && address !== null && address !== undefined) {
      const details = await getalldetails(address); 
      setAlldetails(details);
        //setshowAllpopup(true);
   }
   }

   async function gettrainmessage(minted,from){
      if (address && address !== null && address !== undefined && from === "Train") {
         const level = await getlevel(signer,address,minted);
         const bonus = await getbonus(signer,address,minted);
         const value  = {level,bonus};
         return value;
      }
   }

    async function Metadata(minted, from) {
      try {
      if(address){
         const mintedtokenUri = await gettokenUri(minted);
         console.log(mintedtokenUri.tokenUri, "==========metadatauri")
          const message = await gettrainmessage(minted,from);
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
                   else if (from === 'Train'){
                     setTrainstakedTokens(oldArray => [...oldArray, { minted, value, message }]);
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
                  else if (from === 'Train'){
                     setTrainstakedTokens(oldArray => [...oldArray, { minted, value, message }]);
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


   async function QuestStake() {
      try {
         SetisQuesting(true);
          if (Vunstaketokens.length === 0) {
            errortoaster("Select Tokens to Stake in the Quest");
         }
         else if (address && address !== null && address !== undefined) {
            await handleCloseModal();
            const Queststake = await stake(address,Vunstaketokens,[1],"QStake" );
            console.log(Queststake);
            if(Queststake){
             await Tokens(true);
          }
            SetisStake(true);
            successtoaster("Stake Successfull");
            await handleCloseModal()
         }
         SetisQuesting(false);
         SetVunstaketokens([]);
      }
      catch (error) {
         SetisQuesting(false);
          SetVunstaketokens([]);
          await handleCloseModal()
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
         errortoaster(`you cant unstake the tokens now` );
         }
         else if (Qunstaketokens.length && address && address !== null && address !== undefined) {
          const Questunstake = await unstake(address,Qunstaketokens,[1], "QUnStake");
            await Tokens(true);
            const reward = await ClaimedReward(signer,address)
            setclaimedRewards(reward);
            SetisStake(true);
            successtoaster("Questunstake Successfull")
         }
         }
         SetisUnquesting(false);
         SetQunstaketokens([]);
         
      }
      catch (error) {
         SetisUnquesting(false)
         SetQunstaketokens([]);
         console.log(error, "==========")
      }

   }

   async function TrainingStake() {
      try {
         SetisTraining(true);
          if (Vunstaketokens.length === 0) {
            errortoaster("Select Tokens to Stake in the Training");
         }
         else if (address && address !== null && address !== undefined) {
             await handleCloseModal();
            const Training = await stake(address,Vunstaketokens,[1],"TStake");
            console.log(Training);
            if(Training){
             await Tokens(true);
          }
            SetisStake(true);
            successtoaster("Stake Successfull")
         }
         SetisTraining(false);
         SetVunstaketokens([]);
         setShowModal(false);
      }
      catch (error) {
         SetisTraining(false);
          SetVunstaketokens([]);
          setShowModal(false);
         console.log(error, "==========")
      }

   }
    async function TrainingUnstake() {
      try {
         SetisTrainUnstacking(true);
         if (Qunstaketokens.length === 0) {
            errortoaster("Select Tokens to unstake from the Training");
         }
         else if (Qunstaketokens.length && address && address !== null && address !== undefined) {
          const Questunstake = await unstake(address,Qunstaketokens,[1],"TUnstake");
            await Tokens(true);
            const reward = await ClaimedReward(signer,address)
            setclaimedRewards(reward);
            SetisStake(true);
            successtoaster("Unstake Successfull")
         }
         SetisTrainUnstacking(false);
         SetQunstaketokens([]);
         
      }
      catch (error) {
         SetisTrainUnstacking(false)
         SetQunstaketokens([]);
         console.log(error, "==========")
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

  async function L1Withdraw() {
      try {
          setisLoading(true)
         if (claimedRewards === 0) {
            errortoaster("No Amount to withdraw")
            setisLoading(false);
            return;
         }
         else if (address && address !== null && address !== undefined) {
            const sign = await signature(address, claimedRewards, "L1claim");
            console.log(claimedRewards,"==================================================L1claim")
            const withdraw = await l1withdraw(signer, address, claimedRewards, sign);
             await Tokens(true);
            successtoaster("Withrawal Completed Successfully")
         }
         setisLoading(false);
      } catch (error) {
         setisLoading(false);
         console.log("error:", error)
      }
   }

     async function L1Deposit() {
      try {
          setisLoading(true)
         if (depositAmount === 0) {
            errortoaster("No Amount to Deposit")
            return;
         }
         else if (address && address !== null && address !== undefined) {
            const reward = await deposit(signer, address, depositAmount*10**18);
            console.log(reward,"===================================================L1Deposit")
             await Tokens(true);
            successtoaster("Deposit Completed Successfully")
         }
         setisLoading(false);
      } catch (error) {
         setisLoading(false);
         console.log("error:", error)
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
               <div className="loader-container">
               {isMinting || isLoading && (
       <div className="custom-loader-container">
       <div className="loader-spinner"></div>
       <p>Loading...</p>
     </div>
               )}
                 </div>
                  {address && !isLoading && (
                     <div style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                        <p>Select how many quantities to mint</p>
                     </div>
                  )}

                  {address && !isLoading && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="info" onClick={DecreaseItem}>-</Button>
                        <span style={{ paddingRight: "2%", paddingLeft: "2%" }}> {clicks} </span>
                        <Button variant="info" onClick={IncrementItem}>+</Button>
                        <br></br>
                     </div>
                  )}

                  {address && !isLoading && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={Mint}>{isMinting ? 'Minting' : 'Mint'}</Button>
                     </div>
                  )}

            {address && supply && !isMinting && !isLoading && (
            <CrossmintPayButton disabled={isMinting || isUnstacking || isStacking || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw}
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
                   {address && !isClaiming && !isUnquesting && !isLoading && (<Nav style={{ marginRight: "1vh", marginLeft: "1vw", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="Deposit" label="Deposit" className="mr-2" style={{ width: "10vw",  height: "4vw"}}>
                        <Form.Control type="number" placeholder="Deposit" 
                                    onChange={(event) => setdepositAmount(event.target.value)} />
                     </FloatingLabel>
                  </Nav>
                  )}
            <div>
                        {address && !isQuesting && !isLoading && (
                           <div style={{ paddingTop: "1%", marginRight: "8vw"}}>
                      <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={L1Deposit} > {isLoading ? 'Depositing...' : 'Deposit'}</Button>
                           </div>
                        )}
                     </div>
                     <div>
                        {address && !isQuesting && !isLoading && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={handleShowModal}>
                                 {isQuesting ? 'Staking...' : 'Stake'}
                              </Button>
                           </div>
                        )}
                     </div>
                     <div>
                        {address && !isQuesting && !isLoading && (
                           <div style={{ paddingTop: "1%" }}>
                              <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={VaultUnstack}>{isUnstacking ? 'Unlocking...' : 'Unlock'}</Button>
                           </div>
                        )}
                     </div>
                  </div>
                   <div className="loader-container">           
               {isQuesting || isLoading && (
       <div className="custom-loader-container">
       <div className="loader-spinner"></div>
       <p>Loading...</p>
     </div>
               )}
                  </div>
            {address && !isQuesting && !isLoading && (
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
               )}

                    <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Where do you want to Stake?</Modal.Title>
  </Modal.Header>
 <Modal.Footer>
      <Button variant="success" onClick={QuestStake}>Quest</Button>
      <Button variant="primary" onClick={TrainingStake}>Training</Button>
  </Modal.Footer>
</Modal>

   

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
                     {address && !isStacking && !isLoading && (
                        <div style={{ marginLeft: "50vh" }}>
                           <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={Vaultstack}>{isStacking ? 'Locking...' : 'Lock'}</Button>
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
                  <div className="loader-container">         
                  {(isStacking || isLoading) && (
       <div className="custom-loader-container">
       <div className="loader-spinner"></div>
       <p>Loading...</p>
     </div>
               )}
               </div>
                  <div style={{overflow: 'auto'}}>
                   {Alldetails && Alldetails.length > 0 && !isStacking &&!isLoading ? (
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
               <div style={{ display: "flex", flexDirection: "row"}} >
                {address && !isClaiming && !isUnquesting && !isLoading && (<Nav style={{ marginRight: "1vh", marginLeft: "15vw", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="walletAddress" label="Wallet Rewards" className="mr-2" style={{ width: "10vw",  height: "4vw"}}>
                        <Form.Control type="text" placeholder="Wallet Rewards" readOnly value={claimedRewards || 0} />
                     </FloatingLabel>
                  </Nav>
                  )}
            {address && !isClaiming && !isUnquesting && !isLoading && (
             <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={L1Withdraw} > {isLoading ? 'Withdrawing...' : 'Withdraw'}</Button>
             )}
               </div>
                  <div className='stacks_first'>
                     <div className='Quest'>
                     {(isUnquesting || isClaiming || !isLoading) && (
                        <div className='title' style={{display: "flex", flexDirection: "row", alignItems: "left" }}>
                           <strong>QUEST</strong>
                           <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={QuestUnstake} > {isUnquesting ? 'Unstaking...' : 'Unstake'}</Button>
                        <span>
                        <Button variant="success" disabled={isMinting || isUnstacking || isStacking || isQuesting  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={claim}> {isClaiming ? 'Claiming...' : 'Claim'}</Button>
                        </span>
                    {/*    <span style = {{paddingLeft: "1%"}} >
                         {address && !isClaiming && !isUnquesting && !isLoading && (<Nav style={{ marginRight: "1vh", marginLeft: "1vw", border: "2px solid", borderRadius: "5px" }}>
                     <FloatingLabel controlId="walletAddress" label="Wallet Rewards" className="mr-2" style={{ width: "10vw",  height: "4vw"}}>
                        <Form.Control type="text" placeholder="Wallet Rewards" readOnly value={claimedRewards || 0} />
                     </FloatingLabel>
                  </Nav>
                  )}
                        </span> */}
                        </div>
                     )}
                        <div className="loader-container">  
                        {(isUnquesting || isClaiming || isLoading) && (
       <div className="custom-loader-container">
       <div className="loader-spinner"></div>
       <p>Loading...</p>
     </div>
               )}
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
          {(isUnquesting || isClaiming || !isLoading )&& (
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
          )}
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
                            <Button variant="success" disabled={isMinting || isUnstacking || isStacking  || isQuesting || isUnquesting || isClaiming || isTraining || isTrainUnstacking || isL1withdraw} onClick={TrainingUnstake}>
                               {isTrainUnstacking ? 'Unstaking...' : 'Unstake'}
                              </Button>
                        </div>
                         <div className="loader-container">           
               {isTrainUnstacking || isLoading && (
       <div className="custom-loader-container">
       <div className="loader-spinner"></div>
       <p>Loading...</p>
     </div>
               )}
                  </div>
<div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
  {TrainStakedTokens.map(({ minted, value, message }) => (
    <div key={minted} value={value} className="token-container">
      <div className="token-info">
      <div className="mr-2">
        <p>Level:{message.level}</p>
          <p>Bonus:{message.bonus}</p>      
          </div>
</div>
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
    </div>
  ))}
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



