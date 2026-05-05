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
        <title>4pf - AI Document Q&A</title>
        <meta name="description" content="Welcome to 4pf." />
        <meta property="og:title" content="Home | 4pf" />
        <meta
          property="og:description"
          content="4pf is an AI Document Q&A is a production-ready tool that allows users to upload PDF documents and ask natural language questions."
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
