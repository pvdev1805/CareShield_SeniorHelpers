from faster_whisper import WhisperModel

model_size = "base"

model = WhisperModel(model_size, device="cpu", compute_type="int8")

audio_file = "sample.mp3"

# Transcribe only (no translation)
segments, info = model.transcribe(audio_file)

print("\nDetected language:", info.language)
print("Language confidence:", round(info.language_probability, 3))

print("\n--- Original Transcription ---")

full_text = " ".join(segment.text for segment in segments)

print(full_text.strip())