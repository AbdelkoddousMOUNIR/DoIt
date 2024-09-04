/* eslint-disable react-hooks/exhaustive-deps */
import { useState , useEffect } from 'react'
import React from 'react'
import Task from './Task'
import UpdateTask from './UpdateTask'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function TasksContainer() {
  let updateTask = useSelector(state => state.task.updateTask)
  let isAuth = localStorage.getItem("userId")
  let [tasks, setTasks] = useState([])
  let [task, setTask] = useState("")

  let getTasks = async () => {
    try {
      const { data } = await axios.get(`https://doit-84ff.onrender.com/tasks/getTasks/${isAuth}`, {
        headers: {
            accesstoken: localStorage.getItem('token')
        }
    });
      setTasks(data.userTasks)
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getTasks()
  })

  let handelSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`https://doit-84ff.onrender.com/tasks/postTask/${isAuth}`, {task : task} , {
        headers: {
            accesstoken: localStorage.getItem('token')
        }
      })
      setTask("")
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
  }
  
  return (
    <div className='TasksContainer'>
      {updateTask ? <UpdateTask /> : 
      <>
        <form onSubmit={handelSubmit}>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
            <button type='submit'>create</button>
        </form>
        <div className="Tasks">
          {tasks.map((elem , index) => (<Task task = {elem.task} isCompleted={elem.isCompleted} key={index} taskId = {elem._id}/>))} 
        </div>
      </>}
    </div>
  )
}
