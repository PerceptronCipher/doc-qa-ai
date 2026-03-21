from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from datetime import datetime
from ingestor import build_index, search
from qa import answer_question

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store
store = {"index": None, "chunks": []}
history = []

@app.post("/upload")
@limiter.limit("10/minute")
async def upload(request: Request, file: UploadFile = File(...)):
    contents = await file.read()
    index, chunks = build_index(contents)
    store["index"] = index
    store["chunks"] = chunks
    return {"message": f"Document indexed with {len(chunks)} chunks"}

@app.post("/ask")
@limiter.limit("20/minute")
async def ask(request: Request, question: str = Form(...)):
    if not store["index"]:
        return {"error": "No document uploaded yet"}
    
    chunks = search(question, store["index"], store["chunks"])
    answer = answer_question(question, chunks)
    
    history.append({
        "timestamp": datetime.now().isoformat(),
        "question": question,
        "answer": answer
    })
    
    return {"answer": answer}

@app.get("/history")
async def get_history():
    return history