from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import os  # For dynamic port assignment

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Load ML model and scalers with exception handling
try:
    randclf = pickle.load(open("model.pkl", "rb"))
    mx = pickle.load(open("minmaxscaler.pkl", "rb"))
    sc = pickle.load(open("standscaler.pkl", "rb"))
except Exception as e:
    print(f"Error loading models: {e}")
    randclf, mx, sc = None, None, None  # Prevent app crash

@app.route("/")
def home():
    return "ML Model API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("Received JSON:", data)

        # Validate input
        required_fields = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Convert input to numpy array
        input_data = np.array([[float(data[field]) for field in required_fields]])

        # Apply scaling
        input_data_scaled = sc.transform(mx.transform(input_data))

        # Predict result
        prediction = randclf.predict(input_data_scaled)

        return jsonify({"predicted_label": prediction[0]})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Use dynamic port for Render
    app.run(host="0.0.0.0", port=port)
