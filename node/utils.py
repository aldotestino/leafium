import os
import threading


def get_daemon_pid():
    daemon_file = open(".pid")
    pid = daemon_file.read()
    daemon_file.close()
    return int(pid)


def is_daemon_running(pid):
    try:
        os.kill(pid, 0)
    except OSError:
        return False
    else:
        return True


def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()

    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t
