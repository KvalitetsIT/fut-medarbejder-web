import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import getEnvironment from "../config/env";

//const baseurl = getEnvironment().REACT_APP_API_BASEURL;
const baseurl = getEnvironment().REACT_APP_API_BASEURL || "http://localhost:8080/v1/"

export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",
        baseUrl: baseurl,
        prepareHeaders: (headers, api) => {
            headers.set("Content-Type", "application/json")
            return headers;
        }
    })
}



