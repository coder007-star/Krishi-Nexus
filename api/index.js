import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";



dotenv.config();
mongoose.set("strictQuery", true);

// MongoDB Atlas database connection
const DBurl = process.env.databaseURL;

mongoose
.connect(DBurl)
.then(() => {
    console.log("Connected to the database!");
})
.catch((err) => {
    console.error("Database connection error:", err);
});

const PORT = process.env.PORT || 4400;
const app = express();
app.use(cors()); // Allows all origins (for development)

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Crop schema for storing data in MongoDB
const cropSchema = new mongoose.Schema({
  name: String,
  steps: {
    Land_Preparation: String,
    Soil_Testing: String,
    Seed_Selection: String,
    Sowing: String,
    Irrigation: String,
    Weed_Control: String,
    Fertilization: String,
    Disease_and_Pest_Management: String,
    Crop_Monitoring: String,
    Harvesting: String,
    Drying_and_Storage: String,
  },
  cost: String,
});

const Crop = mongoose.model("Crop", cropSchema);

app.get("/", async (req, res) => {
  try {
    res.json({ message: "Hello from server" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get crop cultivation details
app.get("/api/cultivation/:cropName", async (req, res) => {
  try {
    const reqCrop = req.params.cropName.toLowerCase();

    // Find crop case-insensitively using regex
    const foundCrop = await Crop.findOne({
      name: { $regex: new RegExp("^" + reqCrop, "i") },
    });

    if (!foundCrop) {
      return res.status(404).json({ message: "Crop data not found" });
    }

    res.json({ crop: foundCrop });
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* Connecting Backend with ML model */
app.post("/predict", async (req, res) => {
  try {
    console.log(req.body);
    const cropDetails = req.body;
    const userValues = [
      cropDetails.N,
      cropDetails.P,
      cropDetails.K,
      cropDetails.pH,
      cropDetails.rainfall,
      cropDetails.temperature,
    ];
    const data = {
      N: cropDetails.N,
      P: cropDetails.P,
      K: cropDetails.K,
      pH: cropDetails.pH,
      rainfall: cropDetails.rainfall,
      temperature: cropDetails.temperature,
    };

    // Define the URL of your Flask API endpoint
    const url = process.env.API_URL;
    const API_KEY = process.env.API_KEY;

    // Define the headers with the API key
    const headers = {
      api_key: API_KEY,
      "Content-Type": "application/json",
    };

    // Make the POST request to the Flask API
    const response = await axios.post(url, data, { headers });
    const result = response.data.prediction;

    res.json({ prediction: result.trim(), userValues });
  } catch (error) {
    console.error("Error:", error.response || error);
    res.status(500).json({ error: "Error in API call" });
  }
});

// 404 error handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server started on port ${PORT}`);
});
