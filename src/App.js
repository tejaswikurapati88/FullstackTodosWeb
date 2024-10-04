import {Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import SigninPage from './components/SigninPage'
import NotFound from './components/NotFound'
import React from 'react'



const App=()=> (
  <Routes>
    <Route exact path='/login' element = {<LoginPage/>} />
    <Route exact path="/signin" element ={<SigninPage/>} />
    <Route exact path='/' element = {<Home/>} />
    <Route element = {<NotFound/>} />
    
  </Routes>
)


export default App;
