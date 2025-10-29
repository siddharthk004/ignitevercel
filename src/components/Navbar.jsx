import { useNavigate } from "react-router-dom";

// Top navigation bar component
// Shows Home button, center logo, and current category title
function Navbar({ title }) {
  const navigate = useNavigate();

  return (
    // Fixed navbar with light background and blur effect
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 relative">
        
        <button
          onClick={() => navigate("/")}
          className="font-bold text-base sm:text-lg text-purple-700 hover:text-purple-900 transition-all relative group"
        >
          Home
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
        </button>

        <div
          onClick={() => navigate("/")}
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide cursor-pointer hover:scale-105 transition-transform drop-shadow-sm"
        >
          GutenBooks
        </div>

        {title && (
          <span className="hidden sm:block font-semibold text-lg text-purple-700 capitalize transition-colors truncate max-w-[160px] text-right">
            {title}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;