import axios from "axios";
import { activityapi } from "../config";

export function getviewdetails(id){
    return axios.get(`${activityapi.viewdetails}/${id}`)
    .then((mintedresponse) => {
            return mintedresponse.data.Data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}

export function getalldetails(address){
    return axios.get(`${activityapi.alldetails}/${address}`)
    .then((allresponse) => {
            return allresponse.data.Data;
        }).catch((error) => {
            console.log(error.response);
            throw error;
        });
}