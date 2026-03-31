# CareShield – Conversational Case Noting System

## Overview

CareShield is an internal digital platform developed for Senior Helpers Australia to support governance, documentation automation, and data intelligence. This repository focuses on the development of the **Conversational Case Noting System**, a module designed to assist support workers in recording case notes efficiently using a conversational interface powered by AI.

The system aims to reduce administrative workload while improving the quality, consistency, and accessibility of recorded data.

---

## Key Features

- 💬 **Conversational Interface**  
  Support workers can input information naturally through a chat-based interface.

- 🎙️ **Voice Input Support**  
  Users can provide input via speech, which is transcribed using AI.

- 🌏 **Multilingual Input Handling**  
  The system supports multiple languages and stores:
  - Original input language
  - English translation for standardization

- 🧠 **AI-powered Slot Filling**  
  The system identifies missing required information and asks follow-up questions dynamically.

- 📝 **Structured Case Note Generation**  
  Converts conversational input into structured data for storage and analysis.

- 📊 **Category-based Records**  
  The system supports:
  - Incident Register
  - Feedback and Complaints
  - Normal Case Notes

---

## Technology Stack

### Frontend

- React (TypeScript)
- Vite
- Tailwind CSS
- React Router

### Backend

- FastAPI (Python)
- SQLAlchemy
- PostgreSQL

### AI Components

- Whisper (Speech-to-Text)
- Ollama (Local LLM runtime)
- Model: **qwen2.5:32b**

---

## System Architecture

The system follows a layered architecture:

- **Frontend Layer**: User interface for chat interaction
- **Application Layer**:
  - Backend API (FastAPI)
  - Conversation Manager
  - Validation & Classification
- **AI Service Layer**:
  - Speech-to-Text (Whisper)
  - Language Detection & Translation
  - LLM (via Ollama)
- **Data Layer**:
  - PostgreSQL database

---

## Project Structure

```text
SeniorHelpers/
├── frontend/           # React frontend application
├── backend/            # FastAPI backend application
│   ├── app/
│   │   ├── core/       # Configuration
│   │   ├── db/         # Database models
│   │   └── services/   # AI services (Whisper, LLM)
│   └── main.py         # Entry point (currently prototype)
└── uploads/            # Sample audio files for testing
```

---

## Current Development Status

⚠️ This project is currently under active development.

- Backend currently includes a **prototype AI pipeline**
- Frontend is at **initial scaffold stage**
- API endpoints and full integration are **in progress**

---

## Scope (Current Phase)

The current implementation focuses on:

- Conversational case note capture
- AI-based information extraction
- Structured data storage

❗ **Out of Scope (for this phase)**:

- Authentication and authorization (handled by another team in later phases)
- Advanced reporting and analytics

---

## Deployment

The system is intended to be deployed in the **Senior Helpers local server environment**, accessed via a secure VPN.

---

## Future Work

- Full frontend-backend integration
- Enhanced AI extraction accuracy
- Additional modules (authentication, analytics, reporting)
- Integration with existing healthcare systems

---

## Team

This project is developed by Team SPENC as part of the CSC3600 Capstone Project at the University of Southern Queensland.

The team consists of:

- Phu Vo (Team Lead, Frontend Developer)
- Nathan Romeo (AI Engineer, Backend Developer)
- Christopher Banu (Backend Developer)
- Kris Ellison (Networking Engineer, Risk Manager)
- Sakar Jung Gurung (Cybersecurity Specialist, Tester)

---

## Notes

- The LLM model used in this project may change based on client requirements.
- The system is designed to be modular to support future extensions.

---
