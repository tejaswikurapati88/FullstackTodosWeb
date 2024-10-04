import './index.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'

const SigninPage = () => {
    const [name, setName]= useState('')
    const [username, setusername]= useState('')
    const [password, setPassword]= useState('')
    const [conPass, setConPass]= useState('')
    const [age, setAge]= useState('')
    const [gender, setGender]= useState('')
    const [errorMsg, setError]= useState('')
    const [isSucc, setisSucc]= useState(false)

    const onNameChange=(e)=>{
        setName(e.target.value)
    }
    const onUsernameChange=(e)=>{
        setusername(e.target.value)
    }
    const onPassChange=(e)=>{
        setPassword(e.target.value)
    }
    const onConPassChange=(e)=>{
        setConPass(e.target.value)
    }
    const onAgeChange=(e)=>{
        setAge(e.target.value)
    }
    const onSelGender=(e)=>{
        setGender(e.target.value)
    }

    const onRegistraion= async (eve)=>{
        eve.preventDefault()
        const userDetails={name, username, password, age, gender}
        if (name === '' || username === '' || password === '' || conPass==='' || age === '' || gender === ''){
            setError('*All feilds have to be filled')
        }else if(password !== conPass) {
            setError('*Passwords should match')
        }
        else{
            const url='http://localhost:3000/api/signin'
            const option = {
                method: 'POST',
                headers :{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            }
            const response = await fetch(url, option)
            if (response.ok !== true){
                setError('Username Already Exists, please use another username')
            }
            if (response.ok === true){
                setError('')
                setName('')
                setPassword('')
                setusername('')
                setConPass('')
                setAge('')
                setGender('')
                setisSucc(true)
            }
        }
        
    }

    return (
        <div className='regis-cont'>{isSucc ? <div className='succView'>
            <h1>You are now Registered</h1>
            <Link to='/login' ><button className='returntoLogin'>Return to login</button></Link>
        </div>: <> 
        <h1 className='regis-heading'>Registration</h1>
            <form className='regis-form' onSubmit={onRegistraion} >
                <label className='lable' htmlFor="name" >Name</label>
                <input className='input' value={name} onChange={onNameChange} id="name" type="text" placeholder='Jhon Vison' />
                <label className='lable' htmlFor="userName" >username</label>
                <input className='input' value={username} onChange={onUsernameChange} id="userName" type="text" placeholder='jhonvison' />
                <label className='lable' htmlFor="password" >Password</label>
                <input className='input' value={password} onChange={onPassChange} id="password" type="password" placeholder='erfg%14a' />
                <label className='lable' htmlFor="passwordCon" >Confirmation Password</label>
                <input className='input' value={conPass} onChange={onConPassChange} id="passwordCon" type="password" />
                <label className='lable' htmlFor="age" >Age</label>
                <input className='input' value={age} onChange={onAgeChange} id="age" type="text" placeholder='age' />
                <label className='lable' htmlFor="gender" >Gender</label>
                <select onChange={onSelGender} value={gender} id='gender' name='gender' >
                    <option>Select</option>
                    <option value='male' >Male</option>
                    <option value='female' >Female</option>
                </select>
                <button className='submitButton' type='submit' >Register</button>
                <p >{errorMsg}</p>
            </form>
        </> } 
        </div>
    )
}
    


export default SigninPage