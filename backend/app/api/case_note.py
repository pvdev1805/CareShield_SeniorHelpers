from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.db.tables import ChatSession, Message, CaseNote
from app.schemas.case_note import CaseNoteResponse
from main import final_extraction

router = APIRouter(prefix="/case-notes", tags=["case-notes"])

@router.post("/{session_id}/generate", response_model=CaseNoteResponse)
def generate_case_note(session_id: int, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    existing = db.query(CaseNote).filter(CaseNote.chat_session_id == session_id).first()
    if existing:
        return existing
    
    message = (db.query(Message).filter(Message.chat_session_id == session_id).order_by(Message.created_at.asc()).all())
    if not message:
        raise HTTPException(status_code=400, detail="No messages found")
    
    case_record = {
        "conversation_log": [],
        "full_original_text": "",
        "full_translated_text": "",
        "original_language": "en"
    }

    for msg in message:
        role = "user" if msg.message_sender_role == "user" else "assistant"
        case_record["conversation_log"].append({
            "role": role,
            "timestamp": str(msg.created_at),
            "message": msg.content
        })
    
        if role == "user":
            case_record["full_original_text"] += " " + msg.content
            case_record["full_translated_text"] += " " + msg.content
            case_record["original_language"] = msg.detected_language

    case_record["full_original_text"] = case_record["full_original_text"].strip()
    case_record["full_translated_text"] = case_record["full_translated_text"].strip()

    final_case = final_extraction(case_record)

    case_note = CaseNote(
        chat_session_id = session_id,
        user_id = session.user_id,
        original_text = final_case.get("full_original_text", ""),
        original_language = final_case.get("original_language", "en"),
        english_translation = final_case.get("full_translated_text", "") or "",
        incident_occurred= final_case.get("report_type") == "incident",
        incident_time = None,
        incident_type = final_case.get("category") or "unknown",
        location = None,
        injury_status = None,
        summary = final_case.get("summary") or case_record["full_original_text"] ,
        metadata_json= final_case
        
        )
    
    db.add(case_note)
    session.session_active = False
    db.commit()
    db.refresh(case_note)

    return case_note