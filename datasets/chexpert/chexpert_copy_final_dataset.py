# script for filtering pad chest dataset
#import numpy as np
import pandas as pd
import shutil

# paths
base_path = '/mnt/f/05_DatensaetzeJan/CheXpert/'

path_pneumonia_files = 'CheXpert-v1.0/relevant_files/pneumonia/'
path_normal_files = 'CheXpert-v1.0/relevant_files/normal/'

csv_pneumonia = '/home/jan/projects/chest_x_ray/chest_x_ray/datasets/chexpert/final_pneumonia_meta_data_filtered.csv'
csv_normal = '/home/jan/projects/chest_x_ray/chest_x_ray/datasets/chexpert/final_normal_meta_data_filtered.csv'

# read meta data from csv to pandas dataframe
pneumonia_meta_data = pd.read_csv(csv_pneumonia)
normal_meta_data = pd.read_csv(csv_normal)

number_of_files = len(normal_meta_data)
i = 0

print('found ' + str(number_of_files) + ' normal relevant files, starting to copy them')

# copying the files
for index, row in normal_meta_data.iterrows():
    i += 1
    # construct file name
    file_name = ''
    split_name = row['Path'].split('/')[-3:]
    for s in split_name:
        file_name += s
    # copy
    source = base_path + str(row['Path'])
    destination = base_path + path_normal_files + file_name
    shutil.copyfile(source, destination)
    print(str(i) + "/" + str(number_of_files) + " copied")


number_of_files = len(pneumonia_meta_data)
i = 0

print('found ' + str(number_of_files) + ' pneumonia relevant files, starting to copy them')

# copying the files
for index, row in pneumonia_meta_data.iterrows():
    i += 1
    # construct file name
    file_name = ''
    split_name = row['Path'].split('/')[-3:]
    for s in split_name:
        file_name += s
    # copy
    source = base_path + str(row['Path'])
    destination = base_path + path_pneumonia_files + file_name
    shutil.copyfile(source, destination)
    print(str(i) + "/" + str(number_of_files) + " copied")
