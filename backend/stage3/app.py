import os
import io
import tensorflow as tf
import numpy as np
from flask import Flask, flash, request, redirect, url_for, send_file, make_response
from flask_cors import CORS
import json
from modules.image_preprocessor import ImagePreprocessor

UPLOAD_FOLDER = 'backend/uploads/'
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])
IMG_SIZE = 256 # 256x256

preprocessor = ImagePreprocessor(img_size=IMG_SIZE)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# cnn model
cnn_model = tf.keras.models.load_model("model/custom_bacteria_vs_viral_0809_w_masks.h5", compile=False)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/stage3/predict', methods = ['GET', 'POST'])
def predict_pneumonia():
    if request.method == 'POST':
        # extract data from message
        img = request.files['img']
        mask = request.files['mask']
        if img and allowed_file(img.filename):
            if mask and allowed_file(mask.filename):
                # conversions, cutout, etc.
                img = preprocessor.image_preparation(image=img)
                mask = preprocessor.mask_preparation(mask=mask)
                cutout = preprocessor.apply_mask(image=img, mask=mask)
                
                # input consists of channels: red, green, blue, cutout (grayscaled)
                model_input = np.dstack((img, cutout))

                # shape needs to be (batch_size, 256, 256, 4)
                model_input = model_input.reshape(1, model_input.shape[0], model_input.shape[1], model_input.shape[2])

                # normalize values
                model_input = model_input / 255.0

                prediction = cnn_model.predict(model_input)

                # observe result
                if prediction < 0.5:
                    result = "BACTERIA"
                else:
                    result = "VIRAL"
                
                # convert prediction to json acceptable format
                prediction_value = prediction[0][0]
                prediction_value = json.dumps(prediction_value.item())

                return {
                    "result": result,
                    "prediction_value": prediction_value,
                }

@app.route('/stage3/health')
def healthcheck():
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

if __name__ == '__main__':
    app.run()