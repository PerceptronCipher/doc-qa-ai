import vector from "../images/Vector.png";

function Features() {
  return (
    <div>
      <div className="features">
        <h1>Features</h1>
        <p>Built for Speed, Accuracy, and Simplicity</p>
      </div>

      <div className="how-container">
        <div className="features-cards">
          <img src={vector} />
          <h3>Context-Aware Answers</h3>
          <p>Answers are grounded strictly in your document</p>
        </div>
        <div className="features-cards">
          <img src={vector} />
          <h3>Instant Responses</h3>
          <p>Get results in seconds</p>
        </div>
        <div className="features-cards">
          <img src={vector} />
          <h3>Multi-Document Support</h3>
          <p>Work with multiple files at once</p>
        </div>
        <div className="features-cards">
          <img src={vector} />
          <h3> Smart Search</h3>
          <p>Find specific details without scrolling</p>
        </div>
      </div>
    </div>
  );
}
export default Features;
