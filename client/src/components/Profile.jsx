import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setDeleteProfile, setUpdateProfile } from '../redux/slices/ProfileSlice'
import UpdateProfile from './UpdateProfile';
import DeleteProfile from './DeleteProfile';

export default function Profile() {
  let dispatch = useDispatch()
  let updateProfile = useSelector(state => state.profile.updateProfile);
  let deleteProfile = useSelector(state => state.profile.deleteProfile);
  let userInfos = useSelector(state => state.user.userInfos)
  return (
    <div className='Profile'>
      {updateProfile ? <UpdateProfile /> :
        <>
          <img src={ userInfos.ProfileImg || "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"} alt="userImg" />
          {deleteProfile ? <DeleteProfile /> : 
            <>
              <h3>UserName : { userInfos.UserName}</h3>
              <h3>Gmail : { userInfos.Gmail }</h3>
              <div className="btns">
                <button onClick={() => dispatch(setUpdateProfile())}>update profile</button>
                <button onClick={() => dispatch(setDeleteProfile())}>delete profile</button>
              </div>
            </>
          }
        </>}
    </div>
  )
}
