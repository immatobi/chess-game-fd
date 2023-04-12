import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'

import storage from '../../helpers/storage'
import body from '../../helpers/body'

import UserContext from '../../../context/user/userContext';

import { useNetworkDetect } from '../../helpers/hooks'

const SideBar = ({ collapsed, barCollapsed }) => {

    const navigate = useNavigate();

    const userContext = useContext(UserContext);

    const [active, setActive] = useState('dashboard');

    useEffect(() => {

        redirectToLogin();
        setActive(storage.fetch('menu') ? storage.fetch('menu') : 'home');
        loadDefaults();

    }, [])

    const loadDefaults = async () => {

        if(body.isObjectEmpty(userContext.user) === true){
            userContext.getUser();
        }
    }

    useNetworkDetect()

    const config = {
        headers: {
            ContentType: 'application/json',
            lg: "en",
            ch: "web"
        }
            
    }

    const redirectToLogin = () => {

        if(!storage.checkToken() && !storage.checkUserID()){
            logout()
        }
    }

    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        navigate('/');
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`,{}, config);
    }

    const goto = (e, url, t) => {

        if(e) { e.preventDefault() }
        storage.keep('menu', t);
        setActive(t);
        navigate(url);
  
    }

    return (

        <>
        
        {/* <Link onClick={initializeModal} ref={startRef} className='ui-hide'></Link> */}

          <div className='ui-monitor'>
            <div className='d-flex'>
              <div />
              <div className='ml-auto'>
                <Link to='/' className='pullin--btn onblack'>
                  <span
                    className='fe fe-arrow-left fs-20'
                    style={{ color: '#2F80ED' }}
                  />
                </Link>
              </div>
            </div>
          </div>

          <section id="ui-sidebar" className={`ui-sidebar ${ collapsed && collapsed === true ? 'sdbr--cllps' : 'sdbr--open' }`}>

            <div id="ui-sidebar-primary" className={`ui-sidebar-primary ${ collapsed && collapsed === true ? 'sdbr--cllps' : 'sdbr--open' }`}>

                <div id="ui-sidebar-primary-header" className="ui-sidebar-primary-header">

                    <Link to="/dashboard"><img className="logo" src="../../../images/assets/logo-white.png" alt="" /></Link>

                </div>

                <div className='ui-sidebar-primary-body'>

                    <div className="ui-separate-small ui-show-mobile-only"></div>

                    <ul id="ui-sidebar-primary-links" className={`ui-sidebar-primary-links primary-nav`}>

                        <li className={ `${active === 'home' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard', 'home')} to='' className='ui-icon-animate link' title='Home'>
                                <span style={{position: 'relative', left: '0', top: '1px', color: '#fff'}} className='xp-board xp-webicon'>
                                    <i className='path1 fs-20'></i>
                                    <i className='path2 fs-20'></i>
                                </span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Home
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'wallet' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/wallet', 'wallet')} to='' className='ui-icon-animate link' title='Home'>
                                <span style={{position: 'relative', left: '0', top: '1px', color: '#fff'}} className='xp-wallet xp-webicon'>
                                    <i className='path1 fs-20'></i>
                                    <i className='path2 fs-20'></i>
                                </span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Wallet
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'txn' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/transactions', 'txn')} to='' className='ui-icon-animate link' title='Home'>
                                <span style={{position: 'relative', left: '0', top: '1px', color: '#fff'}} className='xp-card xp-webicon reverse'>
                                    <i className='path1 fs-20'></i>
                                    <i className='path2 fs-20'></i>
                                </span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Transactions
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'exchange' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/exchange', 'exchange')} to='' className='ui-icon-animate link' title='Home'>
                                <span style={{position: 'relative', left: '0', top: '1px', color: '#fff'}} className='xp-anchor xp-webicon reverse'>
                                    <i className='path1 fs-20'></i>
                                    <i className='path2 fs-20'></i>
                                </span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Exchange
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'security' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/security', 'security')} to='' className='ui-icon-animate link' title='Home'>
                                <span style={{position: 'relative', left: '0', top: '1px', color: '#fff'}} className='xp-security xp-webicon reverse'>
                                    <i className='path1 fs-23'></i>
                                    <i className='path2 fs-23'></i>
                                </span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Security
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'settings' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/settings/verification', 'settings')} to='' className='ui-icon-animate link' title='Home'>
                                <span style={{position: 'relative', left: '0', top: '1px', color: '#fff'}} className='xp-settings xp-webicon reverse'>
                                    <i className='path1 fs-23'></i>
                                    <i className='path2 fs-23'></i>
                                </span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Settings
                                </span>
                            </Link>
                        </li>

                        {/* <li className={`drop ${ active === 'settings' ? 'active' : '' }`}>
                            <Link onClick={ (e) => {
                                openDrop(e,'settings', 'settings');
                                }} className='ui-icon-animate' title='Launch' >
                                <span className='concreap-icon'><img src="../../../images/icons/dsettings.svg" alt="icon" /></span>
                                <span className='lnk--text font-matterregular fs-15'>Settings</span>
                                <span className="ml-auto fe fs-24" style={{position: 'relative', top: '3px', left: '8px'}}></span>
                            </Link>

                            <div className={`ui-sidebar-dropdown ${dropType === 'trade' ? 'is-open' : ''}`}>

                                <ul className='ui-sidebar-primary-links'>

                                    <li>
                                        <Link onClick={(e) => goto(e, '/salex/launch', 'launch')} to='' className='ui-icon-animate' title='Basic info'>
                                        <span className='lnk--text fs-13 font-montserrat'>
                                            Dashboard
                                        </span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link onClick={(e) => goto(e, '/salex/launch/start-sale', 'launch')} to='' className='ui-icon-animate' title='Basic info'>
                                        <span className='lnk--text  fs-13 font-montserrat'>
                                            Start Sale
                                        </span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link onClick={(e) => goto(e, '/salex/launch/manage', 'launch')} to='' className='ui-icon-animate' title='Basic info'>
                                        <span className='lnk--text  fs-13 font-montserrat'>
                                            Manage Presale
                                        </span>
                                        </Link>
                                    </li>

                                </ul>

                            </div>
                        </li> */}

                    </ul>

                    <div className="ui-line bg-silverlight"></div>

                    <ul id="ui-sidebar-primary-links" className={`ui-sidebar-primary-links`}>

                        <li className={ `nav-list` }>
                            <Link onClick={(e) => logout(e)} to='' className='ui-icon-animate link' title='Logout'>
                                <span style={{position: 'relative', left: '0', top: '1px', color: '#fff'}} className='xp-power xp-webicon'>
                                    <i className='path1 fs-20'></i>
                                    <i className='path2 fs-20'></i>
                                </span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Logout
                                </span>
                            </Link>
                        </li>

                    </ul>

                </div>
            
            </div>
          
          </section>
        
        </>

    )

}

export default SideBar;