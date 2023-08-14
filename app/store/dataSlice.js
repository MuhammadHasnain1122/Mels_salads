import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk('data/fetchItems', async () => {
  const response = await fetch('/api/resource');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    // ... other initial state properties
  },
  reducers: {
    // ... other reducers
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    // ... other cases
  },
});

export default dataSlice.reducer;
