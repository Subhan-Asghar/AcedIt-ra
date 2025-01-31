from flask import Flask, request,jsonify
from mcq_agent import mcq_return
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173", "https://acedit.vercel.app"], supports_credentials=True)

@app.route("/api/mcq", methods=['POST', 'OPTIONS'])
def fun():
  
    try:
        if request.method == 'OPTIONS':
            response = jsonify({"message": "Preflight OK"})
            response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            return response, 200
        data=request.json;
        info=data.get('info');
        result=mcq_return(info);
        return jsonify({"message": result}), 200
    except:
        return jsonify({"message": "Error"}),400


if __name__ == '__main__':
    app.run(debug=True, port=5000)