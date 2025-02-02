import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("api_key")

# Initialize Model
model = ChatGroq(model="llama-3.3-70b-versatile", api_key=api_key, temperature=0.1)

# Define Prompt
chat = ChatPromptTemplate.from_messages([
   ("system", "You are an AI agent that summarizes text concisely and formats key points clearly."
      "Return the output in JSON format with the following structure:\n\n"
        "{{\n"
        '   "summary": [\n'
        "       {{\n"
        '           "summarize": "1/3 of the actual text",\n'
        '           "bullet_points": ["A force pulling objects downward", "A type of energy", "A chemical reaction", "A form of light"],\n'
        "       }},\n"
        "       ...\n"
        "   ]\n"
        "}}"
    ),
("human", "Summarize the following text and extract key points:\n\n{text}\n\nProvide a well-structured summary with clear bullet points and proper spacing.")

])

def summary(input_text):
    chain = chat | model|JsonOutputParser()
    # Invoke Model
    result = chain.invoke({"text": input_text})
    # Return Output
    return result