import {createSlice} from "@reduxjs/toolkit";
import {login, register, logout, refreshUser} from "./authOperations.js"

const initialState = {
    user:{name:null,email:null, userId:null},
    token:null,
    isLoggedIn:false,
    isRefreshing:false
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder =>
    builder.addCase(register.pending, (state) => state)
    .addCase(register.rejected, (state) => state)
        .addCase(register.fulfilled, (state,{payload}) => {
            state.user.name = payload.userName;
            state.user.userId = payload.userId;
            state.user.email = payload.response.email;
            state.token = payload.response.token;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        })
        .addCase(login.pending, (state) => state)
        .addCase(login.rejected, (state) => state)
        .addCase(login.fulfilled, (state, {payload}) => {
            state.user.name = payload.userName;
            state.user.email = payload.email;
            state.user.userId = payload.userId;
            state.token = payload.token;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        })
        .addCase(logout.pending, (state) => state)
        .addCase(logout.rejected, () => initialState)
        .addCase(logout.fulfilled, () => initialState)
        .addCase(refreshUser.pending, (state) => ({
            ...state, isRefreshing: true
        }))
        .addCase(refreshUser.rejected, () => initialState)
        .addCase(refreshUser.fulfilled, (state, {payload}) => {
            state.user.name = payload.username;
            state.user.email = payload.email;
            state.user.userId = payload.userId;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        })
})