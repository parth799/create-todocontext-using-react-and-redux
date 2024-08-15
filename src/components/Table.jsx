/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRows, setColumns } from "../redux/columnSlice";
import { MdDelete } from "react-icons/md";
import EditRowForm from "./EditRowForm";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Table({ onAddRowClick }) {
  const [EditRowFormVisible, setEditRowFormVisible] = useState(null);
  const columns = useSelector((state) => state.columns.columns);
  const rows = useSelector((state) => state.columns.rows);
  const dispatch = useDispatch();

  if (!columns || columns.length === 0) {
    return (
      <div className="text-center">
        No columns available. Please add a column.
      </div>
    );
  }

  const handleDeleteRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    dispatch(setRows(updatedRows));
    localStorage.setItem("rows", JSON.stringify(updatedRows));
    toast.success("Row deleted successfully!");
  };

  const handleDeleteColuman = (columnIndex) => {
    const updatedColumns = columns.filter((_, index) => index !== columnIndex);
    dispatch(setColumns(updatedColumns));
    localStorage.setItem("columns", JSON.stringify(updatedColumns));

    const updatedRows = rows.map((row) => {
      const newRow = { ...row };
      delete newRow[columns[columnIndex].columnName];
      return newRow;
    });
    dispatch(setRows(updatedRows));
    localStorage.setItem("rows", JSON.stringify(updatedRows));
  };

  const handleEditRow = (rowIndex) => {
    setEditRowFormVisible(rowIndex);
  };

  const handleCloseEditForm = () => {
    setEditRowFormVisible(null);
  };

  return (
    <div className="overflow-x-auto p-4">
      <ToastContainer />
      <table className="min-w-full bg-white border">
        <thead className=" text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-4  text-black border-b">
                {column.columnName}
                {column.primary === "noneprimary" && (
                  <MdDelete
                    onClick={() => handleDeleteColuman(index)}
                    className="inline ml-2 cursor-pointer"
                  />
                )}
              </th>
            ))}
            <th className="py-2 px-4 text-black border-b text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="py-2 px-4 text-center hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.columnName} className="py-2 px-4 border-b">
                  {row[column.columnName] || "--"}
                </td>
              ))}
              <td className="py-2 px-4 border-b flex gap-4 justify-center">
                <button
                  onClick={() => handleEditRow(index)}
                  className="bg-green-500 text-white py-1 px-2 rounded "
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {EditRowFormVisible !== null && (
        <EditRowForm
          rowIndex={EditRowFormVisible}
          onClose={handleCloseEditForm}
        />
      )}
    </div>
  );
}

export default Table;
