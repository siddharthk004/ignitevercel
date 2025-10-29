function CategoryButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-xl m-2 shadow-md hover:shadow-lg hover:scale-105 transition-all"
    >
      {label}
    </button>
  );
}
export default CategoryButton;
