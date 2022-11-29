import os

from flask import Flask, render_template, request, redirect

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/start_node", methods=["POST"])
def start_node():
    private_key = request.form["key"]
    o = "{\"privateKey\":" + f"\"{private_key}\""+"}"
    key_file = open('key.json', 'w')
    key_file.write(o)
    key_file.close()
    os.system('python3 node.py')
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
