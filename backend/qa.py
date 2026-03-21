import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def answer_question(question: str, context_chunks: list[str]) -> str:
    context = "\n\n".join(context_chunks)
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant. Answer the user's question based only on the provided document context. If the answer is not in the context, say so clearly."
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion: {question}"
            }
        ]
    )
    return response.choices[0].message.content