from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, date

from app.db.base import get_db
from app.db.tables import ChatSession, Message, CaseNote
from app.schemas.case_note import CaseNoteResponse
from app.services.chat_module import final_extraction

router = APIRouter(prefix="/case-notes", tags=["case-notes"])


@router.get("", response_model=list[CaseNoteResponse])
def list_case_notes(db: Session = Depends(get_db)):
    return db.query(CaseNote).order_by(CaseNote.id.desc()).all()


@router.get("/{case_note_id}", response_model=CaseNoteResponse)
def get_case_note(case_note_id: int, db: Session = Depends(get_db)):
    case_note = db.query(CaseNote).filter(CaseNote.id == case_note_id).first()
    if not case_note:
        raise HTTPException(status_code=404, detail="Case note not found")
    return case_note


@router.post("/{session_id}/generate", response_model=CaseNoteResponse)
def generate_case_note(session_id: int, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    # Prevent duplicate case notes
    existing = db.query(CaseNote).filter(CaseNote.chat_session_id == session_id).first()
    if existing:
        return existing
    
    messages = (
        db.query(Message)
        .filter(Message.chat_session_id == session_id)
        .order_by(Message.created_at.asc())
        .all()
    )
    if not messages:
        raise HTTPException(status_code=400, detail="No messages found")
    
    case_record = {
        "conversation_log": [],
        "full_original_text": "",
        "full_translated_text": "",
        "languages": [] 
    }

    for msg in messages:
        role = "user" if msg.message_sender_role == "user" else "assistant"

        detected_lang = (msg.detected_language or "en").lower()

        was_translated = bool(
            msg.translated_content
            and detected_lang != "en"
        )

        log_entry = {
            "role": role,
            "timestamp": str(msg.created_at),
            "message": msg.content,
            "translated_message": msg.translated_content,
            "original_language": detected_lang,
            "was_translated": was_translated,
            "input_type": msg.input_type,
        }

        case_record["conversation_log"].append(log_entry)

        if role == "user":
            # Accumulate original text
            case_record["full_original_text"] += " " + (msg.content or "")

            # Accumulate translated text (fallback to original if English)
            case_record["full_translated_text"] += " " + (
                msg.translated_content if msg.translated_content else msg.content
            )

            # Track languages (avoid duplicates)
            detected_lang = (msg.detected_language or "en").lower()
            if detected_lang not in case_record["languages"]:
                case_record["languages"].append(detected_lang)

    case_record["full_original_text"] = case_record["full_original_text"].strip()
    case_record["full_translated_text"] = case_record["full_translated_text"].strip()

    # Run AI extraction
    final_case = final_extraction(case_record)

    # Preserve detected languages inside metadata
    final_case["languages"] = case_record.get("languages", [])

    # Use first detected language for DB column compatibility
    primary_language = (
        case_record["languages"][0]
        if case_record.get("languages")
        else "en"
    )

    case_note = CaseNote(
        chat_session_id=session_id,
        user_id=session.user_id,
        original_text=case_record["full_original_text"],
        original_language=primary_language,
        english_translation=case_record["full_translated_text"],
        incident_occurred=final_case.get("report_type") == "incident",
        incident_date=date.today(),
        incident_time=datetime.now().time(),
        incident_type=final_case.get("category") or "unknown",
        location=None,
        injury_status=None,
        summary=final_case.get("summary") or case_record["full_original_text"],
        metadata_json=final_case,
        reported_timestamp=datetime.now(),
    )
    
    db.add(case_note)
    session.session_active = False
    session.ended_at = datetime.now()
    db.commit()
    db.refresh(case_note)

    return case_note