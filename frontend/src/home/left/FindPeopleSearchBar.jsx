import React from "react";
import { FiSearch } from "react-icons/fi";

function FindPeopleSearchBar({ query, setQuery }) {
  return (
    <div className="relative w-full mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search people by name or email..."
        className="pl-12 pr-4 py-4 w-full rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">
        <FiSearch size={22} />
      </span>
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-red-400 focus:outline-none transition"
          aria-label="Clear search"
        >
          &#10005;
        </button>
      )}
    </div>
  );
}

export default FindPeopleSearchBar;
