import './index.css'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'


const LoginPage = ()=> {
    const [userNameInput, setUserName]= useState('')
    const [passwordInput, setPassword]= useState('')
    const [errormsg, setErrorMsg]= useState(false)
    const Navigate = useNavigate()

    const submitSuccess=(data)=>{
        const {jwtToken}= data
        Cookies.set('jwtToken', jwtToken, {expires: 30, path: '/'})
        Navigate('/')
    }

    const onLogin= async (eve)=>{
        eve.preventDefault()
        const url='https://todosvsbackend.onrender.com/api/login'
        const userDetails = {
            username: userNameInput,
            password: passwordInput
        }
        const option={
            method: 'POST',
            headers:{
                "accept": 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }
        const res =await fetch(url, option)
        const data= await res.json()
        console.log(data)
        if (res.ok !== true){
            console.log(data) 
            setErrorMsg(true)
        }else{
            submitSuccess(data)
            setErrorMsg(false)
        }
        setUserName('')
        setPassword('')
    }

    const onInpPass=(e)=>{
        setPassword(e.target.value)
    }

    const oninpName=(e)=>{
        setUserName(e.target.value)
    }
        
    return (
        <div className='login-bg-container'>
            <div className='login-cont'>
            <div className='login-cont-head' >
                <h1 className='login-heading'>Login</h1>
                <form onSubmit={onLogin} className='loginform' >
                    <label htmlFor='username' className='label' >username</label>
                    <input className='input-lo' id='username' onChange={oninpName} value={userNameInput}  type='text' placeholder="User Name"/>
                    <label htmlFor='password' className='label' >password</label>
                    <input className='input-lo' id='password' onChange={onInpPass} value={passwordInput}  type='password' placeholder="rewrfw@14w"/>
                    <button type='submit' className='login-button'>Login</button>
                    {errormsg === true && <p className='errormsg' >*Invalid userName or passsword</p>}
                </form>
                <Link to='/signin' className='link'>
                    <button className='signin-button' >Sign In</button>
                </Link>
                {setErrorMsg && <p className='errormsg'>*Username or Password is incorrect</p>}
            </div>
            </div>
        </div>
    )

}


export default (LoginPage)