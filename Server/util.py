import json
import pickle
import numpy as np

__data_columns  = None
__locations = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x1 = np.zeros(len(__data_columns))
    x1[0] = sqft
    x1[1] = bath
    x1[2] = bhk

    if(loc_index>=0):
        x1[loc_index] = 1
    return __model.predict([x1])[0]

def get_location_names():
    return __locations

def load_saved_artifacts():
    print('Loading saved artifacts..start')
    global __data_columns
    global __locations
    global __model

    with open("C:/Users/dell/Documents/BHP/Server/artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_coulumns']
        __locations = __data_columns[3:]

    with open('C:/Users/dell/Documents/BHP/Server/artifacts/bangalore_home_prices_model.pickle', 'rb') as f:
        __model = pickle.load(f)
    print("loading saved artifacts..done")
    

if __name__ == '__main__':
    print("hit")
    load_saved_artifacts()
    # print(get_location_names())
    print(get_estimated_price("banashankari stage ii", 1000, 1, 1))