import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from langchain_core.output_parsers import JsonOutputParser

load_dotenv()
api_key = os.getenv("api_key")

# Initialize Model
model = ChatGroq(model="llama-3.3-70b-versatile", api_key=api_key, temperature=0.1)

# Define Prompt
chat = ChatPromptTemplate.from_messages([
    ("system", "You are an AI agent that take any text and have it proofread , correcting grammar,spelling, punctuation and adding clarity and return the correct version of the text"
      "Return the output in JSON format with the following structure:\n\n"
        "{{\n"
        '   "text": [\n'
        "       {{\n"
        '           "original_text": "actual text that provide by the user",\n'
        '           "Changing": ["chainging you make in multiple arrays like this", "A type of energy", "A chemical reaction", "A form of light"],\n'
        '           "improved_text": "improved here",\n'
        "       }},\n"
        "       ...\n"
        "   ]\n"
        "}}"
     ),
    ("human", "The text is this : \n\n{text}")
])


def proof_read(input_text:str):
    chain = chat | model|JsonOutputParser()
    result = chain.invoke({"text": input_text})
    return result