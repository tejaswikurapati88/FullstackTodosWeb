import {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


import './index.css'

const SimpleTodos  =()=> {
  const navigagte= useNavigate()
  const cookiejwtToken= Cookies.get('jwtToken')
  if (cookiejwtToken === undefined){
    navigagte('/login')
  }
  const [todoList, setTodoList]= useState([])
  const [inpu, setInput]= useState('')

  useEffect(()=>{
    const fetchTodos= async ()=>{
      const url='https://todosvsbackend.onrender.com/api/todos'
      const response=await fetch(url)
      if (response.ok === true){
        const data= await response.json()
        setTodoList(data)
      }
    }
    fetchTodos()
  }
  )

  const deleteItem = async id => {
    const option={
      method: 'delete'
    }
    const response= await fetch(`https://todosvsbackend.onrender.com/api/todos/${id}`, option)
    if (response.ok === true){
      console.log('deleted')
    }else{
      console.log('error, not deleted')
    }
    const filteredData = todoList.filter(each => each.id !== id)
    setTodoList(filteredData)
  }

  const onChangeInput = event => {
    setInput(event.target.value)
  }

  const onAddButton = async () => {
    const details={
      id: uuidv4(),
      task: inpu,
      status: false
    }
    const option={
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
    }
    console.log(details)
    const  resp = await fetch('https://todosvsbackend.onrender.com/api/todos', option)
    if (resp.ok===true){
      console.log('added successfully')
    }else{
      console.log("error, didn't added")
    }
    todoList.push({id: uuidv4(), task: inpu, status: 'inprogress'})
    setInput('')
    setTodoList(todoList)
  }

  const saveItems = () => {
    localStorage.setItem('todolocallist', JSON.stringify(todoList))
    console.log(todoList)
  }

  const changeEditedValue = async (id, taskTitle) => {
    const option={
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task: taskTitle})
    }
    console.log(JSON.stringify({task: taskTitle}))
    const res= await fetch(`https://todosvsbackend.onrender.com/api/todos/${id}`, option)
    if (res.ok===true){
      console.log('task updated')
    }else{
      console.log('error, task is not updated')
    }
    const newUpdatedList = todoList.map(each => {
      if (each.id === id) {
        return {...each, task: taskTitle}
      }
      return each
    })
    setTodoList(newUpdatedList)
  }

  const onLogout=()=>{
    Cookies.remove('jwtToken')
  }

  

    return (
      <div className="bg-container">
        <button className='logout' onClick={onLogout} type='button'>Logout</button>
        <div className="container">
          <h1 className="main-heading">Tack Your Tasks</h1>
          <div className="add-cont">
            <input
              type="text"
              className="input"
              onChange={onChangeInput}
              value={inpu}
            />
            <button
              onClick={onAddButton}
              type="button"
              className="add-button"
            >
              Add
            </button>
          </div>
          {todoList.map(eachTodo => (
            <TodoItem
              itemDetails={eachTodo}
              deleteItem={deleteItem}
              key={eachTodo.id}
              onEditedTask={changeEditedValue}
            />
          ))}
          <button className="main-save-button" onClick={saveItems}>
            Save
          </button>
        </div>
      </div>
    )
  
}

export default SimpleTodos
