import React from "react";
import Language from "./utis/Language";
import Title from "./utis/Title";
import ArtistComponent from "./utis/ArtistComponent";
import ReleaseInfo from "./utis/ReleaseInfo";

function MainInfo() {
  return (
    <div className="lg:p-10 p-2 bg-gray-100">
      <div className="bg-white ">
        <p className="px-5 text-xl border-b py-3 ">Cover Image</p>

        <div className="grid grid-cols-3">
          <div className=" col lg:p-10 flex justify-center ">
            <div className=" w-64 h-64">
              <label htmlFor="file-for">
                <div className="border rounded text-center w-64 h-64 flex justify-center items-center bg-gray-50">
                  <i className="fas fa-plus"></i>
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-for"
                className="hidden"
                onChange={(e) => {}}
              />
              <p className="text-xs text-center text-gray-400">
                Upload your image file here
              </p>
            </div>
          </div>
          <div className=" col-span-2  flex flex-col justify-start">
            <h5 className="text-sm text-gray-800 font-semibold lg:p-3">
              Please follow these rules so your release isn't rejected by the
              stores & services.
            </h5>
            <ul className="pl-10 list-disc text-sm pr-5">
              <li>File format: JPG or JPEG</li>
              <li>Color space: RGB</li>
              <li>
                Minimum dimensions: 1400x1400 pixels, but recommend 3000x3000
                pixels.
              </li>
              <li>Square image: width and height must be the same.</li>
              <li>
                Images may not contain more than 50 megapixels or be larger than
                10 Mb.
              </li>
              <li>
                Your image cannot be stretched, upscaled, or appear to be
                low-resolution.
              </li>
              <li>
                The information on your cover art must match your album title
                and artist name.
              </li>
              <li>
                Website addresses, social media links and contact information
                are not permitted on album artwork.
              </li>
              <li>Your cover art may not include sexually explicit imagery.</li>
              <li>
                Your cover art cannot be misleading by figuring another artist's
                name more prominently than yours.
              </li>
              <li>
                You may not use a third-party logo or trademark without the
                express written permission from the trademark holder.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Language />
      <Title />
      <ArtistComponent />
      <ReleaseInfo />
    </div>
  );
}

export default MainInfo;
