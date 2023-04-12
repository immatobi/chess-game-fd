import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../layouts/partials/SEO'

const ErrorUI = ({ error, resetErrorBoundary }) => {
    
    const goBack = (e) => {
        
        if(e) e.preventDefault();
        resetErrorBoundary() 
    };

    return (
        <>

            <SEO pageTitle="Xpresschain - Error" />

            <div className="not-found bg-brandxp-dark">

                <div className="container ui-text-center">

                    <img src="../../../images/icons/error.svg" width="180px" alt="not-found" />
                    <h3 className="mrgt1 font-mattermedium fs-27 onwhite mrgb">Oops! There was an error.</h3>
                    <p className="font-matterlight fs-14 onwhite mrgb2">We're sorry. Please go back and refresh the page.</p>
                    <Link onClick={(e) => goBack(e)} className="btn md ghost cc-red onwhite font-matterbold fs-15">Go Back </Link>

                        
                </div>

            </div>

        </>
    )
}

export default ErrorUI;