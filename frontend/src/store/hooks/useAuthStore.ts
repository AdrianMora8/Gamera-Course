import { useCallback } from "react";
import appApi from "../../api/appApi";
import type { Credentials, registerCredentials } from "../interfaces/authInterface";
import { onLogin, onLogout } from "../slices/authSlice";
import { useAppDispatch, useAppSelector } from "./useStore"

export const useAuthStore = () => {

    const {status,user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const startLogin = async({email, password}: Credentials ) => {
        const {data: {content: user}} = await appApi.post('/auth/login',{
            email,
            password
        });
        
        localStorage.setItem('token', user.token);
        
        dispatch(onLogin({
            id: user.id,
            completeName: user.completeName,
            email: user.email
        }));
    }

    const startRegister = async({name, lastName, email, password}: registerCredentials) => {
        const {data: {content: userRegister}} = await appApi.post('/auth/register',{
            name,
            lastName,
            email,
            password
        });
        
        localStorage.setItem('token', userRegister.token);
        
        dispatch(onLogin({
            name: userRegister.name,
            lastName: userRegister.lastName,
            email: userRegister.email
        }));
    }

    const checkAuthToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            dispatch(onLogout());
            return;
        }

        try {
            const {data: {content: user}} = await appApi.get('/auth/renewToken', {
                headers: {
                    'gamera-token': token
                }
            });
            
            localStorage.setItem('token', user.token);
            
            dispatch(onLogin({
                id: user.id,
                completeName: user.completeName,
                email: user.email
            }));
        } catch (error) {
            localStorage.removeItem('token');
            dispatch(onLogout());
        }
    }, [dispatch]);

    const startLogout = () => {
        localStorage.removeItem('token');
        dispatch(onLogout());
    }

        return {
            //attributes
            status,
            user,
            //methods
            startLogin,
            startRegister,
            checkAuthToken,
            startLogout 
        }
}
