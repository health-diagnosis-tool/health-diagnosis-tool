from fastapi import FastAPI
from pydantic import BaseModel

# Create FastAPI app
app = FastAPI(title="AI Disease Diagnosis System")

# Input model
class SymptomsInput(BaseModel):
    symptoms: str

# Health check route
@app.get("/")
def home():
    return {"message": "Backend is running successfully"}

# Prediction route (dummy for now)
@app.post("/predict")
@app.post("/predict")
def predict_disease(data: SymptomsInput):

    if not data.symptoms or data.symptoms.strip() == "":
        raise HTTPException(
            status_code=400,
            detail="Symptoms input cannot be empty"
        )

    cleaned_symptoms = clean_symptoms(data.symptoms)

    # If ML model not loaded yet
    if model is None or vectorizer is None:
        return {
            "predictions": [],
            "message": "ML model not loaded yet",
            "cleaned_input": cleaned_symptoms,
            "disclaimer": "This is not a medical diagnosis. Consult a doctor."
        }

    try:
        X = vectorizer.transform([cleaned_symptoms])
        probabilities = model.predict_proba(X)[0]
        diseases = model.classes_

        top_indices = probabilities.argsort()[-3:][::-1]

        top_predictions = [
            {
                "disease": diseases[i],
                "confidence": round(float(probabilities[i]), 2)
            }
            for i in top_indices
        ]

        return {
            "predictions": top_predictions,
            "cleaned_input": cleaned_symptoms,
            "disclaimer": "This is not a medical diagnosis. Consult a doctor."
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Prediction failed due to internal error"
        )

