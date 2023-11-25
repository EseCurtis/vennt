// searchingForMatch.tsx
import React from "react";
import { HiMiniSignal } from "react-icons/hi2";

const SearchingForMatch: React.FC = () => {
  return (
    // SearchingForMatch implementation
    <div className="flex flex-col items-center justify-center py-10">
      <HiMiniSignal className="text-[10em] text-[var(--accent)] animate-pulse" />
      <h3 className="text-center opacity-60">
        Finding the perfect match for your conversation. Please hold on!
      </h3>
    </div>
  );
};

export default SearchingForMatch;
