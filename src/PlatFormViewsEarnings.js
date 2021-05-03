import React from "react";

function PlatFormViewsEarnings({ data }) {
  return (
    <div className="flex items-center justify-center">
      <table className="table-fixed p-5 w-full capitalize text-left">
        <thead>
          <tr>
            <th className="w-1/6">SL NO.</th>
            <th className="w-2/6">Platform</th>
            <th className="w-2/6">Views</th>
            <th className="w-1/6">Earning</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{d.platform}</td>
              <td>{d.views}</td>
              <td>{d.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlatFormViewsEarnings;
