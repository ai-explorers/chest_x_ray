# script for filtering pad chest dataset
#import numpy as np
import pandas as pd
import shutil
from pathlib import Path

# paths
base_path = '/mnt/f/05_DatensaetzeJan/ChestX-ray14_NIH'

path_pneumonia_files = '/relevant_files/pneumonia/'
path_normal_files = '/relevant_files/normal/'

csv_pneumonia = '/home/jan/projects/chest_x_ray/chest_x_ray/datasets/chestxray14/final_pneumonia_meta_data_filtered.csv'
csv_normal = '/home/jan/projects/chest_x_ray/chest_x_ray/datasets/chestxray14/final_normal_meta_data_filtered.csv'

# read meta data from csv to pandas dataframe
pneumonia_meta_data = pd.read_csv(csv_pneumonia)
normal_meta_data = pd.read_csv(csv_normal)

number_of_files = len(normal_meta_data)
i = 0

print('found ' + str(number_of_files) + ' normal relevant files, starting to copy them')

# # copying the files
for index, row in normal_meta_data.iterrows():
    i += 1
    
    # paths
    source = base_path + '/images/' + str(row.ImageIndex)
    destination = base_path + path_normal_files + row.ImageIndex

    output_str = str(i) + "/" + str(number_of_files)
    
    # copy
    if Path(destination).is_file():
        output_str = output_str + " already existed"
    else:
        shutil.copyfile(source, destination)
        output_str = output_str + " copied"

    print(output_str)


number_of_files = len(pneumonia_meta_data)
i = 0

print('found ' + str(number_of_files) + ' pneumonia relevant files, starting to copy them')

# copying the files
for index, row in pneumonia_meta_data.iterrows():
    i += 1
    
    # paths
    source = base_path + '/images/' + str(row.ImageIndex)
    destination = base_path + path_pneumonia_files + row.ImageIndex

    output_str = str(i) + "/" + str(number_of_files)

    # copy
    if Path(destination).is_file():
        output_str = output_str + " already existed"
    else:
        shutil.copyfile(source, destination)
        output_str = output_str + " copied"

    print(output_str)
