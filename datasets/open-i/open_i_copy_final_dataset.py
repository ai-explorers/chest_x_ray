# script for filtering pad chest dataset
#import numpy as np
import pandas as pd
import shutil
from pathlib import Path

# paths
base_path = '/mnt/f/05_DatensaetzeJan/Open-i'
path_normal_files = '/relevant_files/normal/'
csv_normal = '/home/jan/projects/chest_x_ray/chest_x_ray/datasets/open-i/final_projections_filtered.csv'

# read meta data from csv to pandas dataframe

normal_meta_data = pd.read_csv(csv_normal)

number_of_files = len(normal_meta_data)
i = 0

print('found ' + str(number_of_files) + ' normal relevant files, starting to copy them')

# # copying the files
for index, row in normal_meta_data.iterrows():
    i += 1
    
    # paths
    source = base_path + '/NLMCXR_png/' + str(row.filename)
    destination = base_path + path_normal_files + str(row.filename)

    output_str = str(i) + "/" + str(number_of_files)
    
    # copy
    if Path(destination).is_file():
        output_str = output_str + " already existed"
    else:
        shutil.copyfile(source, destination)
        output_str = output_str + " copied"

    print(output_str)