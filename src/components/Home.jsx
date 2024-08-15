import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import AddColumnForm from "./AddColumnForm";
import AddRowForm from "./AddRowForm";
import Table from "./Table";
import { setColumns, setRows } from "../redux/columnSlice";

function Home() {
  const [isAddColumnFormVisible, setAddColumnFormVisible] = useState(false);
  const [isAddRowFormVisible, setAddRowFormVisible] = useState(false);
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns.columns);
  const rows = useSelector((state) => state.columns.rows);
  // console.log(">>>>>>>>>>", columns, rows);

  useEffect(() => {
    const storedColumns = JSON.parse(localStorage.getItem("columns"));
    const storedRows = JSON.parse(localStorage.getItem("rows"));
    dispatch(setColumns(storedColumns));
    dispatch(setRows(storedRows));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [columns, rows]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar onAddColumnClick={() => setAddColumnFormVisible(true)} />
      <div className="flex-grow">
        {isAddColumnFormVisible && (
          <AddColumnForm onClose={() => setAddColumnFormVisible(false)} />
        )}
        {isAddRowFormVisible && (
          <AddRowForm onClose={() => setAddRowFormVisible(false)} />
        )}
        <Table onAddRowClick={() => setAddRowFormVisible(true)} />
      </div>
      <button
        onClick={() => setAddRowFormVisible(true)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg self-center "
      >
        Add Row
      </button>
    </div>
  );
}

export default Home;
