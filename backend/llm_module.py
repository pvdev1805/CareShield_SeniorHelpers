import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:32b"

# Send a prompt to Ollama API and return the response.
def llm_request(prompt):
    
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.1,
                "num_predict": 150
            }
        },
        timeout=180
    )

    data = response.json()
    return data.get("response", "").strip()

# Detect the language of the input text and translate it to English.
def translate_and_detect_language(text):
    
    prompt = f"""
You are a language detection and translation assistant.

Detect the language of the following text and translate it into English.

Return ONLY valid JSON in the format:
{{
  "detected_language": "ISO 639-1 code",
  "translated_text": "English translation"
}}

If the text is already in English, return "en" and the original text.

Text:
\"\"\"{text}\"\"\"
"""
    response = llm_request(prompt)

    try:
        return json.loads(response)
    # Default to unknown on error
    except json.JSONDecodeError:
        return {
            "detected_language": "unknown",
            "translated_text": text
        }

# Determines whether additional information is required and generates a follow up response.
def generate_follow_up_questions(text):

    prompt = f"""
You are an AI compliance assistant for an aged care and NDIS provider. 
You receive case notes from support workers caring for participants.

You are provided with the full conversation between a support worker and an AI assistant.
Determine whether additional information is required to complete a compliant case report.

ONLY ask a follow-up question if essential information is missing.

Strict Instructions:
- You only need enough information to define the following:
    Reporting Type:
    - incident
    - feedback_complaint
    - case_note

    Category:
    - health
    - behaviour
    - administrative
    - other

    Severity Level:
    - high, medium, low, none

- Only ask ONE question at a time.
- Do NOT ask a question if all information can be reasonably determined - return an empty response.
- Limit the number of questions you ask, preferably to NO MORE than TWO QUESTIONS.
- Do NOT repeat questions already asked.
- Do NOT ask questions that have already been answered.
- Do NOT ask unnecessary clarifying questions.
- Do NOT ask follow up questions if enough information has been collected for a case note.
- If the user replies with a one word response (ie. 'yes' or 'no'), you should not ask a follow up question.

Guidelines:
- If no harm is mentioned, assume severity is NONE.
- Only ask about medical care if there is a possible injury and it has not been clarified.
- If enough information is available, return an empty response.
- You should return the follow up question in the same language as the user's message. 

Return ONLY the question text with no explanations, no JSON, and no extra formatting (including quotation marks).

Conversation History:
\"\"\"{text}\"\"\"
"""
    response = llm_request(prompt).strip()

    # Clean and validate response
    if not response:
        return ""

    response = response.strip().strip('"').strip("'")

    # Ensure the output is a valid question
    if response.endswith("?") and len(response) > 5:
        return response

    return ""


# uses LLM to classify a case note and extract structured JSON data for case note.
def extract_data(text):

    prompt = f"""
You are an AI compliance assistant for an aged care and NDIS provider. You receive case notes from support workers that are caring for their clients (referred to as "participants").


Analyse the case note and extract structured information.

Instructions:
- Do NOT generate follow-up questions.
- Assume all required information has already been collected.
- Hospitalisation or serious injury automatically implies:
  - severity: high
  - escalation_required: yes

Return ONLY valid JSON. Do not include explanations, markdown, or extra text.
All fields must contain a value.

Reporting Types:
- incident
- feedback_complaint
- case_note

Categories:
- health
- behaviour
- administrative
- other

Severity Levels:
- high, medium, low, none

Required JSON format:
{{
  "report_type": "incident | feedback_complaint | case_note",
  "category": "health | behaviour | administrative | other",
  "severity": "low | medium | high | none",
  "escalation_required": "yes | no"
}}

Case Note:
\"\"\"{text}\"\"\"
"""
    return llm_request(prompt)