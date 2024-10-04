import './index.css'
import {useEffect, useState} from 'react'

const Home = ()=> {
    const [todosData, setTodosData]= useState([])

    useEffect(()=> {
        const getTodoData = async () => {
            const url='/todos'
            const response= await fetch(url)
            const data= await response.json()
            console.log(data)
        }
        getTodoData()
    }, [])

    

    return (
        <div className='home-bg-container'>
            <h1 className='main-heading'>Todos</h1>
        </div>
    )
    
}

export default Home