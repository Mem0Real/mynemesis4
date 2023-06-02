"use client";

import React, { useState, useEffect, Suspense } from "react";

export default function List({ closeList, data }) {
  // const [open, setOpen] = useState({
  //   settings: [{}],
  // });

  const [open, setOpen] = useState(false);

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const items = data[3];

  const Add = (e) => {
    // Show Add Modal
  };
  const Edit = (e) => {};
  const Delete = (e) => {};

  return (
    <div className="flex-flex-col w-full items-center justify-center relative min-h-screen h-fit">
      <div className="flex justify-end items-end">
        <button
          className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-100"
          onClick={closeList}
        >
          Back
        </button>
      </div>
      <h1 className="text-lg italic underline underline-offset-4 text-center">
        List
      </h1>
      <div className="md:my-6 mb-6 shadow-md shadow-black">

      </div>
    </div>
  );
}
