"""
Flask API for fertilizer recommendation predictions
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load models
fertilizer_model = None
quantity_model = None
health_model = None
label_encoder = None

MODEL_BUNDLE_PATH = os.getenv('MODEL_BUNDLE_PATH', os.path.join(BASE_DIR, 'model.pkl'))

@app.route('/')
def home():
    return jsonify({
        "status": "online",
        "message": "AI Model API is running"
    })

def load_models():
    global fertilizer_model, quantity_model, health_model, label_encoder
    try:
        # Change to script directory to ensure relative paths work
        original_dir = os.getcwd()
        os.chdir(BASE_DIR)
        
        try:
            if os.path.exists(MODEL_BUNDLE_PATH):
                print(f"Loading bundled models from {MODEL_BUNDLE_PATH} ...")
                bundle = joblib.load(MODEL_BUNDLE_PATH)
                fertilizer_model = bundle['fertilizer_model']
                quantity_model = bundle['quantity_model']
                health_model = bundle['health_model']
                label_encoder = bundle['label_encoder']
                print("[OK] Model bundle loaded successfully!")
                return

            # Fallback to legacy individual files
            print("Bundled model not found. Falling back to individual model files...")
            fertilizer_model = joblib.load(os.path.join(BASE_DIR, 'fertilizer_type_model.pkl'))
            quantity_model = joblib.load(os.path.join(BASE_DIR, 'fertilizer_quantity_model.pkl'))
            health_model = joblib.load(os.path.join(BASE_DIR, 'soil_health_model.pkl'))
            label_encoder = joblib.load(os.path.join(BASE_DIR, 'label_encoder.pkl'))
            print("[OK] Individual models loaded successfully!")
        finally:
            # Restore original directory
            os.chdir(original_dir)
    except Exception as e:
        print(f"Error loading models: {e}")
        import traceback
        traceback.print_exc()
        fertilizer_model = None
        quantity_model = None
        health_model = None
        label_encoder = None

load_models()

def apply_crop_specific_adjustments(crop_type, fertilizer_type, quantity, nitrogen, phosphorus, potassium):
    """Apply crop-specific adjustments to recommendations"""
    
    # Crop-specific preferences and requirements
    crop_rules = {
        'Wheat': {
            'prefers': 'N',
            'base_quantity': 60,
            'needs_high_n': True
        },
        'Rice': {
            'prefers': 'N',
            'base_quantity': 80,
            'needs_high_n': True
        },
        'Corn': {
            'prefers': 'N',
            'base_quantity': 70,
            'needs_high_n': True
        },
        'Soybean': {
            'prefers': 'P',
            'base_quantity': 40,
            'needs_high_p': True,
            'fixes_n': True  # Fixes nitrogen, needs less
        },
        'Cotton': {
            'prefers': 'K',
            'base_quantity': 65,
            'needs_high_k': True
        },
        'Tomato': {
            'prefers': 'Mixed',
            'base_quantity': 55,
            'needs_balanced': True
        },
        'Potato': {
            'prefers': 'P',
            'base_quantity': 75,
            'needs_high_p': True
        },
        'Sugarcane': {
            'prefers': 'K',
            'base_quantity': 90,
            'needs_high_k': True
        }
    }
    
    crop_info = crop_rules.get(crop_type, {})
    
    # Adjust fertilizer type based on crop needs and preferences
    # For crops that prefer specific nutrients, adjust even if balanced
    if crop_info.get('prefers'):
        prefer = crop_info['prefers']
        
        # If soil is balanced but crop prefers specific nutrient, consider that preference
        if fertilizer_type == 'Organic':
            # Check if we should recommend crop-specific fertilizer
            if prefer == 'N' and nitrogen < 50:
                fertilizer_type = 'N'
            elif prefer == 'P' and phosphorus < 45:
                fertilizer_type = 'P'
            elif prefer == 'K' and potassium < 50:
                fertilizer_type = 'K'
            elif prefer == 'Mixed':
                fertilizer_type = 'Mixed'
    
    # Adjust for deficiencies
    if crop_info.get('needs_high_n') and nitrogen < 40:
        if fertilizer_type == 'Organic' and nitrogen < 35:
            fertilizer_type = 'N'
    elif crop_info.get('needs_high_p') and phosphorus < 30:
        if fertilizer_type == 'Organic' and phosphorus < 25:
            fertilizer_type = 'P'
    elif crop_info.get('needs_high_k') and potassium < 35:
        if fertilizer_type == 'Organic' and potassium < 30:
            fertilizer_type = 'K'
    
    # Adjust quantity based on crop-specific base quantities
    if crop_info.get('base_quantity'):
        base_qty = crop_info['base_quantity']
        # Scale the quantity relative to crop-specific base
        quantity_ratio = quantity / 50  # Original base was 50
        quantity = base_qty * quantity_ratio
        
        # Additional adjustments
        if crop_type in ['Rice', 'Sugarcane']:
            quantity *= 1.1  # Need more fertilizer
        elif crop_type == 'Soybean':
            quantity *= 0.8  # Needs less (fixes N)
    
    return fertilizer_type, max(20, min(quantity, 200))  # Keep within reasonable bounds

def analyze_deficiencies(nitrogen, phosphorus, potassium, ph):
    """Analyze nutrient deficiencies"""
    deficiencies = []
    
    if nitrogen < 30:
        deficiencies.append({
            'nutrient': 'Nitrogen',
            'level': nitrogen,
            'status': 'Deficient',
            'severity': 'High' if nitrogen < 20 else 'Moderate',
            'recommendation': 'Apply nitrogen-rich fertilizer immediately'
        })
    elif nitrogen > 70:
        deficiencies.append({
            'nutrient': 'Nitrogen',
            'level': nitrogen,
            'status': 'Excessive',
            'severity': 'High' if nitrogen > 80 else 'Moderate',
            'recommendation': 'Reduce nitrogen application'
        })
    
    if phosphorus < 25:
        deficiencies.append({
            'nutrient': 'Phosphorus',
            'level': phosphorus,
            'status': 'Deficient',
            'severity': 'High' if phosphorus < 15 else 'Moderate',
            'recommendation': 'Apply phosphorus-rich fertilizer'
        })
    elif phosphorus > 60:
        deficiencies.append({
            'nutrient': 'Phosphorus',
            'level': phosphorus,
            'status': 'Excessive',
            'severity': 'High' if phosphorus > 70 else 'Moderate',
            'recommendation': 'Reduce phosphorus application'
        })
    
    if potassium < 30:
        deficiencies.append({
            'nutrient': 'Potassium',
            'level': potassium,
            'status': 'Deficient',
            'severity': 'High' if potassium < 20 else 'Moderate',
            'recommendation': 'Apply potassium-rich fertilizer'
        })
    elif potassium > 70:
        deficiencies.append({
            'nutrient': 'Potassium',
            'level': potassium,
            'status': 'Excessive',
            'severity': 'High' if potassium > 80 else 'Moderate',
            'recommendation': 'Reduce potassium application'
        })
    
    ph_status = 'Optimal'
    ph_recommendation = ''
    if ph < 6.0:
        ph_status = 'Acidic'
        ph_recommendation = 'Apply lime to raise pH'
    elif ph > 7.5:
        ph_status = 'Alkaline'
        ph_recommendation = 'Apply sulfur or organic matter to lower pH'
    
    deficiencies.append({
        'nutrient': 'pH',
        'level': ph,
        'status': ph_status,
        'severity': 'None' if 6.0 <= ph <= 7.5 else 'Moderate',
        'recommendation': ph_recommendation if ph_recommendation else 'pH is in optimal range'
    })
    
    return deficiencies

def generate_improvement_suggestions(nitrogen, phosphorus, potassium, ph, moisture, temperature, crop_type, fertilizer_type, health_score):
    """Generate improvement suggestions"""
    suggestions = []
    
    if health_score < 60:
        suggestions.append("⚠️ Soil health is below optimal. Consider regular soil testing and balanced fertilization.")
    
    if fertilizer_type == 'Organic':
        suggestions.append("✓ Use organic fertilizers like compost, manure, or bio-fertilizers for sustainable farming.")
    elif fertilizer_type == 'Mixed':
        suggestions.append("📊 Mixed fertilizer recommended. Use NPK blend based on specific crop requirements.")
    
    if moisture < 40:
        suggestions.append("💧 Soil moisture is low. Implement proper irrigation practices.")
    elif moisture > 60:
        suggestions.append("🌧️ Soil moisture is high. Improve drainage to prevent waterlogging.")
    
    if temperature < 20:
        suggestions.append("🌡️ Low temperature detected. Consider using mulch or protective covers.")
    elif temperature > 30:
        suggestions.append("🌡️ High temperature detected. Ensure adequate irrigation and shade management.")
    
    crop_suggestions = {
        'Wheat': 'Apply nitrogen in split doses during tillering and flowering stages.',
        'Rice': 'Maintain water level and apply balanced NPK during transplanting.',
        'Corn': 'Apply nitrogen during V6 and tasseling stages for better yield.',
        'Soybean': 'Inoculate seeds with Rhizobium for nitrogen fixation.',
        'Cotton': 'Apply potassium during boll development stage.',
        'Tomato': 'Maintain consistent moisture and apply calcium to prevent blossom end rot.',
        'Potato': 'Apply phosphorus during tuber initiation for better development.',
        'Sugarcane': 'Apply higher potassium during grand growth period.'
    }
    
    if crop_type in crop_suggestions:
        suggestions.append(f"🌾 {crop_suggestions[crop_type]}")
    
    if len(suggestions) == 0:
        suggestions.append("✓ Soil conditions are good. Maintain current practices and monitor regularly.")
    
    return suggestions

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'models_loaded': fertilizer_model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Main prediction endpoint"""
    try:
        if fertilizer_model is None or quantity_model is None or health_model is None:
            return jsonify({'error': 'Models not loaded'}), 500
        
        data = request.json
        
        # Extract features
        nitrogen = float(data.get('nitrogen', 0))
        phosphorus = float(data.get('phosphorus', 0))
        potassium = float(data.get('potassium', 0))
        ph = float(data.get('ph', 7.0))
        moisture = float(data.get('moisture', 50))
        temperature = float(data.get('temperature', 25))
        crop_type = data.get('crop_type', 'Wheat')
        
        # Encode crop type
        if crop_type in label_encoder.classes_:
            crop_encoded = label_encoder.transform([crop_type])[0]
        else:
            crop_encoded = 0  # Default to first crop
        
        # Prepare feature array
        features = np.array([[nitrogen, phosphorus, potassium, ph, moisture, temperature, crop_encoded]])
        
        # Predict
        fertilizer_type = fertilizer_model.predict(features)[0]
        quantity = float(quantity_model.predict(features)[0])
        health_score = float(health_model.predict(features)[0])
        
        # Apply crop-specific adjustments to make recommendations more crop-aware
        fertilizer_type, quantity = apply_crop_specific_adjustments(
            crop_type, fertilizer_type, quantity, nitrogen, phosphorus, potassium
        )
        
        # Analyze deficiencies
        deficiencies = analyze_deficiencies(nitrogen, phosphorus, potassium, ph)
        
        # Generate suggestions
        suggestions = generate_improvement_suggestions(
            nitrogen, phosphorus, potassium, ph, moisture, temperature, 
            crop_type, fertilizer_type, health_score
        )
        
        # Prepare response
        response = {
            'fertilizer_type': fertilizer_type,
            'quantity_kg_per_acre': round(quantity, 2),
            'soil_health_score': round(health_score, 2),
            'deficiency_analysis': deficiencies,
            'improvement_suggestions': suggestions,
            'input_data': {
                'nitrogen': nitrogen,
                'phosphorus': phosphorus,
                'potassium': potassium,
                'ph': ph,
                'moisture': moisture,
                'temperature': temperature,
                'crop_type': crop_type
            }
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    # Load models before starting the server
    load_models()
    
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Flask API server on port {port}...")
    # debug=False in production for security
    app.run(host='0.0.0.0', port=port, debug=False)
