import React from 'react';

const Placeholder = ({ height, width, bgColor, radius, className }) => {

    return (
        <>
            <span 
                className={`place-box ${className ? className : ''}`} 
                style={{ 
                    width: `${width ? width : ''}`, 
                    height: `${height ? height: ''}`, 
                    backgroundColor: `${bgColor ? bgColor : ''}`,
                    borderRadius: `${radius ? radius : '2px'}`
                }}>

            </span>
        </>
    )

}

export default Placeholder;