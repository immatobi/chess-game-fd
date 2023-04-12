import { io } from 'socket.io-client'

const socket = {};

socket.client = io(`${process.env.REACT_APP_SOCKET_URL}`, { transports: ['websocket'] });

socket.connect = () => {

    socket.client.on("connect", () => {
        
    })

}

socket.publish = (key, data) => {

    if(key && data){
        socket.client.emit(key, data);
    }

}

socket.listen = (key, callback) => {

    if(key && callback){

        socket.client.on(key, async (data) => {
            await callback(data);
        })

    }

}

export default socket;