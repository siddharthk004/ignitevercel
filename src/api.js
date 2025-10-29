const BASE_URL = "http://skunkworks.ignitesol.com:8000/books";

export async function fetchBooks(topic, search = "", pageUrl = "") {
  const url =
    pageUrl ||
    `${BASE_URL}?topic=${topic}&mime_type=image${
      search ? `&search=${search}` : ""
    }`;
  const res = await fetch(url);
  return res.json();
}

