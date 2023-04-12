import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import storage from '../../helpers/storage'
import body from '../../helpers/body'

// date picker: https://react-day-picker.js.org/

import Alert from '../../layouts/partials/Alert'

const Register = (props) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState('password');
    const [regData, setRegData] = useState({
        email: '',
        username: '',
        password: '',
        userType: 'player',
    })
    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    });

    useEffect(() => {

        body.changeBackground('chess-mint');

    }, [])

    const register = async (e) => {

        if(e) e.preventDefault()

        if(!regData.username && !regData.email && !regData.password){
            setAlert({...alert, type: "danger", show:true, message:'All fields are required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if (!regData.email) {
            setAlert({...alert, type: "danger", show:true, message:'Please enter your email'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if (!regData.username) {
            setAlert({...alert, type: "danger", show:true, message:'username is required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else  if (!regData.password) {
            setAlert({...alert, type: "danger", show:true, message:'Choose a password'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        } else {
            setLoading(true);

            await Axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,{...regData},  storage.getConfig())
            .then((resp) => {
                if(resp.data.error === false && resp.data.status === 200){

                    navigate('/login');
                    
                }
                setLoading(false);
            }).catch((err) => {

                if(err.response.data.errors[0] === 'phone number already exist'){
                    setAlert({...alert, type: "danger", show:true, message:'Phone number is already rgistered'})
                    setTimeout(()=> {
                        setAlert({...alert, show:false});
                    }, 5000) 
                }else if(err.response.data.errors[0] === 'password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number'){
                    setAlert({...alert, type: "danger", show:true, message:'Password must have 8 charaters, 1 lowercase and 1 uppercase letters, 1 number and 1 special character'})
                    setTimeout(()=> {
                        setAlert({...alert, show:false});
                    }, 5000)
                } else {
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
            })
        }
    }

    return (
        <>

            <section className='section heightv-full'>

                <form className='form ui-wrapper-large' onSubmit={(e) => { e.preventDefault() }}>

                    <div className='row no-gutters'>

                        <div className='col-md-4 mx-auto'> 

                            <div className='auth-form-box'>

                                <h2 className='ui-text-center onwhite font-matterbold'>Register</h2>

                                <Alert type={alert.type} show={alert.show} message={alert.message} />

                                <div className='form-row mrgb'>

                                    <div className='col'>
                                        <label className='fs-13 onwhite font-matterregular mrgb0'>Your email</label>
                                        <input 
                                        defaultValue={(e) => { setRegData({ ...regData, email: e.target.value }) }}
                                        onChange={(e) => { setRegData({ ...regData, email: e.target.value }) }}
                                        type="email" className="form-control fs-14 lg on-black font-matterregular" 
                                        placeholder="you@example.com" autoComplete='off' />
                                    </div>

                                </div>

                                <div className='form-row mrgb0'>

                                    <div className='col'>
                                        <label className='fs-13 onwhite font-matterregular mrgb0'>Username</label>
                                        <input 
                                        defaultValue={(e) => { setRegData({ ...regData, username: e.target.value }) }}
                                        onChange={(e) => { setRegData({ ...regData, username: e.target.value }) }}
                                        type="text" className="form-control fs-14 lg on-black font-matterregular" 
                                        placeholder="myusername" autoComplete='off' />
                                    </div>

                                    <div className='col password-input lg'>
                                        <label className='fs-13 onwhite font-matterregular mrgb0'>Your password</label>
                                        <input 
                                        defaultValue={(e) => { setRegData({ ...regData, password: e.target.value }) }}
                                        onChange={(e) => { setRegData({ ...regData, password: e.target.value }) }}
                                        type={pass} className="form-control fs-14 lg on-black font-matterregular" 
                                        placeholder="Password" autoComplete='off' />
                                    </div>

                                </div>

                                <div className='d-flex align-items-center mrgt2'>

                                    <Link to="/login" className='brand-orange fs-13 font-matterregularbold'>Login</Link>

                                    <Link onClick={(e) => register(e)} to="/" className={`btn md bg-brand-orange font-matterregularbold stretch-md onwhite ml-auto ${ loading ? 'disabled-lt' : '' }`}>
                                        { loading ? <span className='chess-loader white sm'></span> : 'Register' }
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

export default Register;