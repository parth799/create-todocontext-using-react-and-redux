/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addColumn } from '../redux/columnSlice';
import { toast } from 'react-toastify';

function AddColumnForm({ onClose }) {
  const [columnName, setColumnName] = useState('');
  const [type, setType] = useState('string');
  const [primary, setPrimary] = useState('noneprimary');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAddColumn = () => {
    if (!columnName.trim()) {
      setError('Column Name cannot be empty');
      return;
    }

    if (!type.trim()) {
      setError('Type must be selected');
      return;
    }
    setError('');
    dispatch(addColumn({ columnName, type, primary }));
    toast.success('Column added successfully')
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Column</h2>
        {error && (
          <div className="text-red-500">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Column Name</label>
          <input
            type="text"
            placeholder="Column Name"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Primary</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="primary"
                checked={primary === 'primary'}
                onChange={() => setPrimary('primary')}
                className="mr-2"
              />
              Primary
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="noneprimary"
                checked={primary === 'noneprimary'}
                onChange={() => setPrimary('noneprimary')}
                className="mr-2"
              />
              None Primary
            </label>
          </div>
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="number">number</option>
            <option value="string">String</option>
          </select>
        </div>
        
        <div className="flex justify-between">
          
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancle
          </button>
          <button
            onClick={handleAddColumn}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddColumnForm;
