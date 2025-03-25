from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import numpy as np
import random
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Configure CORS properly
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Load the saved model and scaler
model = joblib.load('./prediction_data_and_model/xgb_model.pkl')
scaler = joblib.load('./prediction_data_and_model/scaler.pkl')

# Feature names for importance mapping
FEATURE_NAMES = [
    'Hydraulic Pressure',
    'Oil Temperature',
    'Blade RPM',
    'Fuel Consumption',
    'Blade Sharpness'
]

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '', 204

    # Generate random sensor data
    Hydraulic_Pressure = random.randint(145,300)
    Hydraulic_Oil_Temperature = random.randint(20,85)
    Saw_Blade_RPM = random.randint(700,2700)
    Fuel_Consumption = random.randint(10,24)
    Blade_Sharpness_Level = random.randint(29,100)

    sensor_array = [Hydraulic_Pressure, Hydraulic_Oil_Temperature, Saw_Blade_RPM, Fuel_Consumption, Blade_Sharpness_Level]
    sensor_data = np.array([sensor_array])
    
    # Scale the data
    scaled_data = scaler.transform(sensor_data)
    
    # Get prediction and probabilities
    prediction = int(model.predict(scaled_data))
    probabilities = model.predict_proba(scaled_data)[0]
    confidence = float(max(probabilities))
    
    # Get feature importance
    feature_importance = model.feature_importances_
    feature_importance_dict = [
        {"name": name, "importance": float(imp)}
        for name, imp in zip(FEATURE_NAMES, feature_importance)
    ]
    
    # Translate prediction to readable message
    if prediction == 0:
        prediction = "All good"
    elif prediction == 1:
        prediction = "Maintenance Due!"
    else:
        prediction = "Repair / Replace"

    # Color alerts logic
    if Hydraulic_Pressure in range(180,280):
        Hydraulic_Pressure_color = "green"
    elif Hydraulic_Pressure in range(175,180) or Hydraulic_Pressure in range(280,290):
        Hydraulic_Pressure_color = "yellow"
    elif Hydraulic_Pressure <= 175 or Hydraulic_Pressure >= 290:
        Hydraulic_Pressure_color = "red"

    if Hydraulic_Oil_Temperature in range(30,65):
        Hydraulic_Oil_Temperature_color = "green"
    elif Hydraulic_Oil_Temperature in range(25,30) or Hydraulic_Oil_Temperature in range(65,70):
        Hydraulic_Oil_Temperature_color = "yellow"
    elif Hydraulic_Oil_Temperature <= 25 or Hydraulic_Oil_Temperature >= 70:
        Hydraulic_Oil_Temperature_color = "red"

    if Saw_Blade_RPM in range(800,2500):
        Saw_Blade_RPM_color = "green"
    elif Saw_Blade_RPM in range(750,800) or Saw_Blade_RPM in range(2500,2550):
        Saw_Blade_RPM_color = "yellow"
    elif Saw_Blade_RPM <= 750 or Saw_Blade_RPM >= 2550:
        Saw_Blade_RPM_color = "red"

    if Fuel_Consumption in range(10,20):
        Fuel_Consumption_color = "green"
    elif Fuel_Consumption in range(20,23):
        Fuel_Consumption_color = "yellow"
    elif Fuel_Consumption >= 23:
        Fuel_Consumption_color = "red"

    if Blade_Sharpness_Level in range(75,100):
        Blade_Sharpness_Level_color = "green"
    elif Blade_Sharpness_Level in range(50,75):
        Blade_Sharpness_Level_color = "yellow"
    elif Blade_Sharpness_Level >= 49:
        Blade_Sharpness_Level_color = "red"

    response = jsonify({
        'prediction': prediction,
        'confidence': confidence,
        'feature_importance': feature_importance_dict,
        'sensor_data': [{
            'Hydraulic_Pressure': Hydraulic_Pressure, 
            'Hydraulic_Oil_Temperature': Hydraulic_Oil_Temperature,
            'Saw_Blade_RPM': Saw_Blade_RPM,
            'Fuel_Consumption': Fuel_Consumption,
            'Blade_Sharpness_Level': Blade_Sharpness_Level
        }],
        'color': [{
            'Hydraulic_Pressure': Hydraulic_Pressure_color, 
            'Hydraulic_Oil_Temperature': Hydraulic_Oil_Temperature_color,
            'Saw_Blade_RPM': Saw_Blade_RPM_color,
            'Fuel_Consumption': Fuel_Consumption_color,
            'Blade_Sharpness_Level': Blade_Sharpness_Level_color
        }]
    })
    
    return response

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host="127.0.0.1", port=5002)
