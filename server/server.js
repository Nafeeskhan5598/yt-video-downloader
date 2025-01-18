const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ytdl = require("ytdl-core");

const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Test Route (to check if server is running)
app.get("/", (req, res) => {
  res.send("Server is running!"); // Just a basic response for testing  > Server is running! http://localhost:5000/ par dikh raha he 
});

// API Endpoint for video download
app.post("/api/download", async (req, res) => {
  const { url } = req.body;

  try {
    // Validate URL
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL. Please provide a valid URL." });
    }

    // Get video info
    const info = await ytdl.getInfo(url);

    // Choose highest quality format
    const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });

    // Send the download URL in response
    res.json({ downloadUrl: format.url });
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).json({ error: "Video process karne me error aayi." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
