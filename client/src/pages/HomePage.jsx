import React from 'react';
import "../styles/HomePage.scss"
import NavBar from '../components/NavBar';

export default function HomePage() {
  return (
    <div className='HomePage'>
      <NavBar />
      <main>
        <div className="description">
          <h1>doIt</h1>
          <p>doIt is your go-to app for effortless task management and productivity enhancement. Designed with simplicity and functionality in mind, doIt empowers you to stay organized, focused, and in control of your daily tasks and responsibilities. Whether you're managing personal chores, work projects, or collaborative tasks with your team, doIt is the ultimate tool to help you accomplish more with less stress.</p>
        </div>
        <div className="imgContainer">
          <img src="https://cdn-icons-png.flaticon.com/512/6753/6753193.png" alt="" />
        </div>
      </main>
    </div>
  );
}





