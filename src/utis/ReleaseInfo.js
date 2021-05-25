import React, { useEffect, useState } from "react";
import raw from "../genre.txt";
import raw2 from "../genre2.txt";

function ReleaseInfo({ somefun, album }) {
  const [ownupc, setownupc] = useState(0);
  const [preRel, setpreRel] = useState(false);
  const [genre1, setgenre1] = useState([]);
  const [genre2, setgenre2] = useState([]);
  const [recLabel, setrecLabel] = useState(false);

  useEffect(() => {
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
    fetch(raw2)
      .then((r) => r.text())
      .then((text) => {
        var a = [];
        text = text.split("\n");
        text.forEach((t) => {
          a.push(t);
        });
        setgenre2(a);
      });
  }, []);

  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <p className="px-5 text-xl border-b py-3 mb-5">Info</p>

      <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-5 ">
        <div className="">
          <p className="px-5 text-md font-semibold">Genre 1</p>
          <select
            name="genre1  "
            defaultValue={album?.genre1}
            disabled={album?.info ? true : false}
            onChange={(e) => somefun({ ...album, genre1: e.target.value })}
            className="h-12 w-full text-center bg-gray-100 focus:outline-none "
          >
            {genre1.map((genre, index) => (
              <option className="capitalize " value={genre} key={index}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <p className="px-5 text-md font-semibold"> (P) Copyright </p>
          <input
            type="text"
            defaultValue={album?.pCopyright}
            disabled={album?.info ? true : false}
            onChange={(e) => somefun({ ...album, pCopyright: e.target.value })}
            placeholder="2021 Label Name"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
        <div className="">
          <p className="px-5 text-md font-semibold">Genre 2</p>
          <select
            name="gene2"
            defaultValue={album?.genre2}
            disabled={album?.info ? true : false}
            className="h-12 w-full text-center bg-gray-100"
            onChange={(e) => somefun({ ...album, genre2: e.target.value })}
          >
            {genre2.map((genre, index) => (
              <option className="capitalize" value={genre} key={index}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <p className="px-5 text-md  font-semibold">(C) Copyright</p>
          <input
            type="text"
            placeholder="2021 Label Name"
            defaultValue={album?.Ccopyright}
            disabled={album?.info ? true : false}
            onChange={(e) => somefun({ ...album, Ccopyright: e.target.value })}
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
      </div>
      <p className="px-5 text-md mt-5 font-semibold">
        Previously released? / Schedule Release
      </p>
      <p className="text-sm text-red-500   mx-5 mb-3">
        Selecting "NO" will make release available on store as soon as it gets
        approve. If your release is exclusive please select a release date date.
      </p>
      <div className="grid grid-cols-2 gap-8">
        <div className="px-5">
          <label>
            <input
              type="radio"
              name="preleased"
              onChange={() => {
                setpreRel(true);
                setownupc(1);
              }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="preleased"
              className="ml-8"
              onChange={() => {
                setpreRel(false);
                setownupc(0);
              }}
            />
            No
          </label>
        </div>
        <div className={preRel ? "block" : "hidden"}>
          <input
            type="date"
            defaultValue={album?.releaseDate}
            disabled={album?.info ? true : false}
            onChange={(e) => somefun({ ...album, releaseDate: e.target.value })}
            placeholder="Previously release date"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
      </div>
      <p className="px-5 text-md font-semibold mt-3">On a record Label</p>
      <div className="grid grid-cols-2">
        <div className="px-5 py-2">
          <label>
            <input
              type="radio"
              name="recordlabel"
              onChange={() => setrecLabel(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="recordlabel"
              className="ml-8"
              onChange={() => setrecLabel(false)}
            />
            No
          </label>
        </div>
        <div className={recLabel ? "block" : "hidden"}>
          <select
            placeholder=""
            defaultValue={album?.recordLabel}
            disabled={album?.info ? true : false}
            onChange={(e) => somefun({ ...album, recordLabel: e.target.value })}
            className="h-12 px-5 w-full my-2 bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          >
            <option value="default" defaultValue>
              --select--
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-1 grid-cols-2">
        <div>
          <p className="px-5 text-md font-semibold">
            Do you already have a UPC/EAN?
          </p>
          <div className="px-5 py-3">
            <label>
              <input
                type="radio"
                name="ownupc"
                checked={ownupc}
                onChange={() => setownupc(1)}
              />
              Yes(required if previously released = yes above)
            </label>
            <label>
              <input
                type="radio"
                name="ownupc"
                className="ml-8"
                checked={!ownupc}
                onChange={() => setownupc(0)}
              />
              No
            </label>
          </div>
          <p className={ownupc ? "hidden" : "text-sm text-gray-600 mx-5"}>
            OK, we'll generate one for you when we send your release.
          </p>
        </div>
        <div className={ownupc ? "block" : "hidden"}>
          <input
            type="text "
            placeholder="xxxxxxxxxxxx"
            defaultValue={album?.upcEan}
            disabled={album?.info ? true : false}
            required
            onChange={(e) => somefun({ ...album, upcEan: e.target.value })}
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border border-red-700"
          />
        </div>
      </div>
    </div>
  );
}

export default ReleaseInfo;
