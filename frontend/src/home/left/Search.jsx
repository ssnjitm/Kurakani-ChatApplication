
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
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
};

export default Search;
