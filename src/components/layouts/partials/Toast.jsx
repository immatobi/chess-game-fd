import React from 'react';
import { Link } from 'react-router-dom';

const Toast = ({ show, close, title, message, type, position }) => {

    const closeX = (e) => {
        if(e) e.preventDefault();
        close(e);
    }

    const setBg = (type) => {

        let result = '#3eb249' 
        if(type === 'success'){
            result = '#3eb249'
        }

        if(type === 'error'){
            result = '#e74c3c'
        }

        if(type === 'info'){
            result = '#00BDE7'
        }

        if(type === 'warning'){
            result = '#FFB31F'
        }

        return result;

    }

    return (
        <>
           <div className={`toast-inner ${ show && show === true ? '' : 'ui-hide' } ${ position ? position : 'top-right'}`}
            style={{ backgroundColor: `${setBg(type)}` }}>

                <div className="d-flex align-items-center">
                    <h3 className="font-metrobold fs-14 mrgb0 onwhite"> { title ? title : 'No Title'} </h3>
                    <Link to="" className="ml-auto" onClick={(e) => closeX(e)}><span className="fe fe-x fs-15 onwhite"></span></Link>
                </div>

                <p className="font-metrolight fs-13 onwhite mrgb0">
                    {message ? message : 'No message'}
                </p>

           </div>
        </>
    )

}

export default Toast;