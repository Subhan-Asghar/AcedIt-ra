from flask import Flask, request,jsonify
from mcq_agent import mcq_return
app = Flask(__name__)

@app.route("/api/mcq",methods=['POST'])
def fun():
    try:
        data=request.json;
        info=data.get('info');
        result=mcq_return(info);
        return jsonify({"message": f"{result}"}), 200
    except:
        return jsonify({"message": "Error"}),400

if __name__ == '__main__':
    app.run(debug=True, port=5000)