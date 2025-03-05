import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CropPrediction from "./pages/CropPrediction";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Weather from "./pages/Weather";
import CropDetails from "./pages/CropDetails";

function App() {
  return (
    <Router>
      {/* Navbar - Fixed at the top */}
      <Navbar />

      {/* Main layout with min-height and footer sticking at bottom */}
      <div className="flex flex-col min-h-screen pt-16">
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/crop/:id" element={<CropDetails />} />
            <Route path="/crop" element={<CropPrediction />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </main>

        {/* Footer - Sticks to bottom if content is short */}
        <Footer className="w-full mt-auto" />
      </div>
    </Router>
  );
}

export default App;
