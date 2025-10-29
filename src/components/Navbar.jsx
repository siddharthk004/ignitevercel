import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F8F7FF] shadow-[0_2px_5px_rgba(211,209,238,0.5)] z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="text-[#5E56E7] text-[16px] font-[600] font-[Montserrat] hover:text-[#3E3ACF] transition-all"
        >
          Home
        </button>

        {/* Center Title */}
        <div
          onClick={() => navigate("/")}
          className="text-[#5E56E7] font-[Montserrat] font-semibold text-[30px] sm:text-[32px] cursor-pointer tracking-tight"
        >
          Gutenberg
        </div>

        {/* Right Side Category Title */}
        {title && (
          <span className="text-[#A0A0A0] text-[16px] font-[500] capitalize truncate max-w-[160px] text-right font-[Montserrat]">
            {title}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
