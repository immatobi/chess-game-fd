import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import storage from '../../components/helpers/storage'
import loader from '../../components/helpers/loader'

import UserContext from './userContext';
import UserReducer from './userReducer';


import {
    GET_LOGGEDIN_USER,
    GET_USER,
    GET_PLAYERS,
    GET_PLAYER,
    GET_ROOM,
    GET_ROOMS,
    GET_GAMES,
    GET_GAME,
    GET_MANAGER,
    SET_LOADING,
} from '../types'

const UserState = (props) => {

    const history = useNavigate();
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        user: {},
        players: [],
        player: {},
        games: [],
        game: {},
        manager: {},
        rooms: [],
        room: {},
        loading: false,
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const logout = async (e) => {
        if(e) e.preventDefault();
        storage.clearAuth();
        history.push('/');
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`,{}, storage.getConfig());
    }

    const getUser = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_API_URL}/auth/user/${storage.getUserID()}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_LOGGEDIN_USER,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get loggedin user ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get loggedin user ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get loggedin user ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get loggedin user ${err}`)
    
                }
                
            }

        

    }

    const getPlayers = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_API_URL}/users/players`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_PLAYERS,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get all players ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get all players ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get all players ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get all players ${err}`)
    
                }
                
            }

        

    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    const setPlayers = (data) => {
        dispatch({
            type: GET_PLAYERS,
            payload: data
        })
    }

    return <UserContext.Provider
        value={{
            user: state.user,
            players: state.players,
            player: state.player,
            games: state.games,
            game: state.game,
            rooms: state.rooms,
            room: state.room,
            manager: state.manager,
            loading: state.loading,
            getUser,
            getPlayers,
            setPlayers
        }}
    >
        {props.children}

    </UserContext.Provider>

    

}

export default UserState;