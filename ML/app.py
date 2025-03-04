from flask import Flask, request, jsonify
import pickle
import numpy as np

# Load the trained model and scalers
randclf = pickle.load(open('model.pkl', 'rb'))
mx = pickle.load(open('minmaxscaler.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))

app = Flask(__name__)

@app.route('/')
def home():
    return "Crop Recommendation API"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data instead of JSON
        data = request.form

        # Validate required fields
        required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Extract feature values
        input_data = np.array([[float(data['N']), float(data['P']), float(data['K']), 
                                float(data['temperature']), float(data['humidity']), 
                                float(data['ph']), float(data['rainfall'])]])
        
        # Scale the input data
        input_data_scaled = mx.transform(input_data)
        input_data_scaled = sc.transform(input_data_scaled)

        # Make prediction
        prediction = randclf.predict(input_data_scaled)

        return jsonify({'predicted_label': prediction[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400  # Return HTTP 400 for bad requests

# Handle 404 errors
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
