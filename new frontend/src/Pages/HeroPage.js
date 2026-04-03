import frame from "../images/Frame11.png";

function HeroPage() {
  return (
    <div className="hero">
      <h1>Ask you documents </h1>
      <h1>anything </h1>
      <p>
        Upload PDFs, word files, or text documents and get instant, accurate
        answers powered by AI - NO MORE SEARCHING MANUALLY
      </p>
      <div className="hero-btn">
        <button className="upload-docs">Upload Docs</button>
        <button className="try-demo">Try demo</button>
      </div>
      <div className="upload">
        <h1>Upload & Ask</h1>
      </div>
      <div className="drop">
        <p>Drop your file and start asking questions instantly</p>
      </div>
      
    </div>
  );
}
export default HeroPage;
