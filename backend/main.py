from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from data_processor import process_uploaded_file, decrypt_data
from ai_analyzer import analyze_financial_health
from integrations import fetch_banking_data, fetch_razorpay_data
import json
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), industry: str = "Manufacturing"):
    data = process_uploaded_file(await file.read(), file.filename.split('.')[-1])
    decrypted = decrypt_data(data)
    data_dict = json.loads(decrypted)  # The dict with revenue/expenses
    insights = analyze_financial_health(data_dict, industry)
    return {"insights": insights, "data": data_dict}  # Return both