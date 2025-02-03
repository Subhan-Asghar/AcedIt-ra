import os
import json
from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

# Load API Key
load_dotenv()
api_key = os.getenv("api_key")

# Initialize Model
llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=api_key, temperature=0.1)

# Define Prompt Template with Escaped JSON Structure
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", 
        "You are an AI agent that generates structured worksheets on any topic. "
        "Return the output in JSON format with the following structure:\n\n"
        "{{\n"
        '   "worksheet": {{\n'
        '       "topic": "{topic}",\n'
        '       "grade_level": "{grade}",\n'
        '       "mcq_questions": [\n'
        "           {{\n"
        '               "question": "What is {topic}?",\n'
        '               "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n'
        '               "answer": "Correct Option"\n'
        "           }}\n"
        "       ],\n"
        '       "fill_in_the_blanks": [\n'
        "           {{\n"
        '               "question": "{topic} is ______.",\n'
        '               "answer": "Correct Answer"\n'
        "           }}\n"
        "       ],\n"
        '       "test_questions": [\n'
        "           {{\n"
        '               "question": "Explain the importance of {topic} in 3-5 sentences.",\n'
        '               "answer": "A detailed explanation of the topic."\n'
        "           }}\n"
        "       ]\n"
        "   }}\n"
        "}}"
    ),
    ("human", "Generate {num} multiple-choice, fill-in-the-blank, and test questions on '{topic}' for grade '{grade}'.")
])

# Create Chain
chain = chat_prompt | llm | JsonOutputParser()

# Function to Generate Full Worksheet
def generate_worksheet(info:dict):
     result = chain.invoke({
        "num": info.get('num'),
        "topic": info.get('topic'),
        "grade": info.get('grade'),
    })
     return result
    
