/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRow } from '../redux/columnSlice';
import { toast } from 'react-toastify';

function AddRowForm({ onClose }) {
  const columns = useSelector((state) => state.columns.columns);
  const [rowData, setRowData] = useState({});
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  console.log("<<<<<<", columns);

  const validateInput = (column, value) => {
    let isValid = true;
    let errorMessage = '';

    if (!value) {
      isValid = false;
      errorMessage = 'This field is required.';
    } else if (column.type === 'number' && !/^\d+$/.test(value)) {
      isValid = false;
      errorMessage = 'This field should be a number.';
    } else if (column.type === 'text' && !/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value)) {
      isValid = false;
      errorMessage = 'This field should contain both letters and numbers.';
    }

    setError((prevErrors) => ({
      ...prevErrors, [column.columnName]: errorMessage
    }));
    return isValid;
  };

  const handleInputChange = (columnName, value) => {
    const column = columns.find((col) => col.columnName === columnName);
    if (validateInput(column, value)) {
      setRowData({ ...rowData, [columnName]: value });
    } else {
      setRowData((prevData) => {
        const newData = { ...prevData };
        delete newData[columnName];
        return newData;
      });
    }
  };

  const handleAddRow = () => {
    const newErrors = {};
    let hasError = false;

    columns.forEach((column) => {
      if (!rowData[column.columnName]) {
        newErrors[column.columnName] = 'This field is required.';
        hasError = true;
      }
    });

    setError(newErrors);

    if (hasError) {
      toast.error('Please fix validation errors before submitting.');
      return;
    }

    dispatch(addRow(rowData));
    toast.success('Row added successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add data</h2>
        {columns.map((column, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2">{column.columnName}</label>
            <input
              type={column.type === 'number' ? 'number' : 'text'}
              onChange={(e) => handleInputChange(column.columnName, e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error[column.columnName] && (
              <p className="text-red-500 text-sm">{error[column.columnName]}</p>
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
            onClick={handleAddRow}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRowForm;
