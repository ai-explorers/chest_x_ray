# script for filtering pad chest dataset
#import numpy as np
import pandas as pd
import shutil

# paths
path_external_drive = '/mnt/f/BIMCV-PadChest/unzipped/'
path_pneumonia_files = 'relevant_files/pneumonia/'
csv_meta_data = 'remaining120000.csv'
# csv_meta_data = 'first40000.csv'
# csv_meta_data = 'PADCHEST_chest_x_ray_images_labels_160K_01.02.19.csv'

# read meta data from csv to pandas dataframe
meta_data = pd.read_csv(path_external_drive + csv_meta_data, engine='python') # usecols= ['ImageID','ImageDir','Projection','Labels'], sep='(,{1})(?! )',

#print(meta_data.head)

meta_data['Labels'] = [label if label is not None and label is not [] and type(label) is not float else '' for label in meta_data['Labels']]
meta_data['Projection'] = [projection if projection is not None and projection is not [] else '' for projection in meta_data['Projection']]

# extract file names of relevant files
relevant_files = [True if 'pneumonia' in data[31] and data[9] != 'L' else False for data in meta_data.values]

filtered_df = meta_data[relevant_files]
filtered_df.to_csv(path_external_drive + path_pneumonia_files + 'filtered_' + csv_meta_data)

number_of_files = len(filtered_df)
i = 0

print('found ' + str(number_of_files) + ' relevant files, starting to copy them')

# copying the files
for index, row in filtered_df.iterrows():
    i += 1
    # copy
    source = path_external_drive + str(row['ImageDir']) + '/' + str(row['ImageID'])
    destination = path_external_drive + path_pneumonia_files + str(row['ImageID'])
    shutil.copyfile(source, destination)
    print(str(i) + "/" + str(number_of_files) + " copied")

# --- TESTING ---
# meta_data2 = pd.read_csv('/mnt/c/Users/Jan/Daten/Geschäftlich/Capgemini/scripts/tmp/mini_csv_test_file.csv', usecols= ['ImageID','ImageDir','Projection','Labels'], sep='(,{1})(?! )', engine='python')
# meta_data2['Labels'] = [label if label is not None and not [] else '' for label in meta_data2['Labels']]
# relevant_files2 = [data for data in meta_data2 if 'fibrosis' in data]