require('dotenv').config();
import axios from "axios";

const API_URL = process.env.API_URL;

// get new release list
async function getNewReleases() {
    const response = await axios(API_URL+'/api/new-release-chart')
    return response.data;
}


async function getHome() {
    const res = await axios.get(API_URL+'/api/home')
      return res.data

}

async function searchAPI(query:string) {
    const res = await axios.get(API_URL+`api/search/${query}`)
      return res.data
}

async function getTop100() {
    const res = await axios.get(API_URL+'/api/top100')
      return res.data
}

export {
    getNewReleases,
    getHome,
    searchAPI,
    getTop100
}