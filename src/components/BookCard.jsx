function BookCard({ book, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-gray-200 bg-white p-4 m-2 rounded-2xl shadow-sm hover:shadow-lg flex flex-col items-center w-full max-w-[200px] transition-all duration-200"
    >
      <img
        src={book.formats?.["image/jpeg"]}
        alt={book.title}
        className="w-32 h-44 object-cover rounded-md mb-3"
      />
      <h3
        className="font-semibold text-base text-gray-800 text-center truncate w-full"
        title={book.title}
      >
        {book.title}
      </h3>
      <p
        className="text-gray-600 text-sm text-center truncate w-full"
        title={book.authors?.[0]?.name || "Unknown Author"}
      >
        {book.authors && book.authors.length > 0
          ? book.authors[0].name
          : "Unknown Author"}
      </p>
    </div>
  );
}

export default BookCard;
