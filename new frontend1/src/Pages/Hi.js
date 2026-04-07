import { useState, useRef } from "react";

const BACKEND_URL = "https://doc-qa-ai-1.onrender.com"; // make sure this is correct

function Paste() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("english");

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) {
        setMessage(`❌ ${data.error}`);
      } else {
        setMessage(`✅ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAskAI = () => {
    if (!file) {
      setMessage("⚠️ Upload a document first before asking AI");
      return;
    }
    setAnswer("");
    setQuestionModal(true);
  };

  const handleSubmitQuestion = async () => {
    if (!question) return;

    const formData = new FormData();
    formData.append("question", question);

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) {
        setAnswer(`❌ ${data.error}`);
      } else {
        setAnswer(data.answer);
      }
    } catch (err) {
      console.error(err);
      setAnswer("❌ Request failed. Error Connecting...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="upload"
      style={{ textAlign: "center", padding: "50px 20px" }}
    >
      <h1>Upload Your PDF</h1>

      {/* Styled file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <button
        onClick={triggerFileSelect}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {file ? `📄 ${file.name}` : "Choose PDF"}
      </button>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#4f6084",
          color: "white",
          cursor: "pointer",
          marginLeft: "15px",
        }}
      >
        {loading ? "Processing..." : "Upload & Index"}
      </button>

      {/* Message */}
      {message && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#f0f8ff",
            color: "#2563eb",
            padding: "15px",
            borderRadius: "10px",
            maxWidth: "700px",
            margin: "20px auto",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

      {/* Language buttons */}
      <div style={{ margin: "30px 0" }}>
        {["english", "spanish", "french", "german"].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            style={{
              padding: "10px 20px",
              margin: "0 10px 10px 0",
              borderRadius: "8px",
              border:
                language === lang ? "2px solid #2563eb" : "1px solid #ccc",
              backgroundColor: language === lang ? "#2563eb" : "white",
              color: language === lang ? "white" : "#333",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      {/* Ask AI button */}
      <button
        onClick={handleAskAI}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#4f6084",
          color: "white",
          cursor: "pointer",
        }}
      >
        Ask AI
      </button>

      {/* Modal */}
      {questionModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setQuestionModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "15px",
              maxWidth: "600px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h2>Ask AI about the document</h2>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              style={{
                width: "100%",
                height: "120px",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                marginTop: "20px",
                fontSize: "16px",
              }}
            ></textarea>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleSubmitQuestion}
                disabled={loading}
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {loading ? "Fetching..." : "Submit"}
              </button>
              <button
                onClick={() => setQuestionModal(false)}
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#ccc",
                  color: "#333",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>

            {answer && (
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                  backgroundColor: "#f0f8ff",
                  padding: "20px",
                  borderRadius: "10px",
                  whiteSpace: "pre-wrap",
                  maxHeight: "300px",
                  overflowY: "auto",
                  fontWeight: "500",
                  color: "#2563eb",
                }}
              >
                <h3>Answer:</h3>
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Paste;
