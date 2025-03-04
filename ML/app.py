from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

# Load the trained model and scalers
randclf = pickle.load(open('model.pkl', 'rb'))
mx = pickle.load(open('minmaxscaler.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if request is JSON or form-data
        if request.is_json:
            data = request.get_json()
            print("Received JSON:", data)
        else:
            data = request.form
            print("Received Form Data:", data)

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
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
