function LabelInfo() {
  return (
    <div className="lg:my-4 lg:mx-10 p-5 bg-white">
      <h2 className=" py-10 mb-5 border-b text-xl font-semibold">Info</h2>
      <div className="">
        <p className="text-lg my-3 font-semibold">Official Label name</p>
        <input
          type="text"
          placeholder="Label Name"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Genres</p>

        <div className="">
          <select
            type="text"
            placeholder="Add genres you will be deliveringoo"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          >
            <option value="default" defaultValue>
              --select--
            </option>
          </select>
        </div>
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Location</p>
        <input
          type="text"
          placeholder="Enter your Location"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Contact Email(Private)</p>
        <input
          type="text"
          placeholder="Enter Valid Email"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Contact Phone(Private)</p>
        <input
          type="text"
          placeholder="xxx-xxx-xxxx"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
    </div>
  );
}

export default LabelInfo;
