import React from "react";

function ReviewandSave() {
  return (
    <div className="min-h-screen p-10 bg-gray-200">
      <div className="my-8 h-12 bg-limegreen py-2 px-7 font-semibold   text-white w-full">
        <p>Review and approve the information you entered is correct.</p>
      </div>
      <div className="bg-white p-6">
        <div className="grid grid-cols-4 gap-8">
          <div className="">
            <img
              className="h-full w-full"
              src="https://www.trapbasshdtv.online/images/trapbasshdtv%20.jpg"
              alt=""
            />
          </div>
          <div className=" col-span-3 text-md">
            <h1 className="font-bold text-xl">Godda Rap</h1>
            <h4 className="font-semibold text-md mb-5">by Anand Fkd</h4>

            <p className="mt-5">Genre(S) Electornic</p>
            <p className="">LabelL vampire Music Company</p>
            <p className="">(P)</p>
            <p className="">(C)</p>
          </div>
        </div>
      </div>
      <div className="my-8 p-2 lg:p-8 bg-white">
        <p className="text-xl font border-b py-5">Tracks</p>
        <div className="flex border-b">
          <div className="my-4 mr-7 text-lg font-bold">01</div>
          <div className="my-4">
            <h1 className="font-bold text-xl">Godda Rap</h1>
            <h4 className="font-semibold text-md mb-5">by Anand Fkd</h4>

            <p className="mt-5">Genre(S) Electornic</p>
            <p className="">LabelL vampire Music Company</p>
            <p className="">(P)</p>
            <p className="">(C)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewandSave;
