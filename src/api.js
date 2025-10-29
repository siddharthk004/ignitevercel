const BASE_URL = "https://skunkworks.ignitesol.com:8000/books";

export async function fetchBooks(topic, search = "", pageUrl = "") {
  try {
    const url =
      pageUrl ||
      `${BASE_URL}?topic=${encodeURIComponent(topic)}&mime_type=image${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { results: [], next: null }; // prevent app crash on failure
  }
}
