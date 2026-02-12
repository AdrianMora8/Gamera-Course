import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Status, User, UserRegister } from "../interfaces/authInterface";

interface InitialState {
    status: Status;
    user: User | UserRegister |null;
}

const initialState: InitialState = {
    status: "checking",
    user: null,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onCheking: (state)=>{
            state.status = 'checking';
            state.user = null;
        },
        onLogin: (state, {payload}: PayloadAction<User | UserRegister>)=>{ 
            state.status = 'authenticated';
            state.user = payload;
        },
        onLogout: (state)=>{
            state.status = 'unauthenticated';
            state.user = null;
            localStorage.removeItem('token');
        }
    }
})

export const {
    onCheking,
    onLogin,
    onLogout
} = authSlice.actions;

export default authSlice.reducer;