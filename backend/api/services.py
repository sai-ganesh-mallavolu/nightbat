import os
import re
import json
from pathlib import Path

import fitz
import google.generativeai as genai
from docx import Document
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def extract_pdf(file_path):
    """
    Extract text from PDF.

    Limits the number of pages to reduce
    memory usage on Render Free.
    """

    text = []

    with fitz.open(file_path) as pdf:

        MAX_PAGES = 25

        for index, page in enumerate(pdf):

            if index >= MAX_PAGES:
                break

            try:
                page_text = page.get_text("text")

                if page_text.strip():
                    text.append(page_text)

            except Exception:
                continue

    return "\n".join(text)

def extract_docx(file_path):

    document = Document(file_path)

    paragraphs = []

    for paragraph in document.paragraphs:

        if paragraph.text.strip():
            paragraphs.append(
                paragraph.text
            )

    return "\n".join(paragraphs)

def extract_txt(file_path):

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as file:

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
        raise Exception(
            "Unsupported file type."
        )
    
def clean_text(text):

    text = re.sub(
        r"\n\s*\n",
        "\n",
        text
    )

    text = re.sub(
        r"[ \t]+",
        " ",
        text
    )

    return text.strip()

def summarize_text(text):

    text = clean_text(text)

    # Limit text sent to Gemini
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

    try:

        response = model.generate_content(prompt)

        cleaned = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(cleaned)

    except Exception as e:

        print("Summary Error:", e)

        return {
            "summary": "Unable to generate summary.",
            "key_points": [],
            "action_items": [],
        }
    
def chat_with_document(document_text, question):

    document_text = clean_text(document_text)

    document_text = document_text[:6000]

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

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print("Chat Error:", e)

        return "Unable to generate a response at the moment."
    
def generate_flashcards(text):

    text = clean_text(text)

    text = text[:6000]

    prompt = f"""
You are an expert study assistant.

Generate between 10 and 15 high-quality flashcards.

Return ONLY valid JSON.

Format:

[
    {{
        "question":"...",
        "answer":"..."
    }}
]

Document:

{text}
"""

    try:

        response = model.generate_content(prompt)

        content = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(content)

    except Exception as e:

        print("Flashcard Error:", e)

        return []
    

def generate_quiz(text):

    text = clean_text(text)

    text = text[:6000]

    prompt = f"""
You are an expert teacher.

Generate exactly 10 multiple choice questions.

Return ONLY valid JSON.

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

{text}
"""

    try:

        response = model.generate_content(prompt)

        content = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(content)

    except Exception as e:

        print("Quiz Error:", e)

        return []