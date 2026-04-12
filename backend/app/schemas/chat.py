from datetime import datetime
from pydantic import BaseModel

class ChatSessionResponse(BaseModel):
    id: int 
    session_active: bool
    started_at: datetime
    ended_at: datetime | None

    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: int
    message_sender_role: str
    content: str
    detected_language: str
    created_at: datetime

    class Config:
        from_attributes = True

class ChatReply(BaseModel):
    chat_session_id: int
    user_message: MessageResponse
    assistant_message: MessageResponse | None = None
    note_ready: bool
    missing_slots: list[str]