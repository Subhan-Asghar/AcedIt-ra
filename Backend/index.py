from flask import Flask, request, jsonify
from mcq_agent import mcq_return
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS globally for your frontend URLs
CORS(app, origins=["http://localhost:5173", "https://acedit.vercel.app"], supports_credentials=True)

@app.route("/api/mcq", methods=['POST'])
def fun():
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
