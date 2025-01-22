import axios from "axios";
import {Credentials} from "@/Context/UserContext";
import Cookies from "js-cookie";

const API_LOGIN = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
const API_LOGIN_OUT = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
const API_REFRESH= `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`;
const storedToken = Cookies.get('refreshToken')
export const userLogin = async (loginData:Credentials)=>{
   try {
       const response = await axios.post(API_LOGIN, loginData,{    headers: { 'Content-Type': 'application/json' }})
       return await response.data
   }catch (error) {
       if(error instanceof Error) {
           return  error;
       }
   }
}
export const userLogout = async ()=>{
   try {
            const token = await  refreshToken(storedToken? storedToken: '')
            const response = await axios.post(`${API_LOGIN_OUT}?refreshToken=${token.data.accessToken}`)
            return await response.data
   }catch (error) {
       if(error instanceof Error) {
           return  error;
       }
   }
}

export const refreshToken = async (refreshToken:string)=>{
    try {
        const response = await axios.post(`${API_REFRESH}?refreshToken=${refreshToken}`)
        return response.data.accessToken
    }catch (error) {
        return error;
    }
}