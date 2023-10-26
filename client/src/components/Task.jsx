import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUpdateTask, getTaskId } from '../redux/slices/TaskSlice.js';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import axios from 'axios';

export default function Task({ task, isCompleted, taskId }) {
  const dispatch = useDispatch();
  const [completedTask, setCompletedTask] = useState(isCompleted);

  const handleCheckboxChange = async () => {
    setCompletedTask(!completedTask); // Optimistic update

    try {
      await axios.put(`https://doit-5hrl.onrender.com/tasks/updateTask/${taskId}`, { isCompleted: !completedTask }, {
        headers: {
          accesstoken: localStorage.getItem('token'),
        },
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      // Handle the error, you might want to revert the state back to the original value here
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`https://doit-5hrl.onrender.com/tasks/deleteTask/${taskId}`, {
        headers: {
          accesstoken: localStorage.getItem('token'),
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className='Task'>
      <input type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
      <h3 style={{ textDecoration: completedTask ? "line-through" : "none" }}>{task}</h3>
      <div className="icons">
        <AiFillEdit className="icon" onClick={() => {
          dispatch(setUpdateTask());
          dispatch(getTaskId(taskId));
        }} />
        <AiOutlineDelete className='icon' onClick={deleteTask} />
      </div>
    </div>
  );
}
