# llama_module.py

import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.1:8b"


def llama_request(prompt):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.1,
                "num_predict": 300
            }
        }
    )
    return response.json()["response"]


def translate_text(text):
    prompt = f"""
Translate the following text to English.
Only return the translated sentence.
Do not include explanations.
Do not include markdown.
Do not include extra text.
Do not include any notes.

Text: "{text}"
"""
    return llama_request(prompt)


def extract_data(text):
    prompt = f"""
You are a clinical compliance assistant.

Return ONLY valid JSON.
Do not include explanations.
Do not include markdown.
Do not include extra text.
ALL JSON fields must be filled.

If there is any injury to the client/participant, the minimum 'severity' category should be medium.
Any hospitalisation should be classified as 'high' and 'escalation_required' should be 'yes'.

Required JSON format:
{{
  "incident": "yes or no",
  "category": "health, behaviour, admin, other",
  "severity": "low, medium, high",
  "escalation_required": "yes or no"
}}

Case note:
---START---
{text}
---END---
"""
    return llama_request(prompt)