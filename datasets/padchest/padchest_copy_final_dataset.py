# script for filtering pad chest dataset
#import numpy as np
import pandas as pd
import shutil

# paths
path_external_drive = '/mnt/f/BIMCV-PadChest/unzipped/'
path_destination_drive = path_external_drive

path_pneumonia_files = 'relevant_files/pneumonia/'
path_normal_files = 'relevant_files/normal/'

csv_pneumonia = path_external_drive + 'relevant_files/final_pneumonia_meta_data_filtered.csv'
csv_normal = path_external_drive + 'relevant_files/final_normal_meta_data_filtered.csv'

# read meta data from csv to pandas dataframe
pneumonia_meta_data = pd.read_csv(csv_pneumonia) # usecols= ['ImageID','ImageDir','Projection','Labels'], sep='(,{1})(?! )',
normal_meta_data = pd.read_csv(csv_normal) # usecols= ['ImageID','ImageDir','Projection','Labels'], sep='(,{1})(?! )',

number_of_files = len(normal_meta_data)
i = 0

print('found ' + str(number_of_files) + ' normal relevant files, starting to copy them')

# copying the files
for index, row in normal_meta_data.iterrows():
    i += 1
    # copy
    source = path_external_drive + str(row['ImageDir']) + '/' + str(row['ImageID'])
    destination = path_destination_drive + path_normal_files + str(row['ImageID'])
    shutil.copyfile(source, destination)
    print(str(i) + "/" + str(number_of_files) + " copied")


number_of_files = len(pneumonia_meta_data)
i = 0

print('found ' + str(number_of_files) + ' pneumonia relevant files, starting to copy them')

# copying the files
for index, row in pneumonia_meta_data.iterrows():
    i += 1
    # copy
    source = path_external_drive + str(row['ImageDir']) + '/' + str(row['ImageID'])
    destination = path_destination_drive + path_pneumonia_files + str(row['ImageID'])
    shutil.copyfile(source, destination)
    print(str(i) + "/" + str(number_of_files) + " copied")
