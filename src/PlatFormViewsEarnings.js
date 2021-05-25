import React from "react";

function PlatFormViewsEarnings({ data }) {
  return (
    <div className="bg-white">
      <h1 className="border-b pt-2 py-2 text-lg font-medium  text-center ">
        Detailed Reports
      </h1>
      <div className="flex bg-white p-4 items-center justify-center">
        <table className="table-fixed p-5 font-medium w-full capitalize text-left">
          <thead>
            <tr className="border-b text-center justify-items-center">
              <th className="w-1/6">Serial No.</th>
              <th className="w-2/6">Platform</th>
              <th className="w-2/6">Views</th>
              <th className="w-1/6">Earning</th>
            </tr>
          </thead>
          <tbody className="text-center font-medium justify-items-center">
            {data.map((d, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{d.platform}</td>
                <td>{d.views}</td>
                <td>₹ {d.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 ? (
        <div className="w-full h-56 flex items-center justify-center">
          <p className="text-sm text-gray-500">
            You are expecting Stats so early.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default PlatFormViewsEarnings;
