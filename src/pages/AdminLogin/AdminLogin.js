import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './AdminLogin.css';
import OpenEye from '../../assets/OpenEye.svg';
import CloseEye from '../../assets/CloseEye.svg';

import { useLoader } from "../../context/LoaderContext/LoaderContext";
import { useAdmin } from "../../context/AdminContext/AdminContext";

export const AdminLogin = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const { setLoader } = useLoader();
    const { addInitialAdminData } = useAdmin();
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = e => {
        setError('');
        if(username.length!==0 && password.length!==0){
            e.preventDefault();

            if(password.length<8){
                setError('Password should be atleat 8 character long')
            }
            else{
                signInCall();
            }

        }
    }

    const signInCall = async () => {
        setLoader(true)
        try{
            const callApi = await axios.post('https://stg.dhunjam.in/account/admin/login', { username, password });
            if(callApi.status===200){
               const getDetails = await axios.get(`https://stg.dhunjam.in/account/admin/${callApi.data.data.id}`);
               if(getDetails.status===200){
                addInitialAdminData(getDetails.data.data);
                navigate('/dashboard');
               }
            }
        }
        catch (eror){
            eror.response.data.ui_err_msg ? setError(eror.response.data.ui_err_msg) : setError(eror.response.data.server_err_msg);
        }
        finally{
            setLoader(false);
        }
    }

    return <main className="login-main" >
        <div className="login-container" >
            <h1> Venue Admin Login </h1>
            <form onChange={ () => setError('') } >
                <label>
                    <input required type='text' placeholder="Username" value={ username } onChange={ e => setUsername(e.target.value) } />
                </label>
                <label className="password-label" >
                    <input required type={showPassword ? 'text' : 'password'} placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) } />
                    {
                        password.length!==0 &&
                        <img className="password-toggle" src={showPassword ? CloseEye : OpenEye} alt='Password Toggle' onClick={ () => setShowPassword( value => !value ) } />
                    } 
                </label>
                <div className="error-message" > {error} </div>
                <button onClick={ e => handleSignIn(e) } > Sign in </button>
            </form>
            <div className="registration-div" > New Registration ? </div>
        </div>
    </main>
}