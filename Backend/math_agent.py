import os;
from langchain_groq import ChatGroq;
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate;
from dotenv import load_dotenv;

load_dotenv();
api=os.getenv("api_key");

model=ChatGroq(model="llama-3.3-70b-versatile",api_key=api,temperature=0.1);

chat=ChatPromptTemplate.from_messages([
     ("system", 
        "You are an AI agent that solve the math questions in steps . "
        "Return the output in JSON format with the following structure:\n\n"
        "{{\n"
        '   "questions": [\n'
        "       {{\n"
        '           "question": "2+2?",\n'
        '           "steps": ["step 1 like this and so on ", "A type of energy", "A chemical reaction", "A form of light"],\n'
        '           "answer": "The final answer is here",\n'
        "       }},\n"
        "       ...\n"
        "   ]\n"
        "}}"
    ),
    ("human","Solve this math problem {pro}")
])

chain=chat|model| JsonOutputParser();

def math_return(input_q):
    result=chain.invoke({
        "pro":input_q
    })
    return result