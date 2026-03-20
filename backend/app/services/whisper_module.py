from faster_whisper import WhisperModel
from backend.app.core.config import settings

model = WhisperModel(settings.whisper_model_size, device=settings.whisper_device, compute_type=settings.whisper_compute_type)


def transcribe_audio(audio_file):
    segments, info = model.transcribe(audio_file)
    text = " ".join(segment.text for segment in segments)
    return text, info.language, info.language_probability