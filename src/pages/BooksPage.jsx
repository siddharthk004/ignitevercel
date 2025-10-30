import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchBooks } from "../api";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function BooksPage() {
  const { category } = useParams();
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // helper to get query params
  const queryParams = new URLSearchParams(location.search);
  const ids = queryParams.get("ids");
  const languages = queryParams.get("languages");
  const mime_type = queryParams.get("mime_type");
  const topic = queryParams.get("topic");

  // load books from api (handles ids, topic, language, etc.)
  const loadBooks = async (pageUrl = "") => {
    if (loading) return;
    setLoading(true);

    try {
      let apiUrl = pageUrl;

      // if no page url, build base api call dynamically
      if (!apiUrl) {
        const params = new URLSearchParams();
        if (ids) params.append("ids", ids);
        if (languages) params.append("languages", languages);
        if (mime_type) params.append("mime_type", mime_type);
        if (topic || category) params.append("topic", topic || category);
        if (search) params.append("search", search);
        params.append("mime_type", "image"); // keep cover images
        apiUrl = `https://ignite-proxy.onrender.com/api/books?${params.toString()}`;
      }

      const res = await fetch(apiUrl);
      const data = await res.json();

      setBooks((prev) => (pageUrl ? [...prev, ...data.results] : data.results));
      setNextUrl(data.next);
    } catch (error) {
      console.log("error while fetching books", error);
    } finally {
      setLoading(false);
    }
  };

  // load whenever category, search, or query params change
  useEffect(() => {
    setBooks([]);
    loadBooks();
  }, [category, search, location.search]);

  // infinite scroll
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

  // open book link
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
      alert("No readable version found");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-[#333333] font-[Montserrat] flex flex-col">
      {/* navbar */}
      <Navbar title={category || "Books"} />

      {/* search bar */}
      <div className="mt-28 flex justify-center px-4">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* books grid */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 py-10">
        <h2 className="text-[#5E56E7] text-[30px] sm:text-[32px] font-semibold mb-8 capitalize text-center">
          {category || "Book Results"}
        </h2>

        <div
          className="
            grid gap-8
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
          <div className="text-center text-[#5E56E7] mt-8 text-[16px] font-medium">
            Loading more books...
          </div>
        )}
      </main>
    </div>
  );
}

export default BooksPage;
