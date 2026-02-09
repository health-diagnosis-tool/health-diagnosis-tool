from fastapi import FastAPI
from pydantic import BaseModel
import re
from fastapi import HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware

import uuid


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


users_db = {}
tokens_db = {}


SYMPTOM_KEYWORDS = [
    "fever",
    "cough",
    "headache",
    "nausea",
    "fatigue",
    "chest pain",
    "sore throat",
    "vomiting",
    "diarrhea"
]


class SymptomInput(BaseModel):
    text: str

class UserRegister(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str


def extract_symptoms(text):
    found = []
    text = text.lower()

    for symptom in SYMPTOM_KEYWORDS:
        if symptom in text:
            found.append(symptom)

    return found


def extract_duration(text):
    match = re.search(r'(\d+)\s*(day|days|week|weeks)', text.lower())
    if match:
        number = int(match.group(1))
        unit = match.group(2)

        if "week" in unit:
            return number * 7
        return number

    return 0


def calculate_risk(symptoms, duration):
    score = 0

    if len(symptoms) >= 3:
        score += 1

    if duration >= 3:
        score += 1

    if "chest pain" in symptoms:
        score += 2

    if score == 0:
        return "Low"
    elif score <= 2:
        return "Moderate"
    else:
        return "High"


def get_recommendation(risk):
    if risk == "Low":
        return "Monitor symptoms for 24-48 hours."
    elif risk == "Moderate":
        return "Consider consulting a doctor."
    else:
        return "Seek medical attention immediately."



@app.get("/")
def home():
    return {"message": "Backend is working"}

def get_current_user(token: str = Header(...)):
    if token not in tokens_db:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    return tokens_db[token]


@app.post("/analyze")
def analyze(data: SymptomInput, username: str = Depends(get_current_user)):
    text = data.text

    symptoms = extract_symptoms(text)
    duration = extract_duration(text)
    risk = calculate_risk(symptoms, duration)
    recommendation = get_recommendation(risk)

    return {
        "input_text": text,
        "extracted_symptoms": symptoms,
        "duration_days": duration,
        "risk_level": risk,
        "recommendation": recommendation
    }


@app.post("/register")
def register(user: UserRegister):
    if user.username in users_db:
        return {"error": "User already exists"}
    users_db[user.username] = user.password
    return {"message": "Registered"}


@app.post("/login")
def login(user: UserLogin):
    if user.username not in users_db:
        return {"error": "User not found"}

    if users_db[user.username] != user.password:
        return {"error": "Wrong password"}

    token = str(uuid.uuid4())
    tokens_db[token] = user.username
    return {"token": token}
