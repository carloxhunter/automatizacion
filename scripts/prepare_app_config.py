#python3 -m pip install pymongo
#python3 -m pip install pymongo[srv]

from pymongo import MongoClient
import subprocess
import sys

model_script_path ="/scripts/get_models.sh"
config_file_path = "/config/app_config.txt"
models_dict={
    "peoplenet":"Detector-primario_Peoplenet/",
    "trafficcam":"Detector-primario_Trafficcam/",
    "color_auto":"Detector-secundario_CarColor/",
    "tipo_auto":"Detector-secundario_VehicleType/"}

application = "[application]\nenable-perf-measurement=1\nperf-measurement-interval-sec=10"
tiled_display = "[tiled-display]\nenable=0\nrows=1\ncolumns=1\nwidth=1280\nheight=720\ngpu-id=0\nnvbuf-memory-type=0"
source = "[source]\nenable=0\n_type=0\nuri=0\nnum-sources=0\ngpu-id=0\ncudadec-memtype=0"
sink0 = "[sink0]\nenable=0\ntype=2\nsync=1\nsource-id=0\ngpu-id=0\nnvbuf-memory-type=0"
sink1 = "[sink1]\nenable=0\ntype=3\ncontainer=1\ncodec=1\nenc-type=0\nsync=1\nbitrate=2000000\nprofile=0\noutput-file=0\nsource-id=0"
sink2 = "[sink2]\nenable=1\ntype=4\ncodec=1\nenc-type=0\nsync=0\nbitrate=400000\nprofile=0\nrtsp-port=8550\nudp-port=5400"
osd = "[osd]\nenable=1\ngpu-id=0\nborder-width=1\ntext-size=15\ntext-color=1;1;1;1;\ntext-bg-color=0.3;0.3;0.3;1\nfont=Serif\nshow-clock=0\nclock-x-offset=400\nclock-y-offset=0\nclock-text-size=12\nclock-color=1;0;0;0\nnvbuf-memory-type=0"
streammux = "[streammux]\ngpu-id=0\nlive-source=0\nbatch-size=0\nbatched-push-timeout=40000\nwidth=1920\nheight=1080\nenable-padding=0\nnvbuf-memory-type=0"
primary_gie = "[primary-gie]\nenable=1\ngpu-id=0\nbatch-size=0\nbbox-border-color0=1;0;0;1\nbbox-border-color1=0;1;1;1\nbbox-border-color2=0;0;1;1\nbbox-border-color3=0;1;0;1\ninterval=0\ngie-unique-id=1\nnvbuf-memory-type=0\nconfig-file=0"
secondary_gie = "[secondary-gie]\nenable=0\ngpu-id=0\nbatch-size=16\ngie-unique-id=0\noperate-on-gie-id=1\noperate-on-class-ids=0;\nconfig-file=0"
tracker = "[tracker]\nenable=1\ntracker-width=640\ntracker-height=384\nll-lib-file=/opt/nvidia/deepstream/deepstream-5.0/lib/libnvds_nvdcf.so\nll-config-file=/opt/nvidia/deepstream/deepstream-5.0/samples/configs/deepstream-app/tracker_config.yml\ngpu-id=0\nenable-batch-process=0\nenable-past-frame=0\ndisplay-tracking-id=1"
ds_example = "[ds-example]\nenable=0\nfull-frame=1\ngpu-id=0\ncamera-id=0\nperson=0\ncar=0\nmask=0\nplate=0\ncar-color=0\ncar-type=0\ndev=0"


def execBash(cmd):
    process = subprocess.Popen(cmd.split(), stdout = subprocess.PIPE)
    output, error = process.communicate()
    print(output,error)

def getClientInfo(token):
    client = MongoClient('mongodb+srv://ubuntu:chichas@clusteromia.odhmh.mongodb.net/omia?retryWrites=true&w=majority', 27017)
    db = client['omia']
    coll = db['cliente']

    for info in coll.find({"token" : token}):
        return info

