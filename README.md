# AI Document Q&A System

> Upload a document. Ask anything. Get precise answers instantly.

![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-orange)

## Overview

AI Document Q&A is a production-ready tool that allows users to upload PDF documents and ask natural language questions — returning precise, context-aware answers in seconds.

Built with a FastAPI backend powered by GPT-4o and FAISS vector search, and a Next.js frontend for a seamless user experience.

## Features

- 📄 Upload PDF documents for instant AI analysis
- 🔍 FAISS-powered semantic search across document chunks
- 🤖 GPT-4o answers grounded strictly in document context
- 💬 Conversational Q&A with session history
- ⚡ Rate limited API to prevent abuse
- 🚀 Fully deployed and production-ready

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, FastAPI, Uvicorn |
| AI | OpenAI GPT-4o, text-embedding-3-small |
| Vector Search | FAISS |
| PDF Parsing | pypdf |
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Deployment | Render |

## Architecture
```
User uploads PDF
      ↓
pypdf extracts text → chunked into 500-char segments
      ↓
OpenAI text-embedding-3-small generates embeddings
      ↓
FAISS indexes embeddings in memory
      ↓
User asks question → question embedded → top 5 chunks retrieved
      ↓
GPT-4o answers based on retrieved context
```

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- OpenAI API key

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key (set in shell or Render dashboard) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload and index a PDF document |
| POST | `/ask` | Ask a question about the uploaded document |
| GET | `/history` | Retrieve session Q&A history |

## Live Demo

- **Frontend:** https://doc-qa-ai-1.onrender.com
- **Backend API:** https://doc-qa-ai.onrender.com

## Deployment

Both services are deployed on Render.

- Backend: Python web service with `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Frontend: Node web service with `npm install && npm run build`
- Set `OPENAI_API_KEY` as an environment variable in the Render backend dashboard

## Limitations

- Document index is session-based and resets on server restart
- Rate limited to 10 uploads and 20 questions per minute per IP
- Large PDFs (50+ pages) may take longer to index

## Author

Built by [PerceptronCipher](https://github.com/PerceptronCipher)