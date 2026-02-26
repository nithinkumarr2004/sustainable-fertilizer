# AI Model for Fertilizer Recommendation

This directory contains the machine learning models for fertilizer recommendation.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Generate dataset:
```bash
python generate_dataset.py
```

3. Train models:
```bash
python train_model.py
```

4. Run Flask API:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```

### Prediction
```
POST /predict
Content-Type: application/json

{
  "nitrogen": 45,
  "phosphorus": 30,
  "potassium": 35,
  "ph": 6.5,
  "moisture": 55,
  "temperature": 25,
  "crop_type": "Wheat"
}
```

## Model Files

- `fertilizer_type_model.pkl` - Random Forest classifier for fertilizer type
- `fertilizer_quantity_model.pkl` - Random Forest regressor for quantity
- `soil_health_model.pkl` - Random Forest regressor for soil health score
- `label_encoder.pkl` - Label encoder for crop types
