# llm_module.py

import requests

# Local Ollama API used to send prompts to the LLM
OLLAMA_URL = "http://localhost:11434/api/generate"

# LLM Model
MODEL_NAME = "qwen2.5:32b"


def llm_request(prompt):

# Sends a prompt to the Ollama API and returns the model's response text.

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

    data = response.json()
    return data.get("response", "")


def translate_text(text):
# Uses the LLM to translate input text into English.
# The prompt strictly instructs the model to return only the translated sentence.

        
    prompt = f"""
Translate the following text to English.
Only return the translated sentence.
Do not include explanations.
Do not include markdown.
Do not include extra text.
Do not include any notes.

Text: "{text}"
"""
    return llm_request(prompt)



def extract_data(text):

# Uses the LLM to classify a case note and extract structured compliance data.
# The model must return a JSON object with incident classification fields.


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
    return llm_request(prompt)