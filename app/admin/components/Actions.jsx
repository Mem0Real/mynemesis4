"use client";

import React, { useState } from "react";
import Link from "next/link";
// import List from "./List";
import { Suspense } from "react";

export default function Actions({ data }) {
  const [showList, setShowList] = useState(false);

  const closeList = () => {
    setShowList(false);
  };

  return !showList ? (
    <div className="flex flex-col w-full min-h-screen justify-start items-center">
      <p>What Would You Like To Do?</p>
      <div className="w-full flex-col h-56 md:h-24 justify-end items-end md:my-6 text-center">
        <Link
          className="px-5 md:mx-5 py-2 rounded-md bg-green-500 text-white"
          href="/admin/create"
        >
          Create
        </Link>
        <button
          className="px-5 md:mx-5 py-1 rounded-md outline outline-blue-600 outline-offset-2 text-black"
          onClick={() => setShowList(!showList)}
        >
          List
        </button>
        <Link
          className="px-5 md:mx-5 py-2 rounded-md  bg-blue-500 text-white"
          href="/admin/edit"
        >
          Edit
        </Link>
        <Link
          className="px-5 md:mx-5 py-2 rounded-md  bg-red-500 text-white"
          href="/admin/delete"
        >
          Delete
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-4/5 justify-center items-center mx-auto">
      {/* <Suspense fallback={<h1>Loading...</h1>}>
          <List data={data} closeList={closeList} />
        </Suspense> */}
    </div>
  );
}
