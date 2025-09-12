import React, { useState } from "react";
import {
  Trash2,
  CheckCircle,
  XCircle,
  PlusCircle,
  Edit3,
  Save,
} from "lucide-react";

const ManageTables = () => {
  const [tables, setTables] = useState([
    { id: 1, number: "T1", seats: 4, status: "Available", isEditing: false },
    { id: 2, number: "T2", seats: 2, status: "Occupied", isEditing: false },
    { id: 3, number: "T3", seats: 6, status: "Available", isEditing: false },
  ]);

  const addTable = () => {
    const newId = tables.length + 1;
    setTables([
      ...tables,
      {
        id: newId,
        number: `T${newId}`,
        seats: 4,
        status: "Available",
        isEditing: false,
      },
    ]);
  };

  const deleteTable = (id) => {
    setTables(tables.filter((t) => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTables(
      tables.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Available" ? "Occupied" : "Available" }
          : t
      )
    );
  };

  const handleSeatChange = (id, value) => {
    setTables(
      tables.map((t) =>
        t.id === id ? { ...t, seats: Number(value) || 0 } : t
      )
    );
  };

  const toggleEdit = (id) => {
    setTables(
      tables.map((t) =>
        t.id === id ? { ...t, isEditing: !t.isEditing } : t
      )
    );
  };

  const summary = {
    total: tables.length,
    occupied: tables.filter((t) => t.status === "Occupied").length,
    available: tables.filter((t) => t.status === "Available").length,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Manage Tables
      </h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Total Tables
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {summary.total}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Available
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {summary.available}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Occupied
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {summary.occupied}
          </p>
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Table List
          </h2>
          <button
            onClick={addTable}
            className="bg-gray-700 hover:bg-gray-900 text-white px-3 md:px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
          >
            <PlusCircle size={18} /> Add Table
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm md:text-base">
                <th className="p-2 md:p-3">Table</th>
                <th className="p-2 md:p-3">Seats</th>
                <th className="p-2 md:p-3">Status</th>
                <th className="p-2 md:p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr
                  key={table.id}
                  className="hover:bg-gray-100 transition border-b border-gray-200"
                >
                  <td className="p-2 md:p-3 font-medium">{table.number}</td>
                  <td className="p-2 md:p-3">
                    {table.isEditing ? (
                      <input
                        type="number"
                        min="1"
                        value={table.seats}
                        onChange={(e) =>
                          handleSeatChange(table.id, e.target.value)
                        }
                        className="w-16 md:w-20 p-2 border rounded-md"
                      />
                    ) : (
                      table.seats
                    )}
                  </td>
                  <td
                    className={`p-2 md:p-3 font-semibold ${
                      table.status === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {table.status}
                  </td>
                  <td className="p-2 md:p-3 flex gap-2 md:gap-3 flex-wrap">
                    <button
                      onClick={() => toggleEdit(table.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-2 md:px-3 py-2 rounded-xl shadow-md flex items-center gap-1 md:gap-2 text-sm md:text-base"
                    >
                      {table.isEditing ? (
                        <>
                          <Save size={16} /> Save
                        </>
                      ) : (
                        <>
                          <Edit3 size={16} /> Edit
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => toggleStatus(table.id)}
                      className={`rounded-xl px-2 md:px-3 py-2 shadow-md flex items-center gap-1 md:gap-2 text-white text-sm md:text-base ${
                        table.status === "Available"
                          ? "bg-red-500 hover:bg-red-700"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                    >
                      {table.status === "Available" ? (
                        <>
                          <XCircle size={16} /> Mark Occupied
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} /> Mark Available
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => deleteTable(table.id)}
                      className="bg-gray-500 hover:bg-gray-700 text-white px-2 md:px-3 py-2 rounded-xl shadow-md flex items-center gap-1 md:gap-2 text-sm md:text-base"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTables;
