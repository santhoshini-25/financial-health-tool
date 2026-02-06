import pandas as pd
from cryptography.fernet import Fernet
import os
from io import BytesIO  # Add this for handling bytes

cipher = Fernet(os.getenv('SECRET_KEY').encode())

def process_uploaded_file(file_bytes, file_type):
    if file_type == 'csv':
        df = pd.read_csv(BytesIO(file_bytes))  # Use BytesIO for bytes
    elif file_type == 'xlsx':
        df = pd.read_excel(BytesIO(file_bytes))  # Use BytesIO for bytes
    elif file_type == 'pdf':
        import tabula
        df = tabula.read_pdf(BytesIO(file_bytes), pages='all')[0]  # Use BytesIO for bytes
    else:
        raise ValueError("Unsupported file type")
    
    # Encrypt sensitive data
    encrypted_data = cipher.encrypt(str(df.to_json()).encode())
    return encrypted_data.decode()

def decrypt_data(encrypted_str):
    return cipher.decrypt(encrypted_str.encode()).decode()