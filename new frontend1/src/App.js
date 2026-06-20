import "./App.css";
import Hi from "./Pages/Hi";
import Navbar from "./Pages/Navbar";
import HeroPage from "./Pages/HeroPage";
import How from "./Pages/How";
import Features from "./Pages/Features";
import Who from "./Pages/Who";
import Footer from "./Pages/Footer";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <div className="App1">
      <Helmet>
        <title>Rader - AI Document Q&A</title>
        <meta name="description" content="Welcome to Rader." />
        <meta property="og:title" content="Home | Rader" />
        <meta
          property="og:description"
          content="Rader is an AI Document Q&A is a production-ready tool that allows users to upload PDF documents and ask natural language questions."
        />
      </Helmet>
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
