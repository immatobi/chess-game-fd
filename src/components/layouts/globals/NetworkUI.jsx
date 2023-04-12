import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SEO from '../layouts/partials/SEO'

const NetworkUI = () => {

    const history = useHistory()

    const goBack = (e) => {
        
        if(e) e.preventDefault();
        history.goBack();

    };

    return (
        <>

            <SEO pageTitle="Xpresschain - Network Error" />

            <div className="not-found bg-brandxp-dark">

               <div className="container ui-text-center">

                <img src="../../../images/icons/wifi.svg" width="140px" alt="wifi" />
                <h3 className="mrgt1 font-metromedium fs-27 onwhite mrgb">Oops! Network error.</h3>
                <p className="font-matterlight fs-14 onwhite mrgb2">There's an error network is unstable. Please refresh</p>
                <Link onClick={(e) => goBack(e)} className="btn md ghost cc-red onwhite font-matterbold fs-15">Go Back</Link>

               </div>

            </div>

        </>
    )
}

export default NetworkUI;