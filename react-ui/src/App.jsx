import React, { useState } from "react";
import axios from "axios";

function App() {
  const [videoLink, setVideoLink] = useState(""); // YouTube URL
  const [downloadLink, setDownloadLink] = useState(null); // Final download URL
  const [error, setError] = useState(""); // Error state

  const handleDownload = async () => {
    setError(""); // Reset error on new click
    try {
      // Backend se request bhej rahe hain
      const response = await axios.post("http://localhost:5000/api/download", {
        url: videoLink,
      });

      if (response.data && response.data.downloadUrl) {
        setDownloadLink(response.data.downloadUrl); // Successful download link
      }
    } catch (err) {
      setError("URL invalid hai ya koi aur error hai.");
      console.error(err); // Console me error print karein
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)} // Input field update
        placeholder="YouTube video URL yahan daalein"
      />
      <button onClick={handleDownload}>Download</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {downloadLink && (
        <div>
          <a href={downloadLink} download>
            Click here to download
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
