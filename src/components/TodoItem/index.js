// Write your code here
import {useState} from 'react'

import './index.css'

const TodoItem = props => {
  const {deleteItem, itemDetails, onEditedTask} = props
  const {id, task, status} = itemDetails
  const onDeleteTodo = () => {
    deleteItem(id)
  }
  const [isEdit, setIsEdit] = useState(false)
  const [isChecked, setCheck] = useState(status)
  const [taskTitle, setTaskTitle] = useState(task)

  const onClickEdit = () => {
    setIsEdit(true)
  }
  const onSaveEditTask = () => {
    setIsEdit(false)
    onEditedTask(id, taskTitle)
  }
  const onChangeTitle = event => {
    setTaskTitle(event.target.value)
  }
  const onClickCheckInput = async event => {
    const url=`https://todosvsbackend.onrender.com/api/todos/status/${id}`
    const change=  event.target.checked
    const statusUpdate= {status: change}
    const option={
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusUpdate)
    }
    console.log(JSON.stringify(statusUpdate))
    const res= await fetch(url, option)
    if (res.ok===true){
      setCheck(change)
      console.log('status changed')
    }else{
      console.log('Status not changed')
    }
    
  }

  const isCheckedTrue = isChecked ? 'checked' : ''

  return (
    <li>
      {isEdit ? (
        <div className="cont">
          <input
            className="edit-input"
            type="text"
            value={taskTitle}
            onChange={onChangeTitle}
          />
          <div>
            <button className="save-butn" onClick={onSaveEditTask}>
              Save
            </button>
            <button onClick={onDeleteTodo} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="cont">
          <div className="check-cont">
            <input
              className="checkbox"
              checked={isChecked}
              onChange={onClickCheckInput}
              type="checkbox"
              id={id}
            />
            <p htmlFor={id} className={`name ${isCheckedTrue}`}>
              {task}
            </p>
          </div>
          <div>
            <button className="save-butn" onClick={onClickEdit}>
              Edit
            </button>
            <button onClick={onDeleteTodo} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

export default TodoItem
