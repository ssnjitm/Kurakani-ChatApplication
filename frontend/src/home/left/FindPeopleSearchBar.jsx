import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function FindPeopleSearchBar({ query, setQuery }) {
  return (
    <div className="relative w-full mb-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search people by name or email..."
        className="pl-10 pr-4 py-2 border border-gray-600 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white shadow-sm"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <FiSearch size={20} />
      </span>
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 focus:outline-none"
          aria-label="Clear search"
        >
          &#10005;
        </button>
      )}
    </div>
  );
}

export default FindPeopleSearchBar;
