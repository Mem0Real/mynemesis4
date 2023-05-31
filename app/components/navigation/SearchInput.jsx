"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [showSearchList, setShowSearchList] = useState(false);
  const [results, setResults] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <form className="inline-flex justify-center">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className="px-10 py-3 w-full md:rounded-e-3xl md:rounded-s-none rounded-md sm:px-12 sm:py-2 flex-1 text-zinc-200 bg-zinc-800"
          placeholder="What are you looking for?"
        />
        <button type="submit" className="-ml-6" onClick={onSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
