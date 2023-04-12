import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import Axios from 'axios'

import * as moment from 'moment'

const ErrorModal = ({isShow, closeModal, modalTitle, flattened, stretch, slim, message}) => {

    const history = useHistory();
    const params = useParams();


    const [loading, setLoading] = useState();


    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    })

    const [step, setStep] = useState(0)
   
    useEffect(() => {

        setStep(0);
        // unitContext.getUnit(storage.getUserID(), 9999);
        // no update

    }, []);

    
    const capital = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    // functions
    const closeX = (e) => {
        if(e) e.preventDefault();
        closeModal();
    }


    return (

        <>

            <Modal show={isShow} 
                onHide={closeX} 
                size="sm"
                fade={false}
                keyboard={false}
                aria-labelledby="medium-modal"
                centered
                className={`custom-modal ${slim ? slim : ''} ${stretch ? 'stretched' : ''} ${flattened ? 'flat' : ''} lg`}
            >

                <Modal.Body>

                     <div className="d-flex">

                        <div className="dm--dbx ui-full-bg-norm" style={{backgroundImage: `url("${process.env.REACT_APP_STORAGE_URL}/img@add-m")`}}>
                            <div className="dm--d">
                                <div>
                                    {/* <img src="../../../images/assets/i" alt="icon" /> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="dm--body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/foopat.svg")'}}> */}
                        <div className="dm--body">

                        <div className="d-flex align-items-center mrgb1">
                                <h2 className="brand-green mrgb0 font-metrobold fs-18">
                                    Error
                                </h2>
                                <div className="ml-auto ui-hide">
                                    <Link onClick={(e) => closeX(e)}  className="dot-link md ui-icon-animate">
                                        <span className="fe fe-x fs-12"></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="dm--ct">

                            
                                <div className="net-box">

                                    <img width="70px" src="../../../images/icons/derror.svg" alt="no-wifi" />
                                    <p className="mrgb0 font-metrobold fs-15 onaliz mt-3">An error occured!</p>
                                    <p className="mrgb0 font-metrolight fs-13 brand-greeny">{ message ? message : 'There was an error, please try again.' }</p>

                                </div>
                                

                            </div>  


                        </div>
                    </div> 
                     
                </Modal.Body>

            </Modal>
        
        
        </>

    )

}

export default ErrorModal;