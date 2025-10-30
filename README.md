# 📚 Ignite Book Explorer

A modern React-based web app that allows users to explore and read thousands of books online.  
Built with a clean interface, smooth infinite scrolling, and smart book format handling (HTML, PDF, ZIP).

---

## 👩‍💻 Developed By
**Amruta Dahatonde**

---

## 🚀 Features
- 📖 Browse books by category or author  
- 🔍 Search functionality with instant results  
- ♾️ Infinite scroll for seamless browsing  
- 🧾 Auto-handles different book formats (HTML, PDF, TXT, ZIP)  
- 🌈 Responsive and elegant UI using Tailwind CSS  
- ⚡ Powered by React and Vite for fast loading  

---
## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS  
- **Routing:** React Router DOM  
- **Build Tool:** Vite  
- **API:** [Gutenberg Books API](http://skunkworks.ignitesol.com:8000)  
- **Package Manager:** npm  
- **Backend (Proxy):** Node.js (used to handle CORS)  

---

## 🌐 API Proxy Setup (to fix CORS error)

Since the **Gutenberg API** does not allow direct browser access (CORS issue),  
we use a simple **Node.js ** proxy server that fetches data on our behalf.

### 🔗 Deployed Proxy Link
https://ignite-proxy.onrender.com/api/books

This proxy takes requests from the frontend → calls  
`https://skunkworks.ignitesol.com:8000/books` → sends data back safely.

#

**Frontend:**  
🌍 [https://ignitevercel.vercel.app](https://ignitevercel.vercel.app)

**Backend (Proxy):**  
🌍 [https://ignite-proxy.onrender.com/api/books](https://ignite-proxy.onrender.com/api/books)

# Node JS Code For CORS Error #
```

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/books", async (req, res) => {
  try {
    const query = new URLSearchParams(req.query).toString();
    const targetUrl = `http://skunkworks.ignitesol.com:8000/books?${query}`;
    console.log("🔗 Fetching from:", targetUrl);

    const response = await fetch(targetUrl);
    console.log("📦 Response status:", response.status);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching from external API:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => console.log("✅ Proxy running on port 8080"));
