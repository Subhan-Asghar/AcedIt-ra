import os;
from langchain_groq import ChatGroq;
from langchain_core.output_parsers import JsonOutputParser;
from langchain_core.prompts import ChatPromptTemplate;
from dotenv import load_dotenv;

load_dotenv();
api_key=os.getenv("api_key")

# Model
llm =ChatGroq(model="llama-3.3-70b-versatile",api_key=api_key,temperature=0.1)

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", 
        "You are an AI agent that generates multiple test questions on various topics. "
        "Return the output in JSON format with the following structure:\n\n"
        "{{\n"
        '   "questions": [\n'
        "       {{\n"
        '           "question": "What is gravity?",\n'
        '           "answer": "atleast 2 line answer of the question ",\n'
        "       }},\n"
        "       ...\n"
        "   ]\n"
        "}}"
    ),
    ("human", "Generate {num} of test questions related to {topic} with a difficulty level of {diff}.")
])

chain = chat_prompt | llm | JsonOutputParser()

def test_questions(info:dict):
    result = chain.invoke({
        "num": info.get('num'),
        "topic": info.get('topic'),
        "grade": info.get('grade'),
    })
    
    return result  
