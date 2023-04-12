import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import body from '../../../helpers/body';
import socket from '../../../helpers/socket';
import chess from '../../../helpers/chess';
import Auth from '../../../layouts/globals/Auth'

import * as moment from 'moment'

import UserContext from '../../../../context/user/userContext'
import storage from '../../../helpers/storage';

const Game = (props) => {

    const userContext = useContext(UserContext);

    const inputRef = useRef(null)
    const [message, setMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const pieces = {

        black: [
            {
                pos: 'A-8',
                icon: 'chessr-rook',
                points: 5,
                piece: 'rook'
            },
            {
                pos: 'B-8',
                icon: 'chessr-knight',
                points: 3,
                piece: 'knight'
            },
            {
                pos: 'C-8',
                icon: 'chessr-bishop',
                points: 3,
                piece: 'bishop'
            },
            {
                pos: 'D-8',
                icon: 'chessr-queen',
                points: 9,
                piece: 'queen'
            },
            {
                pos: 'E-8',
                icon: 'chessr-king',
                points: 10,
                piece: 'king'
            },
            {
                pos: 'F-8',
                icon: 'chessr-bishop',
                points: 3,
                piece: 'bishop'
            },
            {
                pos: 'G-8',
                icon: 'chessr-knight',
                points: 3,
                piece: 'knight'
            },
            {
                pos: 'H-8',
                icon: 'chessr-rook',
                points: 5,
                piece: 'rook'
            },
            {
                pos: 'A-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'B-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'C-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'D-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'E-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'F-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'G-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'H-7',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            
        ],

        light: [
            {
                pos: 'A-1',
                icon: 'chessr-rook',
                points: 5,
                piece: 'rook'
            },
            {
                pos: 'B-1',
                icon: 'chessr-knight',
                points: 3,
                piece: 'knight'
            },
            {
                pos: 'C-1',
                icon: 'chessr-bishop',
                points: 3,
                piece: 'bishop'
            },
            {
                pos: 'D-1',
                icon: 'chessr-queen',
                points: 9,
                piece: 'queen'
            },
            {
                pos: 'E-1',
                icon: 'chessr-king',
                points: 10,
                piece: 'king'
            },
            {
                pos: 'F-1',
                icon: 'chessr-bishop',
                points: 3,
                piece: 'bishop'
            },
            {
                pos: 'G-1',
                icon: 'chessr-knight',
                points: 3,
                piece: 'knight'
            },
            {
                pos: 'H-1',
                icon: 'chessr-rook',
                points: 5,
                piece: 'rook'
            },
            {
                pos: 'A-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'B-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'C-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'D-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'E-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'F-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'G-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            {
                pos: 'H-2',
                icon: 'chessr-pawn',
                points: 5,
                piece: 'pawn'
            },
            
        ]

    }

    const pieceNames = ['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'];

    useEffect(() => {

        body.changeBackground('chess-mint');

        displayPieces();

        // listen to message
        // socket.listen("receive-message", receiveMessage);
        socket.client.on("receive-message", async (data) => {
            receiveMessage(data);
        });

    }, [])

    const displayPieces = () => {

        const boxes = document.querySelectorAll('.piece-box')

        // empty all pieces by default
        boxes.forEach((box) => {

            let boxPiece = box.querySelector('.piece');

            for(let i = 0; i < pieceNames.length; i++){

                if(boxPiece.classList.contains(`chessr-${pieceNames[i]}`)){
                    boxPiece.classList.remove(`chessr-${pieceNames[i]}`)
                }

            }

        });

        // display black pieces
        pieces.black.forEach((piece) => {

            let box = document.getElementById(`${piece.pos}`);
            let boxPiece = box.querySelector('.piece');

            if(box && boxPiece){

                boxPiece.classList.add(`${piece.icon}`);
                boxPiece.dataset.piece = piece.piece;
                boxPiece.dataset.points = piece.points;

            }

        })

        // display light pieces
        pieces.light.forEach((piece) => {

            let box = document.getElementById(`${piece.pos}`);
            let boxPiece = box.querySelector('.piece');

            if(box && boxPiece){

                boxPiece.classList.add(`${piece.icon}`);
                boxPiece.dataset.piece = piece.piece;
                boxPiece.dataset.points = piece.points;

            }

        })
    }

    const sendMessage = async (e, t) => {

        if(e) { e.preventDefault() }

        if(message &&  message !== ''){

            const coll = userContext.players.filter((p) => p._id !== userContext.user._id);

            const data = {

                message: message,
                sender: userContext.user._id,
                receiver: coll[0]._id,
                messageType: t ? t : '',
                type: 'private',
                chatId: '',
                gameId: '',
                date: Date.now()
    
            }
    
            setMessages(old => [...old, data]);
            inputRef.current.value = ''
            setMsg('');

            // publish via socket
            socket.publish('send-message', data);

        }


    }

    const receiveMessage = (data) => {

        const user = userContext.players.find((p) => p._id === data.sender);
        const today = Date.now()

        const msg = {

            message: data.message,
            sender: data.sender,
            receiver: data.receiver,
            messageType: 'friend',
            type: 'private',
            chatId: '',
            gameId: '',
            date: today

        }

        setMessages(old => [...old, msg]);

    }

    return (
        <>

            <Auth />

            <section className='section heightv-full'>

                <div className='row no-gutters'>

                    <div className="col-md-9">

                        <div className='game-area heightv-full'>

                            {
                                userContext.loading &&
                                <>
                                    <div className="empty-box md" style={{ backgroundColor: '#' }}>

                                        <div className="ui-text-center">
                                            <div className="row">
                                                <div className="col-md-10 mx-auto">
                                                    <span className="chess-loader md white"></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            }

                            {
                                !userContext.loading &&
                                <>
                                    <div className='board-wrapper sm'>

                                        <div className='chess-board'>

                                        <div id="A-8" className='piece-box black A-8 label'><span data-piece="" data-points="" className='chessr-rook piece dark'></span></div>
                                        <div id="B-8" className='piece-box light B-8'><span data-piece="" data-points="" className='chessr-knight piece dark'></span></div>
                                        <div id="C-8" className='piece-box black C-8'><span data-piece="" data-points="" className='chessr-bishop piece dark'></span></div>
                                        <div id="D-8" className='piece-box light D-8'><span data-piece="" data-points="" className='chessr-queen piece dark'></span></div>
                                        <div id="E-8" className='piece-box black E-8'><span data-piece="" data-points="" className='chessr-king piece dark'></span></div>
                                        <div id="F-8" className='piece-box light F-8'><span data-piece="" data-points="" className='chessr-bishop piece dark'></span></div>
                                        <div id="G-8" className='piece-box black G-8'><span data-piece="" data-points="" className='chessr-knight piece dark'></span></div>
                                        <div id="H-8" className='piece-box light H-8'><span data-piece="" data-points="" className='chessr-rook piece dark'></span></div>

                                        <div id="A-7" className='piece-box light A-7 label'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>
                                        <div id="B-7" className='piece-box black B-7'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>
                                        <div id="C-7" className='piece-box light C-7'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>
                                        <div id="D-7" className='piece-box black D-7'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>
                                        <div id="E-7" className='piece-box light E-7'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>
                                        <div id="F-7" className='piece-box black F-7'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>
                                        <div id="G-7" className='piece-box light G-7'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>
                                        <div id="H-7" className='piece-box black H-7'><span data-piece="" data-points="" className='chessr-pawn piece dark'></span></div>

                                        <div id="A-6" className='piece-box black A-6 label'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="B-6" className='piece-box light B-6'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="C-6" className='piece-box black C-6'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="D-6" className='piece-box light D-6'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="E-6" className='piece-box black E-6'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="F-6" className='piece-box light F-6'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="G-6" className='piece-box black G-6'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="H-6" className='piece-box light H-6'><span data-piece="" data-points="" className='piece'></span></div>

                                        <div id="A-5" className='piece-box light A-5 label'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="B-5" className='piece-box black B-5'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="C-5" className='piece-box light C-5'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="D-5" className='piece-box black D-5'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="E-5" className='piece-box light E-5'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="F-5" className='piece-box black F-5'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="G-5" className='piece-box light G-5'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="H-5" className='piece-box black H-5'><span data-piece="" data-points="" className='piece'></span></div>

                                        <div id="A-4" className='piece-box black A-4 label'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="B-4" className='piece-box light B-4'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="C-4" className='piece-box black C-4'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="D-4" className='piece-box light D-4'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="E-4" className='piece-box black E-4'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="F-4" className='piece-box light F-4'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="G-4" className='piece-box black G-4'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="H-4" className='piece-box light H-4'><span data-piece="" data-points="" className='piece'></span></div>

                                        <div id="A-3" className='piece-box light A-3 label'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="B-3" className='piece-box black B-3'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="C-3" className='piece-box light C-3'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="D-3" className='piece-box black D-3'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="E-3" className='piece-box light E-3'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="F-3" className='piece-box black F-3'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="G-3" className='piece-box light G-3'><span data-piece="" data-points="" className='piece'></span></div>
                                        <div id="H-3" className='piece-box black H-3'><span data-piece="" data-points="" className='piece'></span></div>

                                        <div id="A-2" className='piece-box black A-2 label'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>
                                        <div id="B-2" className='piece-box light B-2'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>
                                        <div id="C-2" className='piece-box black C-2'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>
                                        <div id="D-2" className='piece-box light D-2'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>
                                        <div id="E-2" className='piece-box black E-2'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>
                                        <div id="F-2" className='piece-box light F-2'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>
                                        <div id="G-2" className='piece-box black G-2'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>
                                        <div id="H-2" className='piece-box light H-2'><span data-piece="" data-points="" className='chessr-pawn piece light'></span></div>

                                        <div id="A-1" className='piece-box light A-1 label label-bottom'><span data-piece="" data-points="" className='chessr-rook piece light'></span></div>
                                        <div id="B-1" className='piece-box black B-1 label-bottom'><span data-piece="" data-points="" className='chessr-knight piece light'></span></div>
                                        <div id="C-1" className='piece-box light C-1 label-bottom'><span data-piece="" data-points="" className='chessr-bishop piece light'></span></div>
                                        <div id="D-1" className='piece-box black D-1 label-bottom'><span data-piece="" data-points="" className='chessr-queen piece light'></span></div>
                                        <div id="E-1" className='piece-box light E-1 label-bottom'><span data-piece="" data-points="" className='chessr-king piece light'></span></div>
                                        <div id="F-1" className='piece-box black F-1 label-bottom'><span data-piece="" data-points="" className='chessr-bishop piece light'></span></div>
                                        <div id="G-1" className='piece-box light G-1 label-bottom'><span data-piece="" data-points="" className='chessr-knight piece light'></span></div>
                                        <div id="H-1" className='piece-box black H-1 label-bottom'><span data-piece="" data-points="" className='chessr-rook piece light'></span></div>

                                        

                                        </div> 

                                    </div>

                                    <div className='game-info sm ui-relative'>

                                        <div className='player-a ui-absolute'>

                                            <div className='player-info ui-line-height-small'>
                                                <img src="../../../images/assets/user-avatar.svg" alt="dp"/>
                                                <div className='pdl1'>
                                                    <h3 className='fs-13 font-mattersemibold mrgb0'>Player A</h3>
                                                    <p className='fs-13 font-matterregular mrgb0 points'>1000 pts</p>
                                                </div>
                                                <div className='ml-auto status left'></div>
                                            </div>

                                            <div className='captured-box top'>
                                                <span className='chessr-pawn piece'></span>
                                                <span className='chessr-king piece'></span>
                                            </div>

                                        </div>

                                        <div className='player-b ui-absolute'>

                                            <div className='captured-box bottom'>
                                                <span className='chessr-pawn piece'></span>
                                                <span className='chessr-king piece'></span>
                                            </div>

                                            <div className='player-info ui-line-height-small'>
                                                <img src="../../../images/assets/user-avatar.svg" alt="dp"/>
                                                <div className='pdl1'>
                                                    <h3 className='fs-13 font-mattersemibold mrgb0'>Player B</h3>
                                                    <p className='fs-13 font-matterregular mrgb0 points'>2000 pts</p>
                                                </div>
                                                <div className='ml-auto status connected'></div>
                                            </div>

                                        </div>

                                    </div>
                                </>
                            }

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className='chat-area heightv-full'>

                            <div className='chat-head'>
                                <img src="../../../images/assets/biz-avatar.svg" alt="room-logo" />
                                <div className='pdl1 ui-line-height-small'>
                                    <p className='mrgb0 fs-14 font-mattermedium onwhite'>The Room SE</p>
                                    <span className='mrgb0 fs-12 font-matterregular' style={{color: "#7176a8" }}>144 members</span>
                                </div>
                                <div className='ml-auto'>
                                    <Link to="" className='btn mini leave-btn font-matterregular fs-13'>Leave</Link>
                                </div>
                            </div>
                            <div className='chat-body'>

                                {
                                    messages.length > 0 && 
                                    messages.map((m, i) => 
                                    
                                        <>
                                        
                                            {
                                                m.messageType === 'friend' &&
                                                <div key={i} className='message friend'>
                                                    <div className='body ui-line-height-small'>
                                                        <div className='d-flex align-items-center mrgb'>
                                                            <h4 className='mrgb0 fs-12 font-mattermedium pdr'>{ m.sender }</h4>
                                                            <span className='mrgb0 fs-11 font-matterregular' style={{ color: "#afb1c1" }}>{ moment(m.date).format("HH:mm") }</span>
                                                        </div>
                                                        <p className='mrgb0 fs-12 font-matterregular' style={{color: "#fff" }}>{m.message}</p>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                m.messageType === 'user' &&
                                                <div key={i} className='message user'>
                                                    <div className='body ui-line-height-small'>
                                                        <div className='d-flex align-items-center mrgb'>
                                                            <span className='mrgb0 fs-11 font-matterregular' style={{ color: "#afb1c1" }}>{ moment(m.date).format("HH:mm") }</span>
                                                        </div>
                                                        <p className='mrgb0 fs-12 font-matterregular' style={{color: "#fff" }}>{m.message}</p>
                                                    </div>
                                                </div>
                                            }
                                        
                                        </>
                                    
                                    )
                                }

                                

                            </div>
                            <div className='chat-foot'>
                                <form onSubmit={(e) => { e.preventDefault() }}>

                                    <div className='d-flex align-items-center'>
                                        <input ref={inputRef} onChange={(e) => setMsg(e.target.value)} type={'text'} placeholder="Type here" className='message-input fs-13 font-matterregular' />
                                        <Link onClick={(e) => sendMessage(e, 'user')} to="" className='btn mini send-btn font-matterregular fs-13 ml-auto'>Send</Link>
                                    </div>

                                </form>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            
            
            
        </>
    )

}

export default Game;