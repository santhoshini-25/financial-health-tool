import os
import openai
import json

openai.api_key = os.getenv('OPENAI_API_KEY')

def analyze_financial_health(data_dict, industry):
    prompt = f"""
    Analyze the following financial data for an {industry} SME:
    Revenue: {data_dict['revenue']}
    Expenses: {data_dict['expenses']}
    Provide: Creditworthiness score (1-10), risks, optimization suggestions, product recommendations.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response['choices'][0]['message']['content']