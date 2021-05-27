import { useEffect, useState } from "react";
import raw from "./genre.txt";

function LabelInfo({ label, setlabel, disabled }) {
  const [genre1, setgenre1] = useState([]);
  const [select, setselct] = useState([]);

  useEffect(() => {
    if (disabled) return;
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        var a = [];
        text = text.split("\n");
        text.forEach((t) => {
          a.push(t);
        });
        setgenre1(a);
      });
  }, []);

  function handleGenre(genre) {
    if (!select.includes(genre)) setselct([...select, genre]);

    setlabel({ ...label, genre: select });
  }

  function handleCutGenre(genre) {
    setselct(select.filter((gen) => gen !== genre));
  }

  return (
    <div className="lg:my-4 lg:mx-10 p-5 bg-white">
      <h2 className=" py-10 mb-5 border-b text-xl font-semibold">Info</h2>
      <div className="">
        <p className="text-lg my-3 font-semibold">
          Official Label name <span className="px-1 text-red-600">*</span>
        </p>
        <input
          type="text"
          disabled={disabled}
          defaultValue={label?.label}
          onChange={(e) => setlabel({ ...label, label: e.target.value })}
          placeholder="Label Name"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Genres</p>
        <div className="m-3">
          {select.map((sel) => (
            <span
              className="h-14 px-3 py-2 bg-indigo-500 m-2 text-white rounded"
              onClick={() => handleCutGenre(sel)}
            >
              {sel}
            </span>
          ))}
        </div>
        <div className="">
          {label?.genre ? (
            <div className="p-2">
              {label.genre.map((sel) => (
                <span className="h-14 px-3 py-2 bg-indigo-500 m-2 text-white rounded">
                  {sel}
                </span>
              ))}
            </div>
          ) : null}
          <select
            type="text"
            disabled={disabled}
            onChange={(e) => handleGenre(e.target.value)}
            placeholder="Add genres you will be delivering"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          >
            {genre1.map((genre, index) => (
              <option value={genre} key={index}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Location</p>
        <input
          type="text"
          disabled={disabled}
          defaultValue={label?.location}
          onChange={(e) => setlabel({ ...label, location: e.target.value })}
          placeholder="Enter your Location"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Contact Email(Private)</p>
        <input
          type="text"
          disabled={disabled}
          defaultValue={label?.email}
          onChange={(e) => setlabel({ ...label, email: e.target.value })}
          placeholder="Enter Valid Email"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Contact Phone(Private)</p>
        <input
          type="text"
          disabled={disabled}
          defaultValue={label?.phone}
          onChange={(e) => setlabel({ ...label, phone: e.target.value })}
          placeholder="xxx-xxx-xxxx"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Payee ID (Optional)</p>
        <input
          type="text"
          disabled={disabled}
          defaultValue={label?.payee}
          onChange={(e) => setlabel({ ...label, payee: e.target.value })}
          placeholder="PayPal / UPI ID"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Royalty Sharing(Optional)</p>
        <input
          type="text"
          disabled={disabled}
          defaultValue={label?.share}
          onChange={(e) => setlabel({ ...label, share: e.target.value })}
          placeholder="Royalty Sharing"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
    </div>
  );
}

export default LabelInfo;