def updateModelSH(token, path=model_script_path, models=models_dict):
    file = open(path, "w")
    user_info = getClientInfo(token)

    cmd = '#!/bin/bash \n test -d "/models" || mkdir /models  \n cd / \n'
    file.write(cmd)

    pgie = user_info['solicitud']['modelo_primario']
    cmd = "rclone sync cloud_modelos:modelsdigevo/"+models[pgie]+" /models/"+models[pgie] +"\n"
    file.write(cmd)

    sgies = user_info['solicitud']['modelo_secundario']
    for i in sgies:
        cmd = "rclone sync cloud_modelos:modelsdigevo/"+models[i]+" /models/"+models[i] + "\n"
        file.write(cmd)
    file.close()

def parseConfigFile(token, path=config_file_path, models=models_dict):
    user_info = getClientInfo(token)
    sources_list = user_info["solicitud"]["video"]["url"]
    sgies_list = user_info["solicitud"]["modelo_secundario"]
    cam_list = user_info["solicitud"]["camara_id"]
    tipo = user_info["solicitud"]["video"]["tipo"]
    pgie = user_info["solicitud"]["modelo_primario"]
    save_meta = user_info["solicitud"]["guardar_metadata"]

    sources = ""
    sgies = ""
    ids = ""

    _streammux = streammux.replace("batch-size=0","batch-size="+str(len(sources_list)))

    for count,url in enumerate(sources_list):
        _source = source.replace("[source]","[source"+str(count)+"]")
        _source = _source.replace("enable=0","enable=1")

        if tipo == "stream":
            _source = _source.replace("_type=0","type=4")
            _streammux = _streammux.replace("live-source=0","live-source=1")

        elif tipo == "video":
            _source = _source.replace("_type=0","type=2")

        _source = _source.replace("uri=0","uri="+url)
        sources += _source + "\n\n"

    _primary_gie = primary_gie.replace("batch-size=0","batch-size="+str(len(sources_list)))
    _primary_gie = _primary_gie.replace("config-file=0","config-file=/models/"+models_dict[pgie]+"config_infer_primary.txt")

    for count,model in enumerate(sgies_list):
        _sgie = secondary_gie.replace("[secondary-gie]","[secondary-gie"+str(count)+"]")
        _sgie = _sgie.replace("enable=0","enable=1")

        if model == "color_auto":
            _sgie = _sgie.replace("gie-unique-id=0","gie-unique-id=5")
            _sgie = _sgie.replace("config-file=0","config-file=/models/"+models_dict["color_auto"]+"config_infer_secondary.txt")
        elif model == "tipo_auto":
            _sgie = _sgie.replace("gie-unique-id=0","gie-unique-id=4")
            _sgie = _sgie.replace("config-file=0","config-file=/models/"+models_dict["tipo_auto"]+"config_infer_secondary.txt")

        sgies += _sgie + "\n\n"

    for id in cam_list:
        ids += str(int(id)) +";"
    ids = ids[:-1]

    _ds_example = ds_example.replace("camera-id=0","camera-id="+ids)
    _ds_example = _ds_example.replace("dev=0","dev=1")

    if save_meta:
        _ds_example = _ds_example.replace("enable=0","enable=1")
    elif "peoplenet" in pgie:
        _ds_example = _ds_example.replace("person=0","person=1")
    elif "trafficcam" in pgie:
        _ds_example = _ds_example.replace("car=0","car=1")
    elif "color_auto" in sgies_list:
        _ds_example = _ds_example.replace("car-color=0","car-color=1")
    elif "tipo_auto" in sgies_list:
        _ds_example = _ds_example.replace("car-type=0","car-type=1")

    complete_config = application + "\n\n" + tiled_display + "\n\n" + sources + \
    "\n" + sink0 + "\n\n" + sink1 + "\n\n" + sink2 + "\n\n" + osd + "\n\n" + \
    _streammux + "\n\n" + _primary_gie + "\n\n" + sgies + "\n" + tracker + "\n\n" + _ds_example

    return complete_config

def createConfigFile(config,path=config_file_path):
    with open(path,'w') as file:
        file.write(config)
        print("configuration file created")

if __name__ == "__main__":
    args = str(sys.argv[1])
    updateModelSH(args)
    config_info = parseConfigFile(args)
    createConfigFile(config_info)
