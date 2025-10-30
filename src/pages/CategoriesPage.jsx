import { useNavigate } from "react-router-dom";

// all book categories
const categories = [
  "Fiction",
  "Philosophy",
  "Drama",
  "History",
  "Humour",
  "Adventure",
  "Politics",
];

function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FF] text-[#333333] font-[Montserrat] px-4 py-10">
      <div className="text-center w-full max-w-5xl">
        {/* main heading */}
        <h1 className="text-[#5E56E7] text-5xl sm:text-6xl font-semibold mb-3 tracking-tight">
          Gutenberg
        </h1>

        {/* small description */}
        <p className="text-base sm:text-lg text-[#A0A0A0] mb-12">
          A social cataloging website that allows you to freely search its
          database of books, annotations, and reviews.
        </p>

        {/* buttons for categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/books/${cat.toLowerCase()}`)} // go to selected category page
              className="bg-white text-[#5E56E7] shadow-[0_2px_5px_rgba(211,209,238,0.5)] rounded-md px-4 py-3 font-medium text-lg hover:bg-[#5E56E7] hover:text-white transition-all duration-200"
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* footer text */}
      <footer className="mt-16 text-sm text-[#A0A0A0]">
        Built by <span className="font-semibold text-[#5E56E7]">Amruta Dahatonde</span>
      </footer>
    </div>
  );
}

export default CategoriesPage;
