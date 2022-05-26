import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emailService from "./emailService";

const initialState = {
  verified: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const verifyEmail = createAsyncThunk(
  "email/verifyEmail",
  async (token, thunkAPI) => {
    try {
      return await emailService.verifyEmail(token);
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


export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //signUp Builder
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.verified = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.verified = false;
      })
  
      
    
     
   
  },
});

export const { reset } = emailSlice.actions;
export default emailSlice.reducer;
