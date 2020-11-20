from flask import Flask
from flask_restful import Resource, Api

import GPUtil as gpu

import time
import psutil

def report_analis():
    report = {"GPU": (False,0),
          "CPU": (False,0),
          "RAM": (False,0),
          "DISK": (False,0)
          }
    gpus=gpu.getGPUs()
    for GPU in gpus:
        gpu_usage = GPU.load*100
        gpu_memory = GPU.memoryUtil*100
    cpu_usage = psutil.cpu_percent()
    memory_usage = psutil.virtual_memory().percent
    disk_usage = psutil.disk_usage('/').percent

    if cpu_usage > 90.0:
        report["cpu"] = (True,cpu_usage)
    if gpu_usage > 90.0:
        report["gpu"] = (True,gpu_usage)
    if memory_usage > 90.0:
        report["ram"] = (True,memory_usage)
    if disk_usage > 90.0:
        report["disk"] = (True,disk_usage)
    for key in report:
        if True in report[key]:
            cout = f"Status not OK \n {key} usage at {report[key][1]}%"
        else:
            cout = "Todo solido"
    return cout


app = Flask(__name__)
api = Api(app)

class report(Resource):
    def get(self):
        #return {'gpu': 'report'}
        return{ 'status':report_analis()}
api.add_resource(report, '/report')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)


