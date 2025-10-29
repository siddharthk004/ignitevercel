import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Fiction", color: "from-indigo-500 to-blue-500" },
  { name: "Science", color: "from-green-400 to-teal-500" },
  { name: "Drama", color: "from-pink-500 to-red-500" },
  { name: "History", color: "from-amber-400 to-orange-500" },
  { name: "Poetry", color: "from-purple-500 to-fuchsia-500" },
];

function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 text-gray-800 px-4 sm:px-8 py-10">
      <div className="bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 sm:p-16 text-center w-full max-w-6xl border border-white/40 flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 text-indigo-700 drop-shadow-sm">
          GutenBooks
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 font-medium">
          Browse thousands of free books by category
        </p>

        {/* Responsive button grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/books/${cat.name.toLowerCase()}`)}
              className={`bg-gradient-to-r ${cat.color} px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <p className="mt-10 sm:mt-12 text-xs sm:text-sm text-gray-700">
          Built by <span className="font-semibold text-indigo-700">Amruta Dahatonde</span> ✨
        </p>
      </div>
    </div>
  );
}

export default CategoriesPage;
