from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.db.tables import ChatSession, Message
from app.schemas.chat import ChatReply, ChatSessionResponse, MessageCreate, MessageResponse
from main import process_input, generate_assistant_reply

router = APIRouter(prefix="/chat-session", tags=["chat-session"])

@router.post("", response_model=ChatSessionResponse)
def create_chat_session(db: Session = Depends(get_db)):
    session = ChatSession(user_id=1, session_active=True) # TEMP USER TO BE UPDATED
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.get("/{session_id}/message", response_model=list[MessageResponse])
def list_message(session_id: int, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail = "Chat session not found")
    
    return(db.query(Message).filter(Message.chat_session_id == session_id).order_by(Message.created_at.asc()).all())
    
@router.post("/{session_id}/message", response_model=ChatReply)
def send_text_message(session_id:int, payload: MessageCreate, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    case_record = {
        "conversation_log": []
    }

    existing_message = (db.query(Message).filter(Message.chat_session_id == session_id).order_by(Message.created_at.asc()).all())

    for msg in existing_message:
        case_record["conversation_log"].append({
            "role": "user" if msg.message_sender_role == "user" else "assistant",
            "timestamp": str(msg.created_at),
            "message": msg.content
        })

    case_record = process_input(payload.content, False, case_record)

    user_message = Message(
        chat_session_id = session_id,
        message_sender_role = "user",
        content = payload.content,
        detected_language = case_record.get("original_language", "en")
        )
    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    assistant_text, case_record = generate_assistant_reply(case_record)

    assistant_message = None
    note_ready = assistant_text == ""

    if assistant_text:
        assistant_message = Message(
            chat_session_id=session_id,
            message_sender_role="assistant",
            content = assistant_text,
            detected_language="en"
        )
        db.add(assistant_message)
        db.commit()
        db.refresh(assistant_message)

    return ChatReply(
        chat_session_id = session_id,
        user_message = user_message,
        assistant_message = assistant_message,
        note_ready = note_ready,
        missing_slots=[]
    )