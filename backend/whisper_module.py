from faster_whisper import WhisperModel

model = WhisperModel("base", device="cpu", compute_type="int8")


def transcribe_audio(audio_file):
    segments, info = model.transcribe(audio_file)
    text = " ".join(segment.text for segment in segments)
    return text, info.language, info.language_probability