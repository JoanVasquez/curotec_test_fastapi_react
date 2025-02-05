// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/userService';

// Define the initial state for user-related data.
const initialState = {
  user: null,       // Stores authenticated user data or data fetched via getUserById.
  status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk for user registration.
export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await userService.registerUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for confirming user registration.
export const confirmUserRegistrationThunk = createAsyncThunk(
  'user/confirmRegistration',
  async (data, thunkAPI) => {
    try {
      const response = await userService.confirmUserRegistration(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for authenticating a user.
export const authenticateUserThunk = createAsyncThunk(
  'user/authenticate',
  async (credentials, thunkAPI) => {
    try {
      const response = await userService.authenticateUser(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for initiating a password reset.
export const initiatePasswordResetThunk = createAsyncThunk(
  'user/initiatePasswordReset',
  async (email, thunkAPI) => {
    try {
      const response = await userService.initiatePasswordReset(email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for completing a password reset.
export const completePasswordResetThunk = createAsyncThunk(
  'user/completePasswordReset',
  async (data, thunkAPI) => {
    try {
      const response = await userService.completePasswordReset(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for retrieving a user by their ID.
export const getUserByIdThunk = createAsyncThunk(
  'user/getUserById',
  async (id, thunkAPI) => {
    try {
      const response = await userService.getUserById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for updating a user's information.
export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await userService.updateUser(id, updateData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Synchronous reducers.
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Confirm Registration
    builder
      .addCase(confirmUserRegistrationThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(confirmUserRegistrationThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally update user or add additional state based on confirmation response.
        state.user = action.payload;
      })
      .addCase(confirmUserRegistrationThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Authenticate User
    builder
      .addCase(authenticateUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authenticateUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(authenticateUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Initiate Password Reset
    builder
      .addCase(initiatePasswordResetThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(initiatePasswordResetThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // You may store a flag or message from the response if needed.
      })
      .addCase(initiatePasswordResetThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Complete Password Reset
    builder
      .addCase(completePasswordResetThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(completePasswordResetThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally update user info if the API returns it.
        state.user = action.payload;
      })
      .addCase(completePasswordResetThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Get User By ID
    builder
      .addCase(getUserByIdThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Store the retrieved user data.
        state.user = action.payload;
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Update User
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the user information based on API response.
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

// Export synchronous actions for use in components.
export const { clearError, logout } = userSlice.actions;

// Export the reducer to include in your store.
export default userSlice.reducer;
