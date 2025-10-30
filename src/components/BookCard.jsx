

function BookCard({ book, onClick }) {
  return (
    <div
      onClick={onClick} // open book when clicked
      className="cursor-pointer bg-white shadow-[0_2px_5px_rgba(211,209,238,0.5)] rounded-lg flex flex-col items-center w-[150px] p-3 transition-all duration-200 hover:shadow-md"
    >
      {/* book image */}
      <img
        src={book.formats?.["image/jpeg"]}
        alt={book.title}
        className="w-[150px] h-[200px] object-cover rounded-md mb-3"
      />

      {/* book name */}
      <h3
        className="text-[14px] text-[#333333] font-[500] text-center leading-tight truncate w-full font-[Montserrat]"
        title={book.title}
      >
        {book.title}
      </h3>

      {/* author name */}
      <p
        className="text-[12px] text-[#A0A0A0] text-center mt-1 truncate w-full font-[Montserrat]"
        title={book.authors?.[0]?.name || 'Unknown Author'}
      >
        {book.authors && book.authors.length > 0
          ? book.authors[0].name
          : 'Unknown Author'}
      </p>
    </div>
  );
}

export default BookCard;
