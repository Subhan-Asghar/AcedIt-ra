from flask import Flask, request, jsonify
from mcq_agent import mcq_return
from text_summarizer import summary as summarize 
from test_question import test_questions as question_return
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS globally for your frontend URLs
CORS(app, origins=["http://localhost:5173", "https://acedit.vercel.app"], supports_credentials=True)

@app.route("/api/mcq", methods=['POST'])
def mcq():
    try:
        # Get JSON data from request
        data = request.json
        info = data.get('info')
        result = mcq_return(info)
        
        # Send back the generated questions
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400

@app.route("/api/text", methods=['POST'])
def summary():
    try:
        # Get JSON data from request
        data = request.json
        input_text = data.get('input_text')
        result = summarize(input_text)
        
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400

@app.route("/api/test", methods=['POST'])
def test_q():
    try:
    
        data = request.json
        input_text = data.get('info')
        result = question_return(input_text)
        
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
