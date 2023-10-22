import React from 'react'
import { useDispatch } from 'react-redux'
import { setDeleteProfile } from '../redux/slices/ProfileSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function DeleteProfile() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let isAuth = localStorage.getItem("userId")
  let deleteUserAccount = async () => {
    try {
        await axios.delete(`http://localhost:5000/user/${isAuth}`, {
        headers: {
            accesstoken: localStorage.getItem('token')
        }
        });
      localStorage.clear()
      dispatch(setDeleteProfile())
      navigate("/")
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
  }
  return (
    <div className='DeleteProfile'>
      <h2>are you sure you wont delete your acount !!</h2>
      <div className="btns">
        <button onClick={() => dispatch(setDeleteProfile())}>concel</button>
        <button onClick={() => deleteUserAccount()}>delete</button>
      </div>
    </div>
  )
}
