import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:7271"
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}` ;
}
const clearAuthHeader = () => {
    axios.defaults.headers.common = "" ;
}
export const register = createAsyncThunk(
    "auth/register", async (credentials,thunkAPI) => {
        try {
            const {data} = await axios.post("/users/create-user", credentials);
            setAuthHeader(data.token);
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const login = createAsyncThunk(
    "auth/login", async (credentials,thunkAPI) => {
        try {
            const {data} = await axios.post("/users/login", credentials);
            setAuthHeader(data.token);
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const logout = createAsyncThunk(
    "auth/logout", async (_,thunkAPI) => {
        try {
            await axios.post("/users/logout");
            clearAuthHeader();
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const refreshUser = createAsyncThunk(
    "auth/refreshUser", async (_,thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;
        console.log(persistedToken);
        if (!persistedToken) {
            return thunkAPI.rejectWithValue("No token provided");
        }
        try{
            setAuthHeader(persistedToken);
            const {data} = await axios.get("/users/get-user");
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)