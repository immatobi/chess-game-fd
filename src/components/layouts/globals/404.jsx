import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SEO from '../layouts/partials/SEO'

const NotFound = () => {

    const history = useHistory();

    const goBack = () => {
        history.goBack()
    };

    return (
        <>

            <SEO pageTitle="Xpresschain - Not Found" />

            <div className="not-found bg-brandxp-dark">

               <div className="container ui-text-center">

                    <div className='font-matterbold onwhite not-found-text' style={{position: 'relative', left: '-0.55rem'}}>404</div>
                    <h3 className="mrgt2 font-mattersemibold fs-30 onwhite mrgb1">Page Not Found!</h3>
                    <Link onClick={goBack} className="btn md ghost cc-red onwhite font-matterbold fs-15">Go Back</Link>

               </div>

            </div>

        </>
    )
}

export default NotFound;