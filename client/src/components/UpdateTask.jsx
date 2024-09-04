import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeUpdateTask } from '../redux/slices/TaskSlice'
import axios from 'axios'

export default function UpdateTask() {
  let dispatch = useDispatch()
  let taskId = useSelector(state => state.task.taskId)
  let [updatedTask , setUpdatedTask] = useState("")
  let handelSubmit = async (e) => {
      e.preventDefault()
      try {
        await axios.put(`https://doit-84ff.onrender.com/tasks/updateTask/${taskId}`, {task : updatedTask} , {
          headers: {
              accesstoken: localStorage.getItem('token')
          }
        });
        dispatch(closeUpdateTask())
        setUpdatedTask("")
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  }
  
  return (
    <div className='UpdateTask'>
      <form onSubmit={handelSubmit}>
        <input type="text" value={updatedTask} onChange={(e) => {
          setUpdatedTask(e.target.value)}} />
        <button>update</button>
      </form>
      <button className='concelBtn' onClick={() => dispatch(closeUpdateTask())}>concel</button>
    </div>
  )
}
