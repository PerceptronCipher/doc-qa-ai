import { useRef, useState } from "react";
import frame from "../images/Frame11.png";

function Hi() {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleAsk = async () => {
    const question = prompt("Enter your question");
    if (!question) return;

    const formData = new FormData();
    formData.append("question", question);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      console.error(err);
      alert("Failed to get answer");
    }
  };

  return (
    <div className="hi">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="frame">
        <img src={frame} alt="Frame11" onClick={handleClick} />
      </div>

      <p>Ask a question about your document</p>

      <button className="ask" onClick={handleAsk}>
        Ask Ai
      </button>
      <button className="upload-docs" onClick={handleUpload}>
        Upload PDF
      </button>

      {response && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <strong>Answer:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default Hi;
