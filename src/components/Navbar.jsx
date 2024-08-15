/* eslint-disable react/prop-types */
// import React from 'react';

import { toast } from "react-toastify";

function Navbar({ onAddColumnClick }) {
  const removetable = () => {
    localStorage.clear();
    window.location.reload();
    toast.success("table has been deleted!");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Table</h1>
      <div className="flex gap-1">
        <button
          onClick={removetable}
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Remove table
        </button>
        <button
          onClick={onAddColumnClick}
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Add Column
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
