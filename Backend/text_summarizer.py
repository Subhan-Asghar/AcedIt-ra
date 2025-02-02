import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("api_key")

# Initialize Model
model = ChatGroq(model="llama-3.3-70b-versatile", api_key=api_key, temperature=0.1)

# Define Prompt
chat = ChatPromptTemplate.from_messages([
    ("system", "You are an AI agent that summarizes text and creates bullet points."),
    ("human", "Summarize the following text and provide bullet points:\n\n{text}")
])

chain = chat | model


input_text = "Artificial intelligence (AI) is a rapidly evolving field focused on creating systems that can perform tasks requiring human intelligence, such as learning, reasoning, and problem-solving."

# Invoke Model
result = chain.invoke({"text": input_text})

# Print Output
print(result.content)