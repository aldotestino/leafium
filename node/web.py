import os
import signal
from flask import Flask, render_template, request, redirect

from utils import is_daemon_running, get_daemon_pid

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    running = is_daemon_running(get_daemon_pid())
    return render_template("index.html", is_daemon_running=running)


@app.route("/configure_node", methods=["POST"])
def configure_node():
    private_key = request.form["key"]
    o = "{\"privateKey\":" + f"\"{private_key}\"" + "}"
    key_file = open('key.json', 'w')
    key_file.write(o)
    key_file.close()
    return redirect('/')


@app.route("/start_node", methods=["POST"])
def start_node():
    os.system('python3 daemon.py&')
    return redirect('/')


@app.route("/stop_node", methods=["POST"])
def stop_node():
    os.kill(get_daemon_pid(), signal.SIGKILL)
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
