import GPUtil as gpu
from threading import Thread
import time
import psutil

class Monitor(Thread):
    def __init__(self, delay):
        super(Monitor, self).__init__()
        self.stopped = False
        self.delay = delay # Time between calls to GPUtil
        self.start()

    def run(self):
        disk_previo=0
        while not self.stopped:
            #disk_previo=0
            #gpu.showUtilization()
            
            gpus=gpu.getGPUs()
            for GPU in gpus:
                print("ID de GPU: ",GPU.id)
                print("Carga de GPU %: ",GPU.load*100)
                print("mem GPU %: ",GPU.memoryUtil*100)
                  


            cpu_usage = psutil.cpu_percent()
            memory_usage = psutil.virtual_memory().percent
            disk_usage = psutil.disk_usage('/').percent
            disk_status_w = psutil.disk_io_counters().write_bytes
            disk_status=(disk_status_w-disk_previo)/(self.delay*10**6)
            #print("jiro")
            print("cpu %: ",cpu_usage)
            print("ram %: ",memory_usage)
            print("disco utilizado %: ", disk_usage)
            print("MB escritos por segundo: ",disk_status,"\n")
            
            disk_previo=disk_status_w
            time.sleep(self.delay)

    def stop(self):
        self.stopped = True
        
# Instantiate monitor with a 10-second delay between updates



monitor = Monitor(0.5)

# Train, etc.

# Close monitor
#monitor.stop()
