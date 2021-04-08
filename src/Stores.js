import React, { useState } from "react";

function Stores() {
  const [checkall, setcheckall] = useState(false);

  return (
    <div className="lg:p-10 p-2 bg-gray-100">
      <table className="table-fixed w-full bg-white font-sans text-center">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-3/12 ">select</th>
            <th className=" w-8/12">Store</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input type="checkbox" readOnly className="w-6 h-6" />
            </td>
            <td>Spotify</td>
          </tr>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input type="checkbox" readOnly className="w-6 h-6" />
            </td>
            <td>Spotify</td>
          </tr>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input type="checkbox" readOnly className="w-6 h-6" />
            </td>
            <td>Spotify</td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full bg-white font-sans text-center my-5">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-3/12 ">select</th>
            <th className=" w-8/12 capitalize">telecom partneres</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => setcheckall(!checkall)}
              />
            </td>
            <td>Jio</td>
          </tr>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => setcheckall(!checkall)}
              />
            </td>
            <td>Airtel</td>
          </tr>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input
                class="ios_toggle"
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => setcheckall(!checkall)}
              />
            </td>
            <td>VI</td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full bg-white font-sans text-center my-5  ">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-3/12 ">select</th>
            <th className=" w-8/12">Youtube</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input type="checkbox" className="w-6 h-6" />
            </td>
            <td className=" capitalize"> youtube content id</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Stores;
