import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ToDo } from "../types/todo.type";
import http from "../utils/http";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

type ToDoState = {
  toDoList: ToDo[];
  editing: ToDo | null;
  loading: boolean;
  currentRequestId: string | undefined;
};

const initialState: ToDoState = {
  toDoList: [],
  editing: null,
  loading: false,
  currentRequestId: undefined,
};

export const getListTasks = createAsyncThunk(
  "todo/getListTasks",
  async (_, thunkApi) => {
    const res = await http.get<ToDo[]>("tasks", {
      signal: thunkApi.signal,
    });
    return res.data;
  }
);

export const deleteTasks = createAsyncThunk(
  "todo/deleteTasks",
  async (taskId: string, thunkApi) => {
    const res = await http.delete(`tasks/${taskId}`, {
      signal: thunkApi.signal,
    });
    return res.data;
  }
);

export const addTask = createAsyncThunk(
  "todo/addTask",
  async (task: ToDo, thunkApi) => {
    const res = await http.post<ToDo>("tasks", task, {
      signal: thunkApi.signal,
    });
    return res.data;
  }
);

export const editTask = createAsyncThunk(
  "todo/editTask",
  async (task: ToDo, thunkApi) => {
    const res = await http.put(`tasks/${task.id}`, task, {
      signal: thunkApi.signal,
    });
    return res.data;
  }
);

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetEditing: (state) => {
      state.editing = null;
    },
    startEditing: (state, action: PayloadAction<string>) => {
      state.editing =
        state.toDoList.find((task) => task.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTasks.fulfilled, (state, action) => {
        state.toDoList = action.payload;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.toDoList = state.toDoList.filter(
          (task) => task.id !== action.meta.arg
        );
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.toDoList.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const postIndex = state.toDoList.findIndex(
          (post) => post.id === state.editing?.id
        );
        if (postIndex !== -1) {
          state.toDoList[postIndex] = {
            ...state.editing,
            ...action.payload,
          };
        }
        state.editing = null;
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId; //requestId la gia tri duy nhat cua request
        }
      )
      
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )

      .addDefaultCase((state) => {
        console.log(current(state));
      });
  },
});

export const { startEditing, resetEditing } = toDoSlice.actions;

const toDoReducer = toDoSlice.reducer;

export default toDoReducer;
