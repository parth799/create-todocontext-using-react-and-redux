import { configureStore } from '@reduxjs/toolkit';
import columnReducer from './columnSlice';

const store = configureStore({
  reducer: {
    columns: columnReducer,
  },
});

export default store;
