import os
from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("api_key")

# Model 
model = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    api_key=api_key,
    temperature=0.1,
)

# Chat prompt for MCQ generation
chat_prompt = ChatPromptTemplate.from_messages([ 
    ("system", 
        "You are an AI agent that generates multiple-choice questions (MCQs) on various topics. "
        "Return the output in JSON format with the following structure:\n\n"
        "{{\n"
        '   "questions": [\n'
        "       {{\n"
        '           "question": "What is gravity?",\n'
        '           "options": ["A force pulling objects downward", "A type of energy", "A chemical reaction", "A form of light"],\n'
        '           "answer": "Q1: A force pulling objects downward",\n'
        '           "explanation": "Gravity is the force that attracts objects towards the center of the Earth."\n'
        "       }},\n"
        "       ...\n"
        "   ]\n"
        "}}"
    ),
    ("human", "Generate {num} MCQs related to {topic} with a difficulty level of {grade}.")
])

chain = chat_prompt | model | JsonOutputParser()

def mcq_return(info:dict):
    # Generate MCQs based on provided info
    result = chain.invoke({
        "num": info.get('num'),
        "topic": info.get('topic'),
        "grade": info.get('grade'),
    })
    
    return result  
