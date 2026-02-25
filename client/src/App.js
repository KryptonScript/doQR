import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    setError("");
    setQrImage("");
    setLoading(true);

    try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setQrImage(data.qrImage);
    }
    
  } catch (err) {
    setError("Server connection failed");
  }

  setLoading(false);
  }

  return (
    <div className="container">
      <h1>doQR - QR Code Generator</h1>

      <input type="text"
      placeholder="Please enter URL here:) - (include https://)"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      className="inputUrl" />

      <br /><br />

      <button onClick={generateQR} className="generateBtn">
        {loading ? "Generating..." : "Generate"}
        Generate
      </button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {qrImage && (
        <>
        <img src={qrImage} alt="QR Code" />
        <br /><br />
        <a href={qrImage} download="qr-code.jpeg">
          <button style={{ padding: "8px 16px"}}>
            Download QR
          </button>
        </a>
        </>
        )}
    </div>
  );
}

export default App;