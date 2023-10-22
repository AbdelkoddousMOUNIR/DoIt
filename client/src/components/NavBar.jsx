import React  from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/NavBar.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setShowProfile, setCloseProfile } from '../redux/slices/ProfileSlice';
import { closeUpdateTask } from '../redux/slices/TaskSlice';

export default function NavBar() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let isAuth = localStorage.getItem("userId")
  let userInfos = useSelector(state => state.user.userInfos)
  return (
    <div className='NavBar'>
      {isAuth ?
        <>
          <img src={userInfos.ProfileImg || "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"} className='profile' alt="" onClick={() => {
            dispatch(setShowProfile())
          }} />
          <div className="auth">
            <button onClick={() => {
              navigate("/tasks")
              dispatch(setCloseProfile())
              dispatch(closeUpdateTask())
            }}>Tasks</button>
            <button onClick={() => {
              localStorage.clear()
              navigate("/")
            }}>LogOut</button>
          </div>
        </>
        :
        <>
          <div className="logo">doIt</div>
          <div className="auth">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>register</button>
          </div>
        </>}
    </div>
  )
}