/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRows } from '../redux/columnSlice';
import { toast } from 'react-toastify';

function EditRowForm({ rowIndex, onClose }) {
  const columns = useSelector((state) => state.columns.columns);
  const rows = useSelector((state) => state.columns.rows);
  const [rowData, setRowData] = useState(rows[rowIndex]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateInput = (column, value) => {
    let isValid = true;
    let errorMessage = '';

    if (column.type === 'string') {
      if (!/^[a-zA-Z]+$/.test(value)) {
        isValid = false;
        errorMessage = '0nly letters are allowed for this column.';
      }
    } else if (column.type === 'number') {
      if (!/^\d+$/.test(value)) {
        isValid = false;
        errorMessage = 'numbers are allowed for this column.';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [column.columnName]: errorMessage,
    }));

    return isValid;
  };

  const handleInputChange = (columnName, value) => {
    const column = columns.find((col) => col.columnName === columnName);
    if (validateInput(column, value)) {
      setRowData({ ...rowData, [columnName]: value });
    }
  };

  const handleSaveRow = () => {
    if (Object.values(errors).some((error) => error)) {
      toast.error('Please fix validation errors before saving.');
      return;
    }
    const updatedRows = rows.map((row, index) => 
      index === rowIndex ? rowData : row
    );
    dispatch(setRows(updatedRows));
    localStorage.setItem('rows', JSON.stringify(updatedRows));
    toast.success('Rows saved successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Row</h2>
        {columns.map((column, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2">{column.columnName}</label>
            <input
              type={column.type === 'number' ? 'number' : 'text'}
              value={rowData[column.columnName] || ''}
              onChange={(e) => handleInputChange(column.columnName, e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[column.columnName] && (
              <p className="text-red-500 text-sm">{errors[column.columnName]}</p>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveRow}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRowForm;
