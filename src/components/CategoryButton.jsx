function CategoryButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white
        text-[#5E56E7]
        font-[Montserrat]
        text-[20px]
        font-normal
        rounded-[4px]
        shadow-[0_2px_5px_rgba(211,209,238,0.5)]
        px-[10px] 
        h-[50px]
        transition-all
        hover:bg-[#5E56E7]
        hover:text-white
        hover:shadow-md
      "
    >
      {label.toUpperCase()}
    </button>
  );
}

export default CategoryButton;
