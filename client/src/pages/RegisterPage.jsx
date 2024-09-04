import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../styles/RegisterPage.scss"

function RegisterPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    UserName: '',
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
      const { UserName, Gmail, Password } = values;
      try {
        const { data } = await axios.post('https://doit-84ff.onrender.com/auth/register', {
          UserName,
          Gmail,
          Password,
        });
        let id = data.id;
        localStorage.setItem("token" , data.token)
        localStorage.setItem("userId" , id)
        navigate("/tasks");
      } catch (error) {
        console.log('Error:', error);
        toast.error('An error occurred while registering', ToastOption);
      }
    } else {
      console.log('Validation failed');
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { UserName, Gmail, Password } = values;
    if (UserName.length < 4) {
      toast.error('Invalid User. Please try again.', ToastOption);
      return false;
    } else if (Password.length < 8) {
      toast.error('Your password should be equal to or greater than 8 characters.', ToastOption);
      return false;
    } else if (Gmail === '') {
      toast.error('Gmail is required.', ToastOption);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="RegisterPage">
        <div className="container">
          <div className="logo">
            <h1>DoIt</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="UserName" placeholder="User Name" onChange={handleChange} required />
            <input type="email" name="Gmail" placeholder="Gmail" onChange={handleChange} required />
            <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
          </form>
          <hr />
          <span>Already have an account! <Link to="/login">Login</Link></span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RegisterPage;
