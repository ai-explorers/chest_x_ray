import cv2
import numpy as np

class ImagePreprocessor():
    """
    A class to prepare images and masks as input of deep learning models.

    Attributes
    ----------
    img_size (int) : Resolution of the model input. Images will automatically be scaled to (img_size x img_size)

    Methods
    -------
    image_preparation(self, image):
        Prepares the given image to match the input of the deep learning model.

    mask_preparation(self, mask):
        Prepares the given mask for it's application.

    apply_mask(self, image, mask):
        Applies a binarized mask on a X-ray image.
    """

    def __init__(self, img_size):
        self.__img_size = img_size

    def image_preparation(self, image):
        """Decode, convert and resize a X-ray image to match the desired input of the deep learning model.

        Inputs:
            image : the image to be prepared
        """
        image = image.read()
        image = np.frombuffer(image, np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (self.__img_size, self.__img_size))
        return image

    def mask_preparation(self, mask):
        """Decode, resize and binarize a mask to prepare it for it's application.

        Inputs:
            mask : the mask to be prepared
        """
        mask = mask.read()
        mask = np.frombuffer(mask, np.uint8)
        mask = cv2.imdecode(mask, cv2.IMREAD_GRAYSCALE)
        mask = cv2.resize(mask, (self.__img_size, self.__img_size))
        mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)[1]
        return mask

    def apply_mask(self, image, mask):
        """Applies a binarized mask on a X-ray image. Only the lung will remain, everything else will be set to 0.

        Inputs:
            image : X-ray image in correct size and RGB colors
            mask  : the binarized mask that should be applied to the image

        Returns:
            Grayscaled cutout of the original X-ray.
        """
        cutout = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY) * mask
        cutout = cutout.reshape(self.__img_size, self.__img_size)
        return cutout


