from flask import Flask, request, jsonify
from mcq_agent import mcq_return
from text_summarizer import summary as summarize 
from test_question import test_questions as question_return
from worksheet import generate_worksheet
from proofread import proof_read
from yt_questions import yt_qreturn
from math_agent import math_return
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS globally for your frontend URLs
CORS(app, resources={r"/*": {"origins": "https://acedit.vercel.app"}}, supports_credentials=True)

# Handle preflight requests
@app.route('/api/<path:subpath>', methods=['OPTIONS'])
def handle_options(subpath):
    response = jsonify({"message": "CORS Preflight OK"})
    response.headers["Access-Control-Allow-Origin"] = "https://acedit.vercel.app"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route("/api/mcq", methods=['OPTIONS', 'POST'])
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


@app.route("/api/text", methods=['OPTIONS', 'POST'])
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


@app.route("/api/test", methods=['OPTIONS', 'POST'])
def test_q():
    try:
    
        data = request.json
        input_text = data.get('info')
        result = question_return(input_text)
        
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400


@app.route("/api/worksheet", methods=['OPTIONS', 'POST'])
def work_sheet():
    try:
    
        data = request.json
        input_text = data.get('info')
        result = generate_worksheet(input_text)
        
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400
    

@app.route("/api/proofread", methods=['OPTIONS', 'POST'])
def proofread():
    try:
    
        data = request.json
        input_text = data.get('input_text')
        result = proof_read(input_text)
        
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400

@app.route("/api/yt", methods=['OPTIONS', 'POST'])
def yt():
    try:
    
        data = request.json
        info = data.get('info')
        result = yt_qreturn(info)
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400

@app.route("/api/math", methods=['OPTIONS', 'POST'])
def math_route():
    try:
    
        data = request.json
        input_q = data.get('input_text')
        result =math_return(input_q)
        return jsonify({"message": result}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
