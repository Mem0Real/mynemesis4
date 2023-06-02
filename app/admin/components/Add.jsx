"use client";

import React, { useState, useRef } from "react";
import createCategory from "./createCategory";

import Image from "next/image";
import Selections from "./Selections";

export default function Create() {
  const [data, setData] = useState({});
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [status, setStatus] = useState();
  const [showMessage, setShowMessage] = useState(false);

  const imageRef = useRef();
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    setData({ ...data, image: changeEvent.target.files[0] });
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setData({ ...data, [fieldName]: fieldValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await createCategory(data);
    setStatus(res);
    setData({});
    setImageSrc();
  };

  return (
    <div className="flex flex-col md:w-fit mx-auto max-h-fit justify-start items-center bg-neutral-100 text-neutral-900 mt-16 md:mt-12 mb-12 md:mb-16 border border-solid border-3 rounded-md border-neutral-900">
      <div className="flex flex-col justify-between items-center px-24">
        <h1 className="text-center text-md md:text-lg border px-4 py-2 rounded border-3 border-neutral-900 border-t-0">
          Create Form
        </h1>
        <form
          method="POST"
          className="flex flex-col items-center my-4 h-fit w-full text-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-16">
            <p className="mb-4 text-lg">What would you like to add?</p>
            <select
              name="entry"
              id="entry"
              className="ps-2 px-3 w-56 md:w-56 cursor-pointer py-2 rounded-md border border-neutral-900 text-md md:text-sm"
              onChange={handleChange}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Entry
              </option>
              <option value="Categories" className="text-sm">
                Category
              </option>
              <option value="Parents" className="text-sm">
                Parent
              </option>
              <option value="Children" className="text-sm">
                Child
              </option>
              <option value="Items" className="text-sm">
                Item
              </option>
            </select>
          </div>

          {data.entry && (
            <div className="w-full">
              {data.entry === "Parents" && (
                <Selections handleChange={handleChange} entry={"categories"} />
              )}
              {data.entry === "Children" && (
                <Selections handleChange={handleChange} entry={"parents"} />
              )}
              {data.entry === "Items" && (
                <Selections handleChange={handleChange} entry={"children"} />
              )}
              {/* Name */}
              <div className="flex flex-col justify-start items-center md:mt-12 px-12">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  value={data.name}
                  className="border border-neutral-700 rounded-md w-full py-2 ps-4"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* ShortName A.K.A Id */}
              <div className="flex flex-col justify-evenly items-center my-12 md:mt-12 px-12">
                <label htmlFor="id">
                  ShortName
                  <span className="text-sm text-neutral-700">(optional)</span>
                </label>
                <input
                  name="id"
                  type="text"
                  value={data.id}
                  className="border border-neutral-900 rounded-md  w-full py-2 ps-4"
                  onChange={handleChange}
                />
              </div>
              {data.entry === "Items" && (
                <>
                  {/* Brand */}
                  <div className="flex flex-col justify-start items-center md:mt-12 px-12">
                    <label htmlFor="name">Brand</label>
                    <input
                      name="brand"
                      type="text"
                      value={data.brand}
                      className="border border-neutral-700 rounded-md w-full py-2 ps-4"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Model */}
                  <div className="flex flex-col justify-start items-center md:mt-12 px-12">
                    <label htmlFor="name">Model</label>
                    <input
                      name="model"
                      type="text"
                      value={data.model}
                      className="border border-neutral-700 rounded-md w-full py-2 ps-4"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Quantity */}
                  <div className="flex flex-col justify-start items-center md:mt-12 px-12">
                    <label htmlFor="name">Quantity</label>
                    <input
                      name="quantity"
                      type="number"
                      value={data.quantity}
                      className="border border-neutral-700 rounded-md w-full py-2 ps-4"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Price */}
                  <div className="flex flex-col justify-start md:mt-12 px-12 relative">
                    <label htmlFor="name">Price</label>
                    <input
                      name="price"
                      type="number"
                      value={data.price}
                      className="border border-neutral-700 rounded-md w-full py-2 ps-4"
                      onChange={handleChange}
                    />
                    <p className="absolute top-8 right-16 text-md font-medium">
                      ETB
                    </p>
                  </div>
                </>
              )}
              {/* Image */}
              <div className="flex flex-col justify-evenly items-center my-12 md:mt-12">
                <label htmlFor="image">
                  Image
                  <span className="text-sm text-neutral-700">(optional)</span>
                </label>
                <input
                  name="image"
                  type="file"
                  onChange={handleOnChange}
                  className="md:mt-3 py-3 border border-neutral-700 md:px-3 rounded-md"
                  ref={imageRef}
                />
              </div>
              {/* Show Selected Image */}
              <div className="flex flex-col justify-evenly items-center my-12 md:mt-12">
                {imageSrc && (
                  <Image src={imageSrc} width={100} height={100} alt="Image" />
                )}
              </div>
              {/* Description */}
              <div className="flex flex-col justify-evenly items-center my-12 md:mt-12">
                <label htmlFor="description">
                  Description
                  <span className="text-sm text-neutral-700">(optional)</span>
                </label>
                <div className="px-4">
                  <textarea
                    rows={6}
                    cols={36}
                    name="description"
                    type="text"
                    value={data.description}
                    className="border border-neutral-900 rounded-md p-2 ps-4"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Button */}
              <div className="flex flex-col justify-center items-center md:mt-12">
                {!uploadData ? (
                  <button className="px-4 py-2 rounded-md bg-green-500 text-neutral-100">
                    Create
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 rounded-md bg-green-500 text-neutral-100"
                    disabled
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
