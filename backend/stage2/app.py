import os
import io
import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt
from flask import Flask, flash, request, redirect, url_for, send_file, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import json

UPLOAD_FOLDER = 'backend/uploads/'
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])
IMG_SIZE = 256 # 256x256

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# cnn model
cnn_model = tf.keras.models.load_model("model/cnn_4channel_0809_w_masks.h5", compile=False)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/stage2/predict', methods = ['GET', 'POST'])
def predict_pneumonia():
    if request.method == 'POST':
        # extract data from message
        img = request.files['img']
        mask = request.files['mask']
        if img and allowed_file(img.filename):
            if mask and allowed_file(mask.filename):
                # get x-ray
                img_str = img.read()
                img = np.frombuffer(img_str, np.uint8)
                img = cv2.imdecode(img, cv2.IMREAD_COLOR)
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

                # get mask
                mask_str = mask.read()
                mask = np.frombuffer(mask_str, np.uint8)
                mask = cv2.imdecode(mask, cv2.IMREAD_GRAYSCALE)
                mask = cv2.resize(mask, (IMG_SIZE, IMG_SIZE))
                mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)[1]

                # apply mask to image
                cutout = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY) * mask
                cutout = cutout.reshape(IMG_SIZE, IMG_SIZE)
                
                # input consists of channels: red, green, blue, cutout
                model_input = np.dstack((img, cutout))
                # shape needs to be (batch_size, 256, 256, 4)
                model_input = model_input.reshape(1, model_input.shape[0], model_input.shape[1], model_input.shape[2])
                # normalize values
                model_input = model_input / 255.0
                prediction = cnn_model.predict(model_input)

                # observe result
                if prediction < 0.5:
                    result = "NORMAL"
                else:
                    result = "PNEUMONIA"
                
                # convert prediction to json acceptable format
                prediction_value = prediction[0][0]
                prediction_value = json.dumps(prediction_value.item())

                return {
                    "result": result,
                    "prediction": prediction_value,
                }


if __name__ == '__main__':
    app.run(debug = True)