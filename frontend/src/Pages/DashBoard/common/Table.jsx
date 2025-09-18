import React from "react";
import Spinner from "./Spinner";

export default function Table({ columns = [], loading = false, children }) {
  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-700"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}