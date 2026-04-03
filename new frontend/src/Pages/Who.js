import star from "../images/Star 1.png";

function How() {
  return (
    <div className="who">
      <div className="howHeading">How it works</div>
      <div className="howList">
        <div className="hl">
          <img src={star} />
          <li>Students</li>
        </div>
        <div className="hl">
          <img src={star} />
          <li>AI optimize it</li>
        </div>
        <div className="hl">
          <img src={star} />
          <li>Legal Teams</li>
        </div>
        <div className="hl">
          <img src={star} />
          <li>Developers</li>
        </div>
      </div>
    </div>
  );
}
export default How;
