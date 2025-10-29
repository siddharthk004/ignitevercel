export default async function handler(req, res) {
    const { topic, search = "", pageUrl = "" } = req.query;
    const BASE_URL = "https://skunkworks.ignitesol.com:8000/books";
  
    const url =
      pageUrl ||
      `${BASE_URL}?topic=${encodeURIComponent(topic)}&mime_type=image${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    } catch (err) {
      console.error("Serverless API error:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  }
  