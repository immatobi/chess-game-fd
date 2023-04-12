import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import storage from '../../helpers/storage'
import body from '../../helpers/body'

import UserContext from '../../../context/user/userContext';
import { useNetworkDetect } from '../../helpers/hooks'
import socket from '../../helpers/socket'

const Auth = (props) => {

    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    useEffect(() => {

        redirectToLogin();
        loadDefaults();

    }, [])

    const loadDefaults = async () => {

        socket.connect();
        socket.publish("user-connected", storage.getUserID());
        

        if(body.isObjectEmpty(userContext.user) === true){
            await userContext.getUser();
        }

        if(body.isArrayEmpty(userContext.players) === true){
            await userContext.getPlayers();
        }

    }

    useNetworkDetect()

    const config = {
        headers: {
            ContentType: 'application/json',
            lg: "en",
            ch: "web"
        }
            
    }

    const redirectToLogin = () => {

        if(!storage.checkToken() && !storage.checkUserID()){
            logout()
        }
    }

    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        navigate('/login');
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`,{}, config);
    }

    return (

        <>
        
        </>

    )

}

export default Auth;