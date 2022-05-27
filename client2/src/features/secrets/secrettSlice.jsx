import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import secretService from "./secretService";

const initialState = {
  secrets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new secret
export const createSecret = createAsyncThunk(
  "secrets/create",
  async ({values, userName}, thunkAPI) => {
    try {
    
      return await secretService.createSecret({values, userName});
     
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user secrets
export const getSecrets = createAsyncThunk(
  "secrets/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await secretService.getSecrets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);





export const secretSlice = createSlice({
  name: "secret",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSecret.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSecret.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.secrets.push(action.payload);
      })
      .addCase(createSecret.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSecrets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSecrets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.secrets = action.payload;
      })
      .addCase(getSecrets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = secretSlice.actions;
export default secretSlice.reducer;
