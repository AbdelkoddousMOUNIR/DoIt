import { createSlice} from '@reduxjs/toolkit';


const TaskSlice = createSlice({
  name: 'task',
  initialState: {
    updateTask : false,
    taskId : "",
  },
  reducers: {
    setUpdateTask: (state) => {
      state.updateTask = true;
    },
    closeUpdateTask: (state) => {
      state.updateTask = false;
    },
    getTaskId: (state , action) => {
      state.taskId = action.payload;
    }
  }
});

export const { setUpdateTask , closeUpdateTask , getTaskId} = TaskSlice.actions;

export default TaskSlice.reducer;