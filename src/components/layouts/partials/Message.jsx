import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import lottieSuccess from '../../_data/check-greeny.json'
import lottieError from '../../_data/check-error.json'

import LottiePlayer from './LottiePlayer'

const Message = ({ title, message, action, status, lottieSize, loop, actionType, buttonText, setBg }) => {

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    const fireAction = (e) => {

        if(e) e.preventDefault();

        if(actionType === 'close'){
            action(e);
        }else{

            if(typeof(action) === 'string' && action){
                navigate(action);
            }else{
                action(e)
            }

        }

        

    }

    return (
        <>

            <div style={ {  backgroundColor: setBg ? '#f3f0ff' : 'transparent', padding: setBg ? '1.5rem 2.5rem' : '', borderRadius: setBg ? '1.5rem' : '' } }>
                <div className="mrgt2">
                    <LottiePlayer 
                    lottieData={status && status === 'success' ? lottieSuccess : lottieError} 
                    h={lottieSize ? lottieSize : 130} w={lottieSize ? lottieSize : 130} 
                    loop={loop ? loop : false} />
                </div>

                <div className="ui-text-center mrgt1 mrgb2 ">
                    <h1 className="onwhite fs-20 font-mattersemibold mrgb">{ title ? title : 'No Title' }</h1>
                    <p className="onwhite fs-15 font-matterregular mrgb2 pdr3 pdl3 ui-line-height">{ message ? message : 'No Message' }</p>

                    <Link onClick={(e) => fireAction(e)} to="/" className="btn btn-md lg bg-brandxp-orange font-matterbold onwhite"> { buttonText ? buttonText : 'Close' } </Link>
                </div>
            </div>
        </>
    )

}

export default Message;