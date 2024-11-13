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

    const onRegistraion= async (eve)=>{
        eve.preventDefault()
        const userDetails={name, username, password, age, gender}
        if (name === '' || username === '' || password === '' || conPass==='' || age === '' || gender === ''){
            setError('*All feilds have to be filled')
        }else if (password !== conPass) {
            console.log(password, conPass)
            setError('*Passwords should match')
        }
        else{
            const url='https://todosvsbackend.onrender.com/api/signin'
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
                <input className='input' value={name} onChange={(e) => {setName(e.target.value)}} id="name" type="text" placeholder='Jhon Vison' />
                <label className='lable' htmlFor="userName" >username</label>
                <input className='input' value={username} onChange={(e) => {setusername(e.target.value)}} id="userName" type="text" placeholder='jhonvison' />
                <label className='lable' htmlFor="password" >Password</label>
                <input className='input' value={password} onChange={(e) => {setPassword(e.target.value)}} id="password" type="password" placeholder='erfg%14a' />
                <label className='lable' htmlFor="passwordCon" >Confirmation Password</label>
                <input className='input' value={conPass} onChange={(e) => {setConPass(e.target.value)}} id="passwordCon" type="password" />
                <label className='lable' htmlFor="age" >Age</label>
                <input className='input' value={age} onChange={(e) => {setAge(e.target.value)}} id="age" type="text" placeholder='age' />
                <label className='lable' htmlFor="gender" >Gender</label>
                <select onChange={((e) => {setGender(e.target.value)})} value={gender} id='gender' name='gender' >
                    <option>Select</option>
                    <option name='male' >Male</option>
                    <option name='female' >Female</option>
                </select>
                <button className='submitButton' type='submit' >Register</button>
                <p >{errorMsg}</p>
            </form>
        </> } 
        </div>
    )
}
    


export default SigninPage