import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

//создаём стартовый state
const initialState = {
  tasks: [],
  isLoading: false,
  status: null,
};

//create task
export const createTask = createAsyncThunk(
  "task/createTask",
  async (newTask) => {
    try {
      const { data } = await axios.post("/task", { data: newTask });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//get all tasks
export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (select) => {
    try {
      const { data } = await axios.put("/task", { data: select });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//update task
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (updatedTask) => {
    try {
      const { data } = await axios.put(`/task/${updatedTask.id}`, updatedTask);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//success task
export const successTask = createAsyncThunk("task/successTask", async (id) => {
  try {
    const { data } = await axios.get(`/task/${id}`, { params: { id } });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clear: (state) => {
      state.status = null;
      state.tasks = [];
    },
  },
  extraReducers: {
    //create task
    [createTask.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [createTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tasks.push(action.payload.newTask);
      state.status = action.payload.message;
    },
    [createTask.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //get all tasks
    [getAllTasks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTasks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    },
    [getAllTasks.rejected]: (state) => {
      state.isLoading = false;
    },
    //update task
    [updateTask.pending]: (state) => {
      state.isLoading = true;
    },
    [updateTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.task) {
        state.tasks.find((task) => task._id === action.payload.task._id).text =
          action.payload.task.text;
        state.tasks.find(
          (task) => task._id === action.payload.task._id
        ).editedByAdmin = true;
      }
      state.status = action.payload.message;
    },
    [updateTask.rejected]: (state, action) => {
      debugger;
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //success task
    [successTask.pending]: (state) => {
      state.isLoading = true;
    },
    [successTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tasks.find((task) => task._id === action.payload._id).completed =
        action.payload.completed;
    },
    [successTask.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const tasks = (state) => state.task.tasks;

export const status = (state) => state.task.status;

export const { clear } = taskSlice.actions;

export default taskSlice.reducer;
