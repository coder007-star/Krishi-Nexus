import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CultivationSteps from "../components/CultivationSteps";
import EstimatedCost from "../components/EstimatedCost";

const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setError(null);     // ✅ Clear previous error
    setLoading(true);   // Reset loading for new fetch
    fetch(`${VITE_BACKEND_API}/api/cultivation/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Crop data not found.");
        return res.json();
      })
      .then((data) => {
        if (!data.crop) throw new Error("Crop details will be available soon.");
        setCrop(data.crop);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/crop/${search.trim().toLowerCase()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a crop..."
          className="border border-gray-400 px-4 py-2 rounded-md mr-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition duration-300"
        >
          Search
        </button>
      </div>

      {/* Conditional Content */}
      {loading ? (
        <p className="text-center text-blue-500">Loading crop data...</p>
      ) : error ? (
        <div key={id} className="text-center text-gray-600 p-6">
          <h2 className="text-2xl font-semibold text-red-500">Oops! {error}</h2>
          <p className="mt-2">We're working on adding more details. Please check back later.</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl text-center font-bold text-green-600">{crop.name} Cultivation Guide</h1>
          <CultivationSteps steps={crop.steps} />
          <EstimatedCost cost={crop.cost} />
        </>
      )}
    </div>
  );
};

export default CropDetails;
