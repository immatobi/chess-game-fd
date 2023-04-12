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
} from '../types';


const reducer = (state, action) => {

    switch(action.type){

        case GET_LOGGEDIN_USER: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case GET_USER: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case GET_PLAYERS: 
            return {
                ...state,
                players: action.payload,
                loading: false
            }
        case GET_PLAYER: 
            return {
                ...state,
                player: action.payload,
                loading: false
            }
        case GET_GAMES: 
            return {
                ...state,
                games: action.payload,
                loading: false
            }
        case GET_GAME: 
            return {
                ...state,
                game: action.payload,
                loading: false
            }
        case GET_ROOMS: 
            return {
                ...state,
                rooms: action.payload,
                loading: false
            }
        case GET_ROOM: 
            return {
                ...state,
                room: action.payload,
                loading: false
            }
        case GET_MANAGER: 
            return {
                ...state,
                manager: action.payload,
                loading: false
            }  
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
            
        default: 
            return state;
    }

}

export default reducer;