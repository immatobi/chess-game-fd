import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import {Modal} from 'react-bootstrap';

import LottiePlayer from '../../layouts/partials/LottiePlayer';
import lottieError from '../../_data/check-error.json'
import lottieSuccess from '../../_data/check-green.json'


const AlertModal = ({ isShow, closeModal, type, data }) => {


    const submit = (e) => {
        e.preventDefault();
        closeModal();
    }


    return (
        <>

            <Modal show={isShow} 
                    onHide={closeModal} 
                    size="sm"
                    fade={false}
                    keyboard={false}
                    aria-labelledby="medium-modal"
                    centered
                    className="md--modal"
                >

                <Modal.Body>

                    <div className="d-flex">

                        <div className="dm--dbx ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/bg@sdot2.svg")'}}>
                            <div className="dm--d">
                                <div>
                                    <img src="../../../images/assets/icon@admodal.svg" alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="dm--body">

                            <div className="d-flex align-items-center mrgb1">
                                {/* <h2 className="font-gilroymedium brandcox-firefly fs-18">
                                    Add Food Item
                                </h2> */}
                                <div className="ml-auto">
                                    <Link onClick={closeModal} className="dot-close">
                                        <span className="fe fe-x brandcox-fireflydark fs-8"></span>
                                    </Link>
                                </div>
                            </div> 

                            <div className="dm--ct">

                                <div className="ui-text-center mrgb2 mrgt2">
                                    <LottiePlayer lottieData={type === "success" ? lottieSuccess : lottieError } w='130px' h='130px' loop={true} />
                                </div>
                                <div className="mrgb2 pdl3 pdr3">
                                    <h3 className="title fs-20 ui-text-center">{data.title ? data.title : 'No Title'}</h3>
                                    <p className="onmineshaft fs-14 ui-text-center mrgb1">{data.message ? data.message : 'No Message'}</p>
                                </div>

                                <div className="ui-text-center">
                                    <Link style={{minWidth: '200px'}} onClick={(e) => submit(e)} className="btn btn-lgr onwhite bg-brand-orange fs-16 mb-3">{data.buttonText ? data.buttonText : 'No Text'}</Link>
                                </div>
                                
                            </div>                                  
                        </div>
                    </div>
                    
                </Modal.Body>

            </Modal>
        

        </>

    )

}

export default AlertModal;