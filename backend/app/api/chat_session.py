from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import tempfile
import os

from app.db.base import get_db
from app.db.tables import ChatSession, Message
from app.schemas.chat import (
    ChatReply,
    ChatSessionResponse,
    MessageCreate,
    MessageResponse,
)
from app.services.chat_module import (
    process_input,
    generate_assistant_reply,
    detect_text_language,
    translate_and_detect_language,
)

# Whisper model for transcription
from faster_whisper import WhisperModel
from app.services.whisper_module import transcribe_audio

router = APIRouter(prefix="/chat-session", tags=["chat-session"])

# Initialise Whisper model once at startup
whisper_model = WhisperModel("base", device="cpu", compute_type="int8")

# NEW SESSION ENDPOINT
@router.post("", response_model=ChatSessionResponse)
def create_chat_session(db: Session = Depends(get_db)):
    session = ChatSession(user_id=1, session_active=True)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

# DATABASE MESSAGES ENDPOINT
@router.get("/{session_id}/message", response_model=list[MessageResponse])
def list_message(session_id: int, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    return (
        db.query(Message)
        .filter(Message.chat_session_id == session_id)
        .order_by(Message.created_at.asc())
        .all()
    )

# TEXT MESSAGE ENDPOINT
@router.post("/{session_id}/message", response_model=ChatReply)
def send_text_message(session_id: int, payload: MessageCreate, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    original_text = payload.content.strip()
    if not original_text:
        raise HTTPException(status_code=400, detail="Message content cannot be empty")

    case_record = {
        "conversation_log": [],
        "full_original_text": "",
        "full_translated_text": "",
        "languages": [],
    }

    # Rebuild conversation log for context
    existing_messages = (
        db.query(Message)
        .filter(Message.chat_session_id == session_id)
        .order_by(Message.created_at.asc())
        .all()
    )

    for msg in existing_messages:
        case_record["conversation_log"].append(
            {
                "role": "user" if msg.message_sender_role == "user" else "assistant",
                "timestamp": str(msg.created_at),
                "message": msg.content,
            }
        )

    # Detect language of user input
    detected_language, _ = detect_text_language(original_text)
    detected_language = (detected_language or "en").lower()

    translated_text = None
    if detected_language != "en":
        translation_result = translate_and_detect_language(original_text)
        translated_text = translation_result.get("translated_text", original_text)

    # Process input for conversation context
    case_record = process_input(original_text, False, case_record)

    # Save user message
    user_message = Message(
        chat_session_id=session_id,
        message_sender_role="user",
        content=original_text,
        translated_content=translated_text,
        detected_language=detected_language,
        input_type="text",
    )

    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    # Generate assistant reply
    assistant_text, case_record = generate_assistant_reply(case_record)

    assistant_message = None
    note_ready = assistant_text == ""

    if assistant_text:
        assistant_lang, _ = detect_text_language(assistant_text)
        assistant_lang = (assistant_lang or "en").lower()

        assistant_translated = None
        if assistant_lang != "en":
            translation_result = translate_and_detect_language(assistant_text)
            assistant_translated = translation_result.get("translated_text", assistant_text)

        assistant_message = Message(
            chat_session_id=session_id,
            message_sender_role="assistant",
            content=assistant_text,
            translated_content=assistant_translated,
            detected_language=assistant_lang,
        )

        db.add(assistant_message)
        db.commit()
        db.refresh(assistant_message)

    return ChatReply(
        chat_session_id=session_id,
        user_message=user_message,
        assistant_message=assistant_message,
        note_ready=note_ready,
        missing_slots=[],
    )


# AUDIO MESSAGE ENDPOINT
@router.post("/{session_id}/message/audio", response_model=ChatReply)
async def send_audio_message(
    session_id: int,
    audio: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    # Save uploaded audio to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(await audio.read())
        tmp_path = tmp.name


    try:
        transcription, detected_language, confidence = transcribe_audio(tmp_path)
        detected_language = (detected_language or "en").lower()
    finally:
        os.remove(tmp_path)

    if not transcription:
        raise HTTPException(status_code=400, detail="Could not transcribe audio")

    case_record = {
        "conversation_log": [],
        "full_original_text": "",
        "full_translated_text": "",
        "languages": [],
    }

    # Rebuild conversation log for context
    existing_messages = (
        db.query(Message)
        .filter(Message.chat_session_id == session_id)
        .order_by(Message.created_at.asc())
        .all()
    )

    for msg in existing_messages:
        case_record["conversation_log"].append(
            {
                "role": "user" if msg.message_sender_role == "user" else "assistant",
                "timestamp": str(msg.created_at),
                "message": msg.content,
            }
        )

    # Translate if necessary
    translated_text = None
    if detected_language != "en":
        translation_result = translate_and_detect_language(transcription)
        translated_text = translation_result.get("translated_text", transcription)

    # Process transcription through existing pipeline
    case_record = process_input(transcription, False, case_record)

    # Save user message (transcribed audio)
    user_message = Message(
        chat_session_id=session_id,
        message_sender_role="user",
        content=transcription,
        translated_content=translated_text,
        detected_language=detected_language,
        input_type="audio",
    )

    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    # Generate assistant reply
    assistant_text, case_record = generate_assistant_reply(case_record)

    assistant_message = None
    note_ready = assistant_text == ""

    if assistant_text:
        assistant_lang, _ = detect_text_language(assistant_text)
        assistant_lang = (assistant_lang or "en").lower()

        assistant_translated = None
        if assistant_lang != "en":
            translation_result = translate_and_detect_language(assistant_text)
            assistant_translated = translation_result.get("translated_text", assistant_text)

        assistant_message = Message(
            chat_session_id=session_id,
            message_sender_role="assistant",
            content=assistant_text,
            translated_content=assistant_translated,
            detected_language=assistant_lang,
        )

        db.add(assistant_message)
        db.commit()
        db.refresh(assistant_message)

    return ChatReply(
        chat_session_id=session_id,
        user_message=user_message,
        assistant_message=assistant_message,
        note_ready=note_ready,
        missing_slots=[],
    )