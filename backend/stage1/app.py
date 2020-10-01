import os
import io
import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt
from flask import Flask, flash, request, redirect, url_for, send_file, make_response
from werkzeug.utils import secure_filename
from PIL import Image

UPLOAD_FOLDER = 'backend/uploads/'
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])
IMG_SIZE = 256 # 256x256

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# segmentation model
segm_model = tf.keras.models.load_model("models/unet_0109_3.h5", compile=False)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def encodeImage(data):
    return bytes(data) #encode Numpay to Bytes string

@app.route('/stage1/predict', methods = ['GET', 'POST'])
def predict_mask():
    if request.method == 'POST':
        f = request.files['img']
        if f and allowed_file(f.filename):
            f_str = f.read()
            npimg = np.frombuffer(f_str, np.uint8)
            img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
            mask = segm_model.predict(np.array([img]), batch_size=None)
            mask = mask.reshape((mask.shape[1], mask.shape[2], mask.shape[3]))
            mask = (mask * 255.).astype(np.uint8)
            return send_file(encode_img(mask), mimetype='image/jpg')

def encode_img(data):
     is_success, buffer = cv2.imencode(".jpg", data)
     return io.BytesIO(buffer)

if __name__ == '__main__':
    app.run(debug = True)