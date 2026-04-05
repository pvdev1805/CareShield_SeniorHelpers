from whisper_module import transcribe_audio
from llama_module import translate_text, extract_data


if __name__ == "__main__":

    audio_file = "sample.mp3"

    # Transcribe
    original_text, detected_language, confidence = transcribe_audio(audio_file)

    print("\nDetected language:", detected_language)
    print("Confidence:", round(confidence, 3))
    print("\n--- Original Transcript ---")
    print(original_text)

    # Translate if needed
    if detected_language != "en":
        english_text = translate_text(original_text)
    else:
        english_text = original_text

    print("\n--- English Version ---")
    print(english_text)

    # Classify
    structured_output = extract_data(english_text)

    print("\n--- Structured Output ---")
    print(structured_output)