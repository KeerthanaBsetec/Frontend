import axios from "axios";
import { l2api } from "../../config";

export function stake(address, tokenIds, characters, type) {
    return axios.post(`${l2api.stake}`, { address, tokenIds, characters, type})
        .then((stakeresponse) => {
            return stakeresponse.data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function Trainstake(address, tokenIds, characters) {
    return axios.post(`${l2api.Tstake}`, { address, tokenIds, characters})
        .then((tstakeresponse) => {
            return tstakeresponse.data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function unstake(address, tokenIds, characters, type){
    return axios.post(`${l2api.unstake}`, { address, tokenIds, characters, type})
     .then((unstakeresponse) => {
            return unstakeresponse.data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function Trainunstake(address, tokenIds, characters){
    return axios.post(`${l2api.Tunstake}`, { address, tokenIds, characters})
     .then((tunstakeresponse) => {
            return tunstakeresponse.data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}


export function getmintedtokens(address){
    return axios.get(`${l2api.mintedtokens}/${address}`)
    .then((stakedtokens) => {
            return stakedtokens.data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function gettokenUri(tokenId){
    return axios.get(`${l2api.tokenuri}/${tokenId}`)
    .then((tokenuriresponse) => {
            return tokenuriresponse.data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function signature(address,quantity,from){
    console.log(address,quantity,"======")
    return axios.post(`${l2api.signature}`, {address,quantity,from})
    .then((signatureresponse) => {
            return signatureresponse.data.message;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function claimrewards(address, tokenIds, characters){
    return axios.post(`${l2api.claim}`, { address, tokenIds, characters})
    .then((claimrewards) => {
            return claimrewards.data.message;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function unstakabletoken(address){
    return axios.get(`${l2api.unstaketoken}/${address}`)
    .then((unstakabletokens) => {
            return unstakabletokens.data.message;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

