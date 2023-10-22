import { configureStore } from '@reduxjs/toolkit';
import ProfileReducer from './slices/ProfileSlice';
import TaskReducer from '../redux/slices/TaskSlice';
import UserReducer from '../redux/slices/UserSlice'

// Combine the counter reducer with other reducers if necessary
const rootReducer = {
  profile: ProfileReducer,
  task: TaskReducer,
  user: UserReducer
};

// Create the Redux store with combined reducers
const store = configureStore({
  reducer: rootReducer,
});

export default store;