function Title({ somefun, album }) {
  // refs

  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <p className="px-5 text-xl border-b py-3 mb-5">Title</p>
      <div className="grid grid-cols-2">
        <div className="col px-5">
          <p className="text-lg">Release Title</p>
          <input
            type="text"
            defaultValue={album.title}
            disabled={album.info ? true : false}
            onChange={(e) => somefun({ ...album, title: e.target.value })}
            placeholder="Eg: Album Name"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
        <div className="col">
          <p className="text-lg">Title Version</p>
          <input
            type="text"
            defaultValue={album.titleVersion}
            disabled={album.info ? true : false}
            onChange={(e) =>
              somefun({ ...album, titleVersion: e.target.value })
            }
            placeholder="Eg: Live, Radio Edit"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
      </div>
    </div>
  );
}

export default Title;
