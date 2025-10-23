import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Async thunks
export const startSession = createAsyncThunk(
  'session/startSession',
  async (sessionData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/session/start', sessionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to start session');
    }
  }
);

export const endSession = createAsyncThunk(
  'session/endSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/session/end', { sessionId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to end session');
    }
  }
);

export const getStats = createAsyncThunk(
  'session/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/session/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get stats');
    }
  }
);

export const getPastSessions = createAsyncThunk(
  'session/getPastSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/session/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get past sessions');
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    currentSession: null,
    stats: [],
    pastSessions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSession: (state) => {
      state.currentSession = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Start Session
      .addCase(startSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
        state.error = null;
      })
      .addCase(startSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // End Session
      .addCase(endSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = null;
        state.error = null;
      })
      .addCase(endSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Stats
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Past Sessions
      .addCase(getPastSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPastSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.pastSessions = action.payload;
        state.error = null;
      })
      .addCase(getPastSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentSession } = sessionSlice.actions;
export default sessionSlice.reducer;
