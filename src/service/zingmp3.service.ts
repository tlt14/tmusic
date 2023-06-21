import axios from "axios";
import { API_URL } from "../config";


// get new release list
async function getNewReleases() {
    const response = await axios(API_URL+'api/newreleasechart')
    return response.data;
}


async function getHome() {
    const res = await axios.get(API_URL+'api/home')
    return res.data

}

async function searchAPI(query:string) {
    const res = await axios.get(API_URL+`api/search?keyword=${query}`)
      return res.data
}

async function getTop100() {
    const res = await axios.get(API_URL+'api/top100')
    return res.data
}
async function getSong(id:string) {
    const res = await axios.get(
        `${'https://zingmp3-api.onrender.com/'}api/song?id=${id}`
      );
    return res.data
}
async function getAlbum(id:string) {
    const res = await axios.get(
        `${API_URL}api/detailplaylist?id=${id}`
    )
    return res.data
}

export {
    getNewReleases,
    getHome,
    searchAPI,
    getTop100,
    getSong,
    getAlbum
}