import pandas as pd
import shutil
from os import listdir

def check_files(directory, csv):
    file_names = listdir(directory)

    df = pd.read_csv(csv)

    correct = 0
    errors = 0

    for i in df.ImageID:
        if (i in file_names):
            correct += 1
        else:
            errors += 1

    print('Number of files in file_list:', len(file_names))

    print('Correct files:', correct, 'of', len(df))
    print('Errors:', errors , 'of', len(df))


normal_dir = '/mnt/f/DatasetsChestXRay/NochNichtInS3Kopieren/BIMCV-PadChest/relevant_files/normal'
normal_csv = '/mnt/f/DatasetsChestXRay/NochNichtInS3Kopieren/BIMCV-PadChest/final_normal_meta_data_filtered.csv'

pneumonia_dir = '/mnt/f/DatasetsChestXRay/NochNichtInS3Kopieren/BIMCV-PadChest/relevant_files/pneumonia'
pneumonia_csv = '/mnt/f/DatasetsChestXRay/NochNichtInS3Kopieren/BIMCV-PadChest/final_pneumonia_meta_data_filtered.csv'

check_files(normal_dir, normal_csv)
check_files(pneumonia_dir, pneumonia_csv)
