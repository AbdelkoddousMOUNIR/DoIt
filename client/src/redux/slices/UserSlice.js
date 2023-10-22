import { createSlice} from '@reduxjs/toolkit';


const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userInfos : {}
  },
  reducers: {
    getUserInfos : (state , action) => {
      state.userInfos = action.payload;
    },
  }
});

export const { getUserInfos } = UserSlice.actions;

export default UserSlice.reducer;