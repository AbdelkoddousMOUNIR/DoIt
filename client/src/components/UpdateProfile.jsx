import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateProfile } from '../redux/slices/ProfileSlice';
import axios from 'axios';

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('userId');
  const userInfos = useSelector(state => state.user.userInfos);

  const [profileImg, setProfileImg] = useState(userInfos.ProfileImg || 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png');

  const [updatedUserInfos, setUpdatedUserInfos] = useState({
    image: null,
    UserName: userInfos.UserName || '',
    Gmail: userInfos.Gmail || '',
    Password: '',
    NewPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', updatedUserInfos.image);
      formData.append('UserName', updatedUserInfos.UserName);
      formData.append('Gmail', updatedUserInfos.Gmail);
      formData.append('Password', updatedUserInfos.Password);
      formData.append('NewPassword', updatedUserInfos.NewPassword);

      await axios.put(`http://localhost:5000/user/${isAuth}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accesstoken': localStorage.getItem('token'),
        },
      });
      dispatch(setUpdateProfile());
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    setUpdatedUserInfos({ ...updatedUserInfos, [name]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImg(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="UpdateProfile">
      <form onSubmit={handleSubmit}>
        <h2>Update user information</h2>
        <label htmlFor="Img">
          <img src={profileImg} alt="Preview" />
          <input
            type="file"
            accept="image/*"
            id="Img"
            className="inputFile"
            name="ProfileImg"
            onChange={(e) => {
              handleChange('image')(e);
              handleImageUpload(e);
            }}
            hidden
          />
        </label>
        <input type="text" placeholder="UserName" name="UserName" value={updatedUserInfos.UserName} onChange={handleChange('UserName')} />
        <input type="email" placeholder="Gmail" name="Gmail" value={updatedUserInfos.Gmail} onChange={handleChange('Gmail')} />
        <input type="password" placeholder="Password" name="Password" value={updatedUserInfos.Password} onChange={handleChange('Password')} required />
        <input type="password" placeholder="New Password" name="NewPassword" value={updatedUserInfos.NewPassword} onChange={handleChange('NewPassword')} />
        <button type="submit">Update</button>
      </form>
      <button className="btn2" onClick={() => dispatch(setUpdateProfile())}>
        Cancel
      </button>
    </div>
  );
}
