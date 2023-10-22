import { createSlice} from '@reduxjs/toolkit';


const ProfileSlice = createSlice({
  name: 'Profile',
  initialState: {
    showProfile: false,
    updateProfile: false,
    deleteProfile : false
  },
  reducers: {
    setShowProfile: (state) => {
      state.showProfile = true;
    },
    setCloseProfile : (state) => {
      state.showProfile = false;
    },
    setUpdateProfile: (state) => {
      state.updateProfile = !state.updateProfile;
    },
    setDeleteProfile: (state) => {
      state.deleteProfile = !state.deleteProfile;
    }
  }
});

export const { setShowProfile , setUpdateProfile , setDeleteProfile , setCloseProfile} = ProfileSlice.actions;

export default ProfileSlice.reducer;