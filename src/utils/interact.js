import {Gen0,Gen1,L1Nft,L2Nft,Quest,Vault,Honr,Train,Claim} from "./contract.js"
import config from "../config.js";

export async function Mints(signer, address, token, sign, mintValueInWei){
   const Gen0Contract = await Gen0(signer);
            console.log(Gen0Contract);
            const minting = await Gen0Contract.mint(token,sign.deadline,sign.nonce,sign.v,sign.r,sign.s, { value: mintValueInWei });
            console.log(minting);
            await minting.wait();
             const minted = await Gen0Contract.minted();
            console.log(minted.toString())
            return true;
}

export async function Gen1Mints(signer, address, token, sign){
   const Gen1Contract = await Gen1(signer);
            console.log(Gen1Contract);
            const minting = await Gen1Contract.mint(address,token,sign.deadline,sign.nonce,sign.v,sign.r,sign.s);
            console.log(minting);
            await minting.wait();
             const minted = await Gen1Contract.minted();
            console.log(minted.toString())
            return true;
}

export async function IsApproved(owner,spender,contract,signer){
    const isApproved = await contract.isApprovedForAll(owner,spender)
    console.log(isApproved)
    if(!isApproved){
    const approveall = await contract.setApprovalforAll(spender,true);
    await approveall.wait();
 }
}

export async function vaultStake(token,signer,address) {
    const honorQuest = await L1Nft(signer);
    console.log(honorQuest)
    const vaultContract = await Vault(signer);
    console.log(vaultContract)
    await IsApproved(address,vaultContract,honorQuest,signer);
    //const sig=signer.address
    const vaultStake = await vaultContract.depositToken(token);
    console.log(vaultStake, "===========vaultStake");
    await vaultStake.wait();
    const vaultStakedtokens = await vaultContract.getVaultTokens(address);
    console.log(vaultStakedtokens.toString());
    return vaultStakedtokens.toString();
}

export async function VaultUnstake(token,signer,address){
    const honorQuest = await L1Nft(signer);
    console.log(token,"===========token")
    const vaultContract = await Vault(signer);
    //const approveall = await honorQuest.setApprovalforAll(vaultContract,true);
    //await approveall.wait();
    const vaultUnStake = await vaultContract.retrieveToken(token);
    console.log(vaultUnStake, "===========vaultunStake");
    await vaultUnStake.wait();
    const vaultStakedtokens = await vaultContract.getVaultTokens(address);
    console.log(vaultStakedtokens.toString());
    return vaultStakedtokens.toString();
}

export async function deposit(signer,address,amount){
    console.log(amount,"=========================================amountofdeposit");
    const HonrContract = await Honr(signer);
    const deposittoken = await HonrContract.transfer(config.vault,amount.toString())
    await deposittoken.wait();
    return true;
}

export async function vaultstakedTokens(signer,address) {
console.log(signer, "===========vaultStake");
    const vaultContract = await Vault(signer);
    const vaultStakedtokens = await vaultContract.getVaultTokens(address);
     let L1tokens = vaultStakedtokens.toString().split(",");
   console.log(L1tokens, "===========array")
    return L1tokens;
}

export async function getQuesttokens(signer,address) {
console.log(signer, "===========vaultStake");
    const QuestContract = await Quest(signer);
    const questStakedtokens = await QuestContract.getStakedTokens(address)
    const Questtokens = questStakedtokens.toString().split(',')
   console.log(questStakedtokens, "===========Questtokens")
  // const details = await QuestContract.stakedDetails(address);
   //console.log(details.toString(),"===========stakedDetails")
    return Questtokens;
}

export async function getTraintokens(signer,address) {
    console.log(signer,"===========Trainsifgner")
    console.log(address, "===========address");
    const TrainContract = await Train(signer);
    const trainStakedtokens = await TrainContract.getStakedTokens(address);
    const Traintokens = trainStakedtokens.toString().split(',');
   console.log(Traintokens, "===========Traintokens");
   return Traintokens;
}

export async function ClaimedReward(signer,address) {
console.log(signer, "===========vaultStake");
    const QuestContract = await Quest(signer);
    const claim = await QuestContract.claimedRewards(address)
    console.log(claim.toString(),"================claim")
    return claim.toString();
}

export async function Isunstake(signer,address) {
console.log(signer, "===========vaultStake");
    const QuestContract = await Quest(signer);
    const claim = await QuestContract.getStakedDetails(address)
    console.log(claim.toArray(),"================details")
    return claim.toArray();
}

export async function CurrentReward(signer,address,token,character) {
    console.log(token,character, "===========vaultStake");
        const QuestContract = await Quest(signer);
        const claim = await QuestContract.CurrentReward(address,token,character)
        console.log(claim.toString(),"================currentReward")
        return claim.toString();
       
    }

export async function Honrs(signer,address){
    const HonrContract = await Honr(signer);
    const honor = await HonrContract.balanceOf(address);
    console.log(honor.toString(),"===========honr")
    return honor.toString();
}

export async function totalSupply(signer){
    const HonorQuestContract = await L1Nft(signer);
    const total = await HonorQuestContract.totalsupply();
    console.log(total.toString(),"===========total")
    return total.toString();
}

export async function changetimeperiod(signer) {
console.log(signer, "===========vaultStake");
    const QuestContract = await Quest(signer);
    const questStakedtokens = await QuestContract.updateTimePeriod(10);
    await questStakedtokens.wait()
    const time = await QuestContract.timePeriod()
    console.log(time.toString(),"====================================================time")
    //const claim = await QuestContract.userClaimedRewards(address)
    //console.log(claim.toString(),"================claim")
    //return claim.toString();
   
}

export async function getlevel(signer,address,tokenId) {
const TrainContract = await Train(signer);
const trainStakedtokens = await TrainContract.getlevel(address,tokenId);
const level = trainStakedtokens.toString().split(',');
console.log(tokenId,level,"====================================================tokenIDlevel")
return level;
}


 export async function getbonus(signer,address,tokenId) {
    const TrainContract = await Train(signer);
    const trainStakedtokens = await TrainContract.getbonus(address,tokenId);
    const bonus = trainStakedtokens.toString().split(',');
    console.log(tokenId,bonus,"====================================================tokenIDbonus")
    return bonus;
    
    }

export async function l1withdraw(signer,address,amount,sign){
    const Claimcontract = await Claim(signer);
    const claim = await Claimcontract.claim(address,amount,sign.deadline,sign.nonce,sign.v,sign.r,sign.s)
    await claim.wait();
    return true;
}

//  export async function ClaimReward(signer,address,token,character) {
//  console.log(signer, "===========vaultStake");
//     const QuestContract = await Quest(signer);
//     //const questStakedtokens = await QuestContract.claimrewards(address,token,character,false)
//     const claim = await QuestContract.userClaimedRewards(address)
//     console.log(claim.toString(),"================claim")
//     return claim.toString();
   
// }

// //8687499999999999989436