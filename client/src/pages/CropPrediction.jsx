import { useState, useCallback } from "react";
import axios from "axios";

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cropApi = import.meta.env.VITE_CROP_API;

  const fieldLimits = {
    N: [0, 200],
    P: [0, 150],
    K: [0, 150],
    temperature: [0, 50],
    humidity: [0, 100],
    ph: [0, 14],
    rainfall: [0, 500],
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    if (numValue < fieldLimits[name][0] || numValue > fieldLimits[name][1]) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Enter between ${fieldLimits[name][0]} - ${fieldLimits[name][1]}`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    if (Object.values(errors).some((msg) => msg)) {
      setError("Please correct the input errors.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(cropApi, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setPrediction(res.data.predicted_label);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold text-center text-green-700 mb-4">
        Crop Prediction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <label className="text-gray-700 font-medium capitalize w-24">
              {key} :
            </label>
            <div className="flex-1">
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`${fieldLimits[key][0]} - ${fieldLimits[key][1]}`}
                required
                className={`w-full p-2 border rounded-md focus:outline-none ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
                style={{ appearance: "none" }}
              />
              {errors[key] && (
                <p className="text-red-500 text-sm">{errors[key]}</p>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className={`w-full py-2 rounded-md transition-all mt-3 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Predicting...
            </span>
          ) : (
            "Get Prediction"
          )}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

      {prediction && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 font-semibold text-center rounded-md shadow-md">
          <p className="mb-2">Recommended Crop: {prediction}</p>
          <a
            href={`/crop/${prediction.toLowerCase()}`} // Dynamically generating the URL
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            View Cultivation Guide
          </a>
        </div>
      )}
    </div>
  );
};

export default CropPrediction;
