import os
from dotenv import load_dotenv
import google.generativeai as genai
import re
from pathlib import Path
import fitz
from docx import Document

load_dotenv()
print("API KEY:", os.getenv("GEMINI_API_KEY"))

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

    Read the following document and provide:

    ## Summary
    Write a concise summary in 5-8 sentences.

    ## Key Points
    Give the important points as bullet points.

    ## Action Items
    List any action items if present.
    If there are none, say "No action items found."

    Document:
    {text}
    """

    response = model.generate_content(prompt)

    return response.text