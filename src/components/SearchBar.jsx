function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded-md w-full max-w-md mt-4 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );
}
export default SearchBar;
