import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import UserContext from '../../context/user/userContext'
import body from '../helpers/body';

import Auth from '../layouts/globals/Auth'

const Home = (props) => {

    const userContext = useContext(UserContext)

    useEffect(() => {

        body.changeBackground('chess-mint');

    }, [])

    return (
        <>
            <Auth />
            <Link to="/dashboard/rooms/game" className='btn smd bg-brandxp-purple onwhite'>Go To Game</Link>
            
        </>
    )

}

export default Home;