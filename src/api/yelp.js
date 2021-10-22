import axios from "axios";

const API_KEY = "";

const instance = axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
});

export default instance;