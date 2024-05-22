from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)


model = joblib.load('chronickidney-disease-latest-4')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        
        try:
            data = np.array(data).reshape(1, -1)
        except Exception as e:
            return jsonify({'error': f'Error in data format: {e}'}), 400

       
        prediction = model.predict(data)
        return jsonify({'prediction': prediction.tolist()})
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {e}'}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
