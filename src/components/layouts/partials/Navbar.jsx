import React, {useEffect, useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import storage from '../../helpers/storage'
import body from '../../helpers/body'

import "react-modal-video/scss/modal-video.scss"

import JoinModal from '../../../components/pages/JoinModal'

const TopBar = ({ isFixed, backgroundColor, doScroll }) => {

    const [showNotify, setShowNotify] = useState(false);
    let history = useHistory();

    const [show, setShow] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [showJoin, setShowJoin] = useState(false)

    useEffect(() => {

        body.fixNav();

    }, []);


      const goto = (e, url, t) => {

        if(e){
            e.preventDefault()
        }

        history.push(url);
  
    }

    const toggleLogin = (e) => {
        if(e) e.preventDefault()
        setShow(!show);
    }

    const scrollTo = (e, t) => {
        if(e) e.preventDefault();
        doScroll(e, t);
    }

    const toggleJoin = (e) => {
        if(e) e.preventDefault()
        setShowJoin(!showJoin)
    }

    // this: used in pushing
    return (
        <>
         
            <header id="header" className={`header header-nav ${isFixed && isFixed === true ? 'stick' : 'bg-white blocked flat'}`} style={{ backgroundColor: backgroundColor ? backgroundColor : '' }}>
                
                <div className="nav-body">
                
                    <div className="navigation bg-brandcox-firefly">
                        <div className="container-fluid">

                            <nav className="main-nav navbar navbar-right navbar-expand-md">

                                <Link to="/" className="navbar-brand logo" ><img src="../../../images/assets/logo-white.svg" alt="" /></Link>
                            
                                <div className="ml-auto d-flex align-items-center ui-hide">
                                    <Link className="sd-menu md-menu onblack"><span className={`fe fe-menu fs-30`}></span></Link>
                                </div>

                                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                                    <span className="menu_toggle">
                                    <span className="hamburger">
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                    <span className="hamburger-cross">
                                        <span />
                                        <span />
                                    </span>
                                    </span>
                                </button>
                            
                            <div id="navbar-collapse" className="navbar-collapse collapse">
                                {/* left */}
                                <ul className="nav left-nav navbar-nav pdl3">
                                    <li className="nav-item link"><Link onClick={(e) => scrollTo(e, 'curriculum')} className="nav-link onwhite font-mattersemibold fs-14" to="/">Curriculum</Link></li>
                                    <li className="nav-item link"><Link onClick={(e) => scrollTo(e, 'why')} className="nav-link onwhite font-mattersemibold fs-14">The Why</Link></li>
                                    <li className="nav-item link"><Link onClick={(e) => scrollTo(e, 'about')} className="nav-link onwhite font-mattersemibold fs-14">About</Link></li>
                                </ul>

                                {/* Right */}
                                <ul class="nav navbar-nav right-nav ml-auto">
                                    <li className="nav-item link">
                                        <Link onClick={(e) => toggleJoin(e)} className="nav-link nav-btn onwhite font-mattermedium btn md gradient-yellow font-matterbold onwhite" to="">Join The List</Link>
                                    </li>
                                </ul>
                                
                            </div>
                            </nav>
                        </div>
                    </div>
                    
                </div>

                {/* {
                    !isFixed &&
                    <div className="ui-line bg-silverlight"></div>
                } */}
            
            </header>
            
            <JoinModal isShow={showJoin} closeModal={toggleJoin} modalTitle="Join Waiting List" flattened={true} slim="slim-mlg" />
            
        </>
    )
}

export default TopBar;