function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      value={value}
      onChange={onChange}
      className="
        w-full
        max-w-[400px]
        h-[50px]
        px-4
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
  );
}

export default SearchBar;
