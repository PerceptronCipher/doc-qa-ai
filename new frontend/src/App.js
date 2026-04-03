import "./App.css";
import Hi from "./Pages/Hi";
import Navbar from "./Pages/Navbar";
import HeroPage from "./Pages/HeroPage";
import How from "./Pages/How";
import Features from "./Pages/Features";
import Who from "./Pages/Who";
import Footer from "./Pages/Footer";

function App() {
  return (
    <div className="App1">
      <div className="App">
        <Navbar />
        <HeroPage />
        <Hi />
        <How />
        <Features />
        <Who />
      </div>
      <Footer />
    </div>
  );
}

export default App;
