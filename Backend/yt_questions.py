import os
import re
from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("api_key")

# Initialize LLM model
model = ChatGroq(model_name="llama-3.3-70b-versatile", api_key=api_key, temperature=0.1)

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
    ("human", "Based on the following video transcript, generate exactly {num} important test questions. Focus on deep understanding, key concepts, and critical thinking. Avoid simple factual questions: {transcript_text}")
])

chain = chat_prompt | model | JsonOutputParser()

def get_youtube_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en', 'hi'])
        return " ".join([entry["text"] for entry in transcript])
    except TranscriptsDisabled:
        return "No transcript available for this video."
    except Exception as e:
        return f"Error fetching transcript: {str(e)}"
    

def yt_qreturn(info: dict):

    try:
        # Extract video ID from URL
        url=info.get('url')
        num=info.get('num')
        match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11}).*", url)
        if not match:
            return "Invalid YouTube URL. Please provide a valid video link."
        
        video_id = match.group(1)
        transcript_text = get_youtube_transcript(video_id)

        if "Error" in transcript_text or transcript_text == "No transcript available for this video.":
            return transcript_text  


        response = chain.invoke(
            {"transcript_text" :f"{transcript_text}",
             "num":f"{num}"}
         )
    
        return response

    except Exception as e:
        return f"Error processing YouTube video: {str(e)}"