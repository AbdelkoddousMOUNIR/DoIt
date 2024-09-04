import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../styles/LoginPage.scss"

function LoginPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    Gmail: '',
    Password: '',
  });

  const ToastOption = {
    position: 'top-right',
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { Gmail, Password } = values;
      try {
        const {data} = await axios.post('https://doit-84ff.onrender.com/auth/login', {
          Gmail,
          Password,
        });
        let id = data.id;
        localStorage.setItem("token" , data.token)
        localStorage.setItem("userId" , id)
        navigate("/tasks");
      } catch (error) {
        console.log('Error:', error);
        toast.error('incorrect gmail or password !', ToastOption);
      }
    } else {
      console.log('Validation failed');
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { Gmail, Password } = values;
    if (Gmail === '') {
      toast.error('Gmail is required.', ToastOption);
      return false;
    } else if (Password.length < 8) {
      toast.error('Your password should be equal to or greater than 8 characters.', ToastOption);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="LoginPage">
        <div className="container">
          <div className="logo">
            <h1>DoIt</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="email" name="Gmail" placeholder="Gmail" onChange={handleChange} required />
            <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
          <hr />
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
