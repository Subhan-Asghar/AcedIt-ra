import os
from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("api_key")

# Model
llm = ChatGroq(model_name="llama-3.3-70b-versatile", api_key=api_key, temperature=0.1)

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", 
        "You are an AI agent that generates multiple test questions on various topics. "
        "Return the output in valid JSON format with the following structure:\n\n"
        "{{\n"
        '   "questions": [\n'
        "       {{\n"
        '           "question": "What is gravity?",\n'
        '           "answer": "Gravity is the force that attracts two bodies toward each other."\n'
        "       }},\n"
        "       {{\n"
        '           "question": "What is the speed of light?",\n'
        '           "answer": "The speed of light in vacuum is approximately 299,792,458 meters per second."\n'
        "       }}\n"
        "   ]\n"
        "}}"
    ),
    ("human", "Generate {num} test questions related to {topic} with a difficulty level of {grade}.")
])

chain = chat_prompt | llm | JsonOutputParser()

def test_questions(info: dict):
    result = chain.invoke({
        "num": info.get('num'),
        "topic": info.get('topic'),
        "grade": info.get('grade'),
    })
    
    return result
