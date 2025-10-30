import { X } from "lucide-react";

function SearchBar({ value, onChange }) {
  // Clear handler
  const handleClear = () => onChange({ target: { value: "" } });

  return (
    <div className="relative w-full max-w-[400px]">
      {/* Input field */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={value}
        onChange={onChange}
        className="
          w-full
          h-[50px]
          px-4
          pr-10
          text-[16px]
          font-[Montserrat]
          text-[#3C3A47]
          border
          border-[#BFBCCF]
          rounded-[4px]
          bg-white
          placeholder-[#A0A0A0]
          outline-none
          transition-all
          focus:border-[#5E56E7]
          focus:ring-1
          focus:ring-[#5E56E7]
        "
      />

      {/* Clear icon */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-[#A0A0A0] hover:text-[#5E56E7]
            transition-all
          "
          aria-label="Clear search"
        >
          <X size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
