import { ethers } from 'ethers';
import config from "../config.js";
import { Gen0abi, Gen1abi, Questabi, Nftabi, HonorQuest, vault, Honrabi, Trainabi, Claimabi } from "../lib/abi";

export function Gen0(signer) {
    return new ethers.Contract(config.Gen0, Gen0abi, signer);
}

export function Honr(signer) {
    return new ethers.Contract(config.Honr, Honrabi, signer);
}

export function Gen1(signer) {
    return new ethers.Contract(config.Gen1, Gen1abi, signer);
}

export function L1Nft(signer) {
     console.log(signer, "=========signer")
    return new ethers.Contract(config.L1NFT, HonorQuest, signer);
}

export function Claim(signer) {
    return new ethers.Contract(config.L1Claim, Claimabi, signer)
}

export function L2Nft(signer) {
    return new ethers.Contract(config.L2NFT, Nftabi, signer);
}

export function Quest(signer) {
    return new ethers.Contract(config.Quest, Questabi, signer);
}

export function Train(signer) {
    return new ethers.Contract(config.Training, Trainabi, signer);
}

export function Vault(signer) {
    return new ethers.Contract(config.vault, vault, signer);
}
