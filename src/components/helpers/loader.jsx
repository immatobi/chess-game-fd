import React from 'react';

const MainLoader = () => {

    return (
        <div>
            <div className="suspense bg-brand">

                <div className="suspense_image ui-text-center">
                    <span className='xp-loader white md'></span>
                </div>

            </div>
        </div>
    )

}

const popNetwork = () => {
    window.location.href = '/no-network'
}

const pop = { MainLoader, popNetwork }

export default pop;