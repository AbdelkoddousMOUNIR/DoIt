import React from 'react';
import NavBar from "../components/NavBar"
import "../styles/TasksPage.scss"
import TasksContainer from '../components/TasksContainer';
import { useSelector } from 'react-redux';
import Profile from "../components/Profile"

export default function TasksPage() {
  let showProfile = useSelector(state => state.profile.showProfile);
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
