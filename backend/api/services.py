import os
from dotenv import load_dotenv
import google.generativeai as genai
import re
from pathlib import Path
import fitz
from docx import Document
import json

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def extract_pdf(file_path):
    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text


def extract_docx(file_path):
    document = Document(file_path)

    text = []

    for paragraph in document.paragraphs:
        text.append(paragraph.text)

    return "\n".join(text)


def extract_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()


def extract_text(file_path):

    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_pdf(file_path)

    elif extension == ".docx":
        return extract_docx(file_path)

    elif extension == ".txt":
        return extract_txt(file_path)

    else:
        raise Exception("Unsupported file type")
    

def clean_text(text):

    text = re.sub(r"\n\s*\n", "\n", text)

    text = re.sub(r"[ \t]+", " ", text)

    return text.strip()


def summarize_text(text):

    text = text[:4000]

    prompt = f"""
You are an AI document assistant.

Return ONLY valid JSON.

Format:

{{
    "summary":"...",
    "key_points":[
        "...",
        "..."
    ],
    "action_items":[
        "...",
        "..."
    ]
}}

Document:

{text}
"""

    response = model.generate_content(prompt)

    cleaned = response.text.replace("```json", "").replace("```", "").strip()

    return json.loads(cleaned)


def chat_with_document(document_text, question):

    # Keep within Gemini context window
    document_text = document_text[:12000]

    prompt = f"""
You are NightBat AI.

Answer the user's question ONLY using the document below.

If the answer is not present in the document,
reply:

"I couldn't find that information in the uploaded document."

---------------- DOCUMENT ----------------

{document_text}

------------------------------------------

User Question:

{question}

Answer in a clear, professional manner.
"""

    response = model.generate_content(prompt)

    return response.text



def generate_flashcards(text):

    prompt = f"""
You are an expert study assistant.

Read the document below and Generate between 10 and 15 high-quality flashcards.

Rules:

- Focus on the most important concepts.
- Avoid duplicate questions.
- Keep answers concise (1–3 sentences).
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- No extra text.

Format:

[
    {{
        "question": "...",
        "answer": "..."
    }}
]

Document:

{text[:15000]}
"""

    response = model.generate_content(prompt)

    try:

        flashcards = json.loads(response.text)

        return flashcards

    except Exception:

        return []
    

def generate_quiz(text):

    prompt = f"""
You are an expert teacher.

Generate exactly 10 multiple choice questions from the following document.

Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanation outside JSON.
- Exactly 10 questions.

Format:

[
    {{
        "question":"...",
        "option_a":"...",
        "option_b":"...",
        "option_c":"...",
        "option_d":"...",
        "correct_answer":"A",
        "explanation":"..."
    }}
]

Document:

{text[:12000]}
"""

    response = model.generate_content(prompt)

    content = response.text.strip()

    if content.startswith("```json"):
        content = content.replace("```json", "").replace("```", "").strip()

    elif content.startswith("```"):
        content = content.replace("```", "").strip()

    try:

        return json.loads(content)

    except Exception:

        return []