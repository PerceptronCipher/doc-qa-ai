import os
import io
import numpy as np
import faiss
from pypdf import PdfReader
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def extract_text(file_bytes: bytes) -> list:
    reader = PdfReader(io.BytesIO(file_bytes))
    chunks = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            for i in range(0, len(text), 500):
                chunks.append(text[i:i+500])
    return chunks

def get_embeddings(texts: list) -> np.ndarray:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    return np.array([r.embedding for r in response.data], dtype="float32")

def build_index(file_bytes: bytes) -> tuple:
    chunks = extract_text(file_bytes)
    embeddings = get_embeddings(chunks)
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index, chunks

def search(query: str, index, chunks: list, top_k: int = 5) -> list:
    query_embedding = get_embeddings([query])
    _, indices = index.search(query_embedding, top_k)
    return [chunks[i] for i in indices[0] if i < len(chunks)]