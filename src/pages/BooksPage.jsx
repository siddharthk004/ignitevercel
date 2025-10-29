import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../api";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";

function BooksPage() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBooks = async (pageUrl = "") => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchBooks(category, search, pageUrl);
      setBooks((prev) => (pageUrl ? [...prev, ...data.results] : data.results));
      setNextUrl(data.next);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBooks([]);
    loadBooks();
  }, [category, search]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      nextUrl &&
      !loading
    ) {
      loadBooks(nextUrl);
    }
  }, [nextUrl, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const openBook = (formats) => {
    const html = formats["text/html"];
    const pdf = formats["application/pdf"];
    const text = formats["text/plain"];
    const zip =
      formats["application/zip"] || formats["application/x-zip-compressed"];

    const link = html || pdf || text;

    if (link) {
      window.open(link, "_blank");
    } else if (zip) {
      const a = document.createElement("a");
      a.href = zip;
      a.download = "book.zip";
      a.click();
    } else {
      alert("No readable or downloadable version available.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-[#333333] font-[Montserrat] flex flex-col">
      {/* Navbar */}
      <Navbar title={`${category}`} />

      {/* Search Bar */}
      <div className="mt-24 flex justify-center px-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl h-10 border border-[#E0E0E0] rounded-md px-3 shadow-[0_2px_5px_rgba(211,209,238,0.5)] focus:outline-none focus:border-[#5E56E7] placeholder-[#A0A0A0] bg-white"
        />
      </div>

      {/* Books Grid */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-10 py-10">
        <h2 className="text-[#5E56E7] text-2xl sm:text-3xl font-semibold mb-6 capitalize tracking-tight">
          {category} Books
        </h2>

        <div
          className="
            grid gap-6
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
            justify-items-center
          "
        >
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => openBook(book.formats)}
              />
            ))
          ) : (
            <p className="text-[#A0A0A0] mt-20 text-lg text-center col-span-full">
              No books found.
            </p>
          )}
        </div>

        {loading && (
          <div className="text-center text-[#5E56E7] mt-6 font-medium">
            Loading more books...
          </div>
        )}
      </main>
    </div>
  );
}

export default BooksPage;
