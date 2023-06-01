"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";

export default function Selections({ handleChange, entry }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let selection = entry;
  selection = selection.charAt(0).toUpperCase() + selection.slice(1);

  useEffect(() => {
    setLoading(true);
    fetch("/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entry: entry }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="text-sm">
      <p>What {selection} does it belong to?</p>
      <select
        name={entry}
        id={entry}
        className="ps-2 px-3 w-56 md:w-56 cursor-pointer py-2 rounded-md border border-neutral-900 text-md md:text-sm"
        onChange={handleChange}
        defaultValue=""
        required
      >
        <option value="" disabled>
          Select Entry
        </option>
        {data?.map((category) => {
          return (
            <option key={category.id} value={category.id} className="text-sm">
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
