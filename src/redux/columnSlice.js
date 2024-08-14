import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const columnSlice = createSlice({
  name: 'columns',
  initialState: {
    columns: loadFromLocalStorage('columns') || [], 
    rows: loadFromLocalStorage('rows') || [],        
  },
  reducers: {
    addColumn: (state, action) => {
      state.columns.push(action.payload);
      saveToLocalStorage('columns', state.columns);     
     },
    addRow: (state, action) => {
      state.rows.push(action.payload);
      saveToLocalStorage('rows', state.rows);       
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
      saveToLocalStorage('columns', state.columns); 
    },
    setRows: (state, action) => {
      state.rows = action.payload;
      saveToLocalStorage('rows', state.rows);       
    },
  },
});

export const { addColumn, addRow, setColumns, setRows } = columnSlice.actions;

export default columnSlice.reducer;
