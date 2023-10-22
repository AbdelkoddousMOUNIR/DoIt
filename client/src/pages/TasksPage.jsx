import React , {useEffect} from 'react';
import NavBar from "../components/NavBar"
import "../styles/TasksPage.scss"
import TasksContainer from '../components/TasksContainer';
import { useSelector } from 'react-redux';
import Profile from "../components/Profile"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUserInfos } from '../redux/slices/UserSlice';

export default function TasksPage() {
  let dispatch = useDispatch()
  let showProfile = useSelector(state => state.profile.showProfile);
  let isAuth = localStorage.getItem("userId")

  let getUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/user/${isAuth}`, {
        headers: {
            accesstoken: localStorage.getItem('token')
        }
    });
      dispatch(getUserInfos(data.user))
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUser()
  })
  return (
      <div className='TasksPage'>
        <NavBar />
      <main>
        {
          showProfile ? <Profile /> : <TasksContainer />
        }
        </main>
      </div>
  );
}
