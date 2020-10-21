import cv2
import numpy as np

class ImagePreprocessor():

    def __init__(self, img_size):
        self.__img_size = img_size

    def image_preparation(self, image):
        image = image.read()
        image = np.frombuffer(image, np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (self.__img_size, self.__img_size))
        return image

    def mask_preparation(self, mask):
        mask = mask.read()
        mask = np.frombuffer(mask, np.uint8)
        mask = cv2.imdecode(mask, cv2.IMREAD_GRAYSCALE)
        mask = cv2.resize(mask, (self.__img_size, self.__img_size))
        mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)[1]
        return mask

    def apply_mask(self, image, mask):
        cutout = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY) * mask
        cutout = cutout.reshape(self.__img_size, self.__img_size)
        return cutout


