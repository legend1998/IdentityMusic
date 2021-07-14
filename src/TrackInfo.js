import AWN from "awesome-notifications";
import React, { useEffect, useState } from "react";
import { firedb, storage } from "./firebaseconfig";
import KeyArtist from "./utis/KeyArtist";
import raw from "./languageList.txt";
import { useStateValue } from "./StateProvider";

function TrackInfo({ track, close, index, albumid, data, artist, somefun }) {
  const [keyartist, setkeyartist] = useState(0);
  const [ownisrc, setownisrc] = useState(0);
  const [lyrics, setlyrics] = useState(false);
  const [additional, setadditional] = useState(false);
  const [newtrack, setnewtrack] = useState({});
  const [progress, setprogress] = useState(0);
  const [language, setlanguage] = useState([]);
  const [select, setselect] = useState([]);
  const [sideartist, setsideartist] = useState([]);
  const [{ user }] = useStateValue();

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
      .child(`music/${Date.now() + user.labelName + " - " + image.name}`)
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

  function getartist({ secondaryartist }) {
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
        <p className="text-2xl py-3 mb-1">Track ({index + 1}) </p>
        <p className="text-sm"></p>
        <span
          onClick={() => handleclose()}
          className="h-10 w-10 rounded-full border flex items-center justify-center"
        >
          <i className="fas fa-times text-red-500"></i>
        </span>
      </div>
      <p className="text-lg mt-5 mb-2 font-medium">Audio File</p>
      {newtrack?.trackURL || data?.trackURL || progress > 0 ? (
        <div className="h-12 w-full">
          <div className="h-full bg-indigo-500 text-white text-center py-3">
            {progress <= 99
              ? Math.floor(progress) + "%"
              : "Audio has been uploaded Successfully"}
          </div>
        </div>
      ) : (
        <div className=" h-14">
          <label
            htmlFor="audio-file"
            className="w-full h-full bg-box flex items-center"
          >
            <p className="pl-5 font-medium text-sidetext">
              <i className="fas fa-plus mr-6 fa-green  text-md"></i>
              Click here to upload your audio file (mp3 format file only.
              Recommended min bitrate: 320kbps; sample rate: 44.1 kHz)
            </p>
            <input
              id="audio-file"
              type="file"
              disabled={data?.submitted}
              onChange={(e) => musciupload(e)}
              accept="audio/mp3"
              className="hidden"
              placeholder=""
            />
          </label>
        </div>
      )}
      <div className="grid grid-rows-2  mt-5">
        <p className="text-lg  font-medium">
          Language of Lyrics <span className="text-red-500">*</span>
          <span className="mx-5 text-sm font-normal text-sidetext">
            Select Instrumental if track has no lyrics
          </span>
        </p>
        <select
          disabled={data?.submitted}
          defaultValue={data?.lyricLanguage}
          className="appearance-none focus:outline-none w-full h-12 px-4 font-normal bg-box "
          onChange={(e) =>
            setnewtrack({ ...newtrack, lyricLanguage: e.target.value })
          }
          name=""
          id=""
        >
          {language.map((lang, index) => (
            <option className="capitalize  " value={lang} key={index}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-6 my-5">
        <div className="col">
          <p className="text-lg  font-medium pb-2 ">Release Title</p>
          <input
            type="text"
            defaultValue={data?.releaseTitle}
            disabled={data?.submitted}
            onChange={(e) =>
              setnewtrack({ ...newtrack, releaseTitle: e.target.value })
            }
            placeholder="Eg: Song Name"
            className="h-14 px-5 w-full bg-box appearance-none outline-none  focus:border-purple-700"
          />
        </div>
        <div className="col">
          <p className="text-lg  font-medium pb-2 ">Title Version</p>
          <input
            type="text"
            defaultValue={data?.titleVersion}
            disabled={data?.submitted}
            onChange={(e) =>
              setnewtrack({ ...newtrack, titleVersion: e.target.value })
            }
            placeholder="Eg: Live,Radio Edit"
            className="h-14 px-5 w-full bg-box appearance-none outline-none  focus:border-purple-700"
          />
        </div>
      </div>
      <div className="grid grid-rows-2  mt-5">
        <p className="text-lg font-medium">
          Artist (Indicate only one in this field) *
        </p>
        <select
          type="text"
          placeholder="Artist Name"
          defaultValue={newtrack.mainArtist}
          disabled={newtrack.info ? true : false}
          onChange={(e) => {
            setnewtrack({
              ...newtrack,
              mainArtist: e.target.value,
            });
          }}
          className="h-12 mx-5 mr-5 px-5  w-full bg-box appearance-none outline-none  focus:border-purple-700"
        >
          <option value="default" defaultChecked>
            --Select--
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
        className="text-purple-900 py-3 px-5 focus:outline-none"
      >
        <i className="fas fa-plus"></i> Add other Artist and Contributors.
      </button>
      <div className="grid grid-flow-col grid-rows-1 grid-cols-2 my-5 gap-1">
        <div>
          <p className="text-lg font-medium">
            Do you already have your own ISRC code?
          </p>
          <div className="py-2 flex items-center justify-between">
            <label>
              <input
                type="radio"
                name="ownupc"
                onChange={() => setownisrc(1)}
              />
              Yes(required if previously released)
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
          <br></br>
          <p className="text-xl font-medium mx-5">ISRC *</p>
          <input
            type="text "
            defaultValue={data?.isrc}
            onChange={(e) => setnewtrack({ ...newtrack, isrc: e.target.value })}
            placeholder="Enter ISRC Code"
            required
            className="h-12 px-5 w-full mx-5 bg-gray-50 appearance-none outline-none border border-red-500"
          />
        </div>
      </div>
      <div className="pt-5">
        <p className="text-lg font-medium  ">Explicit Lyrics? </p>
        <div className="my-1">
          <label htmlFor="">
            <input
              type="radio"
              name="explicit"
              value="no"
              onChange={(e) =>
                setnewtrack({ ...newtrack, explicit: e.target.value })
              }
            />
            No
          </label>
          <label className="ml-10">
            <input
              type="radio"
              name="explicit"
              value="yes"
              onChange={(e) =>
                setnewtrack({ ...newtrack, explicit: e.target.value })
              }
            />
            Yes
          </label>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="cursor-pointer border-t py-4 text-lg font-medium ">
          CRBT (Caller Ring Back Tunes)
        </h1>

        <input
          type="text"
          defaultValue={data?.crbt}
          disabled={data?.submitted}
          onChange={(e) => setnewtrack({ ...newtrack, crbt: e.target.value })}
          placeholder="Format: mm:ss    Example: 02:45"
          className="h-14 px-5 w-4/6 bg-box appearance-none outline-none  focus:border-purple-700"
        />
      </div>

      <div className="mt-5">
        <h3
          className="cursor-pointer border-t py-4 text-2xl font-normal "
          onClick={() => setadditional(!additional)}
        >
          <i className="fas fa-caret-right mr-5"></i> Additional Info
        </h3>
        <div className={additional ? "" : "hidden"}>
          <div className="grid grid-cols-2 gap-6 my-5" name="additional">
            <div className="col" name="additional">
              <p className="text-lg  font-medium pb-2 ">(C) Line</p>
              <input
                type="text"
                defaultValue={data?.Ccopyright}
                disabled={data?.submitted}
                onChange={(e) =>
                  setnewtrack({ ...newtrack, cline: e.target.value })
                }
                placeholder="Eg: 2021 Label Name"
                className="h-14 px-5 w-full bg-box appearance-none outline-none  focus:border-purple-700"
              />
            </div>
            <div className="col">
              <p className="text-lg  font-medium pb-2 ">(P) Line</p>
              <input
                type="text"
                defaultValue={data?.pCopyright}
                disabled={data?.submitted}
                onChange={(e) =>
                  setnewtrack({ ...newtrack, pline: e.target.value })
                }
                placeholder="Eg: 2021 Label Name"
                className="h-14 px-5 w-full bg-box appearance-none outline-none  focus:border-purple-700"
              />
            </div>
          </div>
        </div>
        <h3
          className="cursor-pointer border-t py-4 text-2xl font-normal"
          onClick={() => setlyrics(!lyrics)}
        >
          <i className="fas fa-caret-right mr-5"></i> Lyrics
        </h3>
        <textarea
          name="lyrics"
          defaultValue={data?.lyrics}
          onChange={(e) => setnewtrack({ ...newtrack, lyrics: e.target.value })}
          className={
            lyrics
              ? "border w-full h-64 focus:outline-none p-5 bg-box text-sm"
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
