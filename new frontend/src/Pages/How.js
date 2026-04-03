import frame from "../images/Frame13.png";
import frame1 from "../images/Frame12.png";

function How() {
  return (
    <div className="how">
      <div>
        <h1>How it works</h1>
      </div>
      <div className="how-container">
        <div className="how-cards">
          <img src={frame} />
          <h3>Upload document</h3>
          <p>Add your document, paste text, or import a URL</p>
        </div>
        <div className="how-cards">
          <img src={frame} />
          <h3>AI understands it</h3>
          <p>The system processes and indexes your content</p>
        </div>
        <div className="how-cards">
          <img src={frame1} />
          <h3>Ask Questions</h3>
          <p>Type anything related to the document</p>
        </div>
      </div>
    </div>
  );
}
export default How;
