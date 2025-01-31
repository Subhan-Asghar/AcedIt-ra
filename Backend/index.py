from flask import Flask, request,jsonify
from mcq_agent import mcq_return
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173", "https://ai-relay.vercel.app"], supports_credentials=True)

@app.route("/api/mcq",methods=['POST'])
def fun():
    try:
        data=request.json;
        info=data.get('info');
        result=mcq_return(info);
        return jsonify({"message": result}), 200
    except:
        return jsonify({"message": "Error"}),400


if __name__ == '__main__':
    app.run(debug=True, port=5000)