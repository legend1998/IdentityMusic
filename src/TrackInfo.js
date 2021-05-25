import AWN from "awesome-notifications";
import React, { useEffect, useState } from "react";
import { firedb, storage } from "./firebaseconfig";
import KeyArtist from "./utis/KeyArtist";
import raw from "./languageList.txt";

function TrackInfo({ track, close, index, albumid, data, artist }) {
  const [keyartist, setkeyartist] = useState(0);
  const [ownisrc, setownisrc] = useState(0);
  const [lyrics, setlyrics] = useState(false);
  const [newtrack, setnewtrack] = useState({});
  const [progress, setprogress] = useState(0);
  const [language, setlanguage] = useState([]);
  const [select, setselect] = useState([]);
  const [sideartist, setsideartist] = useState([]);

  useEffect(() => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        var a = [];
        text = text.split("\n");
        text.forEach((t) => {
          a.push(t);
        });
        setlanguage(a);
      });
  }, []);

  function handleclose() {
    if (data?.submitted) {
      close(track - 1);
    }
  }

  const musciupload = (e) => {
    var image = e.target.files[0];
    if (!image) {
      new AWN().alert("no  file selected", { position: "bottom-right" });
      return;
    }

    var storageRef = storage.ref();
    var uploadtask = storageRef
      .child(`music/${image.name + Date.now()}`)
      .put(image);

    uploadtask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progress);
      },
      (error) => {
        new AWN().alert(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadtask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setnewtrack({ ...newtrack, trackURL: downloadURL });
        });
      }
    );
  };

  console.log(newtrack);

  function getartist(secondaryartist) {
    if (data?.submitted) {
      return;
    }
    setsideartist([...sideartist, secondaryartist]);
    setnewtrack({ ...newtrack, artist: [...sideartist, secondaryartist] });
  }

  function savemusicTRack() {
    if (data?.submitted) {
      new AWN().info("already submitted");
      return;
    }
    if (Object.keys(newtrack).length < 7) {
      new AWN().alert("fill all fields");
      return;
    }

    firedb
      .collection("album")
      .doc(albumid)
      .collection("tracks")
      .add({ ...newtrack, submitted: true })
      .then((res) => {
        new AWN().success("success");
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  function handleartist(string) {
    if (string === "default") return;
    if (!select.includes(string)) {
      setselect([...select, string]);
      setnewtrack({ ...newtrack, mainArtist: select });
    }
  }
  function handleCutGenre(string) {
    setselect(select.filter((gen) => gen !== string));
    setnewtrack({ ...newtrack, mainArtist: select });
  }

  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <div className="flex items-center justify-between border-b">
        <p className="text-xl py-3 mb-1">Track ({index + 1}) </p>
        <p className="text-sm">Singer</p>
        <span
          onClick={() => handleclose()}
          className="h-10 w-10 rounded-full border flex items-center justify-center"
        >
          <i className="fas fa-times text-red-500"></i>
        </span>
      </div>
      <p className="text-lg mt-5">Audio File</p>
      {newtrack?.trackURL || data?.trackURL || progress > 0 ? (
        <div className="h-10 w-full">
          <div className="h-full bg-indigo-500 text-white text-center py-2">
            {progress > 0
              ? Math.floor(progress) + "%"
              : "Track has been uploaded Successfully"}
          </div>
        </div>
      ) : (
        <div className="border h-12">
          <label
            htmlFor="audio-file"
            className="w-full h-full bg-gray-100 flex items-center"
          >
            <p className="pl-5 text-gray-400">
              Upload your files here (stereo mp3 files only sample rate :44.1
              KHz)
            </p>
            <input
              id="audio-file"
              type="file"
              disabled={data?.submitted}
              onChange={(e) => musciupload(e)}
              accept="audio/"
              className="hidden"
              placeholder=""
            />
          </label>
        </div>
      )}
      <div className="grid grid-rows-2  mt-5">
        <p className="text-lg">
          Language of Lyrics
          <span className="mx-5 text-xs text-gray-400">
            (Select "instrumental" if no lyrics present there.)
          </span>
        </p>
        <select
          disabled={data?.submitted}
          defaultValue={data?.lyricLanguage}
          className="appearance-none focus:outline-none w-full h-12 bg-gray-100 "
          onChange={(e) =>
            setnewtrack({ ...newtrack, lyricLanguage: e.target.value })
          }
          name=""
          id=""
        >
          {language.map((lang, index) => (
            <option className="capitalize" value={lang} key={index}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-6 my-5">
        <div className="col">
          <p className="text-lg">Release Title</p>
          <input
            type="text"
            defaultValue={data?.releaseTitle}
            disabled={data?.submitted}
            onChange={(e) =>
              setnewtrack({ ...newtrack, releaseTitle: e.target.value })
            }
            placeholder="Eg: Song Name"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
        <div className="col">
          <p className="text-lg">Title Version</p>
          <input
            type="text"
            defaultValue={data?.titleVersion}
            disabled={data?.submitted}
            onChange={(e) =>
              setnewtrack({ ...newtrack, titleVersion: e.target.value })
            }
            placeholder="Eg: Live,Radio Edit"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
      </div>
      <div className="grid grid-rows-2  mt-5">
        <p className="text-lg">Artist (Indicate only one in this field) *</p>
        <div className="p-3">
          {select.map((sel) => (
            <span
              className="h-14 px-3 py-2 bg-indigo-500 m-2 text-white rounded"
              onClick={() => handleCutGenre(sel)}
            >
              {sel}
            </span>
          ))}
        </div>
        <select
          type="text"
          placeholder="Artist Name"
          defaultValue={newtrack?.singer}
          onChange={(e) => handleartist(e.target.value)}
          className="h-12 mx-5 px-5 mt-2 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        >
          <option value="default" defaultChecked>
            default
          </option>
          {artist.map((art, index) => (
            <option value={art.name} key={index}>
              {art.name}
            </option>
          ))}
        </select>
      </div>
      {Array.from(Array(keyartist)).map((data, index) => (
        <KeyArtist
          close={setkeyartist}
          keyartist={keyartist}
          key={index}
          addArtist={getartist}
        />
      ))}

      <button
        onClick={() => (data?.submitted ? null : setkeyartist(keyartist + 1))}
        className="text-purple-900 py-3 focus:outline-none"
      >
        <i className="fas fa-plus"></i> Add other Artist and Contributors.
      </button>
      <div className="grid grid-flow-col grid-rows-1 grid-cols-2 my-5 gap-5">
        <div>
          <p className="text-md">Do you already have your own ISRC code?</p>
          <div className="py-5    flex items-center justify-between">
            <label>
              <input
                type="radio"
                name="ownupc"
                onChange={() => setownisrc(1)}
              />
              Yes(required if previously released = yes above)
            </label>
            <label>
              <input
                type="radio"
                name="ownupc"
                onChange={() => setownisrc(0)}
              />
              No
            </label>
          </div>
          <p className={ownisrc ? "hidden" : "text-sm text-gray-600"}>
            OK, We'll generate one for you when we send your Release.
          </p>
        </div>
        <div className={ownisrc ? "block" : "hidden"}>
          <p className="text-xl">ISRC *</p>
          <input
            type="text "
            defaultValue={data?.isrc}
            onChange={(e) => setnewtrack({ ...newtrack, isrc: e.target.value })}
            placeholder="isrc"
            required
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border border-red-700"
          />
        </div>
      </div>
      <div>
        <p className="text-lg">Explicit Lyrics? </p>
        <div className="my-5">
          <label htmlFor="">
            <input type="radio" name="el" defaultChecked />
            No
          </label>
          <label className="ml-10">
            <input type="radio" name="el" />
            Yes
          </label>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="cursor-pointer border-t py-4 text-lg ">
          CRBT (Caller Ring Back Tunes)
        </h1>
        <input
          type="time"
          defaultValue={data?.crbt}
          onChange={(e) => setnewtrack({ ...newtrack, crbt: e.target.value })}
          className="px-3 h-14 w-44 border bg-gray-100 text-gray-700 appearance-none focus:outline-none "
        />
      </div>
      <div className="mt-5">
        <h3
          className="cursor-pointer border-t py-4 text-lg "
          onClick={() => setlyrics(!lyrics)}
        >
          <i className="fas fa-caret-right"></i> Lyrics (optional)
        </h3>
        <textarea
          name="lyrics"
          defaultValue={data?.lyrics}
          onChange={(e) => setnewtrack({ ...newtrack, lyrics: e.target.value })}
          className={
            lyrics
              ? "border w-full h-64 focus:outline-none p-5 bg-gray-50 text-sm"
              : "hidden"
          }
        ></textarea>
        <button
          className="h-14 w-44 bg-indigo-500 text-white p-3 focus:outline-none"
          onClick={() => savemusicTRack()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default TrackInfo;
