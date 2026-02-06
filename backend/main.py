from data_processor import process_uploaded_file, decrypt_data
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, UploadFile, File
from data_processor import process_uploaded_file
from ai_analyzer import analyze_financial_health
from integrations import fetch_banking_data, fetch_razorpay_data

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), industry: str = "Manufacturing"):
    data = process_uploaded_file(await file.read(), file.filename.split('.')[-1])
    # Decrypt and analyze
    decrypted = decrypt_data(data)
    insights = analyze_financial_health(json.loads(decrypted), industry)
    return {"insights": insights}

@app.get("/integrate-banking")  # Plaid
def integrate_banking(user_id: int):
    return fetch_banking_data(user_id)

@app.get("/integrate-razorpay")  # Razorpay
def integrate_razorpay(user_id: int):
    return fetch_razorpay_data(user_id)
# Add endpoints for GST, reports, etc.