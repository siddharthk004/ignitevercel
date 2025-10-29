import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../api";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";

// Main page for showing books of a selected category
function BooksPage() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch books from API first load or next page
  const loadBooks = async (pageUrl = "") => {
    if (loading) return; // avoid double fetching
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

  // Run when category or search text changes
  useEffect(() => {
    setBooks([]);
    loadBooks();
  }, [category, search]);

  // Scroll handler to load next set of books (infinite scroll)
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      nextUrl &&
      !loading
    ) {
      loadBooks(nextUrl);
    }
  }, [nextUrl, loading]);

  // Add and remove scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Open book in a new tab (HTML, PDF, or Text) ZIP files auto-download.
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-900 flex flex-col">
      {/* Top navigation bar */}
      <Navbar title={`${category} Books`} />

      {/* Search bar for filtering books */}
      <div className="mt-28 flex justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-2xl sm:max-w-3xl relative">
          <input
            type="text"
            placeholder="🔍 Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-indigo-300 bg-white/80 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-base sm:text-lg placeholder-gray-500"
          />
        </div>
      </div>

      {/* Grid displaying all books */}
      <main className="flex-1 w-full px-1 sm:px-4 md:px-6 py-6">
        <div
          className="
            grid gap-4 sm:gap-8 md:gap-10
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
            <p className="text-gray-500 mt-20 text-lg text-center col-span-full">
              No books found.
            </p>
          )}
        </div>

        {/* Loader while fetching next books */}
        {loading && (
          <div className="text-center text-indigo-500 mt-6 font-medium">
            Loading more books...
          </div>
        )}
      </main>
    </div>
  );
}

export default BooksPage;