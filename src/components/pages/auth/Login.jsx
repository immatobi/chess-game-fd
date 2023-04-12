import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import storage from '../../helpers/storage'
import body from '../../helpers/body'

import socket from '../../helpers/socket'

// date picker: https://react-day-picker.js.org/

import Alert from '../../layouts/partials/Alert'
import Message from '../../layouts/partials/Message'
import SEO from '../../layouts/partials/SEO';

const Login = (props) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState('password');
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    });

    useEffect(() => {

        body.changeBackground('chess-mint');

    }, [])

    const login = async (e) => {
        
        if(e) { e.preventDefault() }

        if(!loginData.email && !loginData.password){
            setAlert({...alert, type: "danger", show:true, message:'All fields are required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if(!loginData.email){
            setAlert({...alert, type: "danger", show:true, message:'Email is required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if(!loginData.password){
            setAlert({...alert, type: "danger", show:true, message:'Password is required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        } else{

            setLoading(true);

            await Axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {...loginData}, storage.getConfig())
            .then(async (resp) => {

                if(resp.data.error === false && resp.data.status === 200){

                    if(resp.data.data.isUser && resp.data.data.isActive){

                        if(!resp.data.data.isSuper && !resp.data.data.isAdmin){

                            storage.saveCredentials(resp.data.token, resp.data.data._id);
                            navigate('/dashboard');
                            
                        }else{

                            setAlert({...alert, type: "danger", show:true, message:'Admins are not allowed to login'})
                            setTimeout(()=> {
                                setAlert({...alert, show:false});
                            }, 5000)

                        }

                    }else{

                        setAlert({...alert, type: "danger", show:true, message:'Account currently inactive. Contact support'})
                        setTimeout(()=> {
                             setAlert({...alert, show:false});
                        }, 5000)

                    }
                    
                }
 
                setLoading(false);

            }).catch((err) => {
            
                if(err.response.data.errors[0] === 'invalid credentials'){

                    setAlert({...alert, type: "danger", show:true, message:'Incorrect email or password'})
                    setTimeout(() => {
                        setAlert({...alert, show: false});
                    }, 5000)

                    setLoading(false);

                }else{

                    if(err.response.data.errors.length > 0){

                        setAlert({...alert, type: "danger", show:true, message:err.response.data.errors[0]})
                        setTimeout(()=> {
                            setAlert({...alert, show:false});
                        }, 5000)

                    }else{
                        setAlert({...alert, type: "danger", show:true, message:err.response.data.message})
                        setTimeout(()=> {
                            setAlert({...alert, show:false});
                        }, 5000)
                    }
                    
                }

                setLoading(false);
            
            });

        }
    }

    return (
        <>

            <section className='section heightv-full'>

                <form className='form ui-wrapper-large' onSubmit={(e) => { e.preventDefault() }}>

                    <div className='row no-gutters'>

                        <div className='col-md-4 mx-auto'> 

                            <div className='auth-form-box'>

                            <h2 className='ui-text-center onwhite font-matterbold'>Login</h2>

                                <Alert type={alert.type} show={alert.show} message={alert.message} />

                                <div className='form-group form-row mrgb'>

                                    <div className='col'>
                                        <label className='fs-13 onwhite font-modern mrgb0'>Your email</label>
                                        <input 
                                        defaultValue={(e) => { setLoginData({ ...loginData, email: e.target.value }) }}
                                        onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }}
                                        type="email" className="form-control fs-14 lg on-black font-modern" 
                                        placeholder="you@example.com" autoComplete='off' />
                                    </div>

                                </div>

                                <div className='form-group form-row mrgb0'>

                                    <div className='col password-input lg'>
                                        <label className='fs-13 onwhite font-modern mrgb0'>Your password</label>
                                        <input 
                                        defaultValue={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}
                                        onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}
                                        type={pass} className="form-control fs-14 lg on-black font-modern" 
                                        placeholder="Password" autoComplete='off' />
                                    </div>

                                </div>

                                <div className='d-flex align-items-center mrgt2'>

                                    <Link to="/register" className='brand-orange fs-13 font-modernbold'>Register?</Link>

                                    <Link onClick={(e) => login(e)} to="/" className={`btn md bg-brand-orange font-modernbold stretch-md onwhite ml-auto ${ loading ? 'disabled-lt' : '' }`}>
                                        { loading ? <span className='chess-loader white sm'></span> : 'Log in' }
                                    </Link>
                                
                                </div>

                                
                            </div>

                        </div>

                    </div>     

                </form>

                

            </section>

            
            
            
        </>
    )

}

export default Login;