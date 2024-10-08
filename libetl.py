# Copyright (c) 2024, Gabriel Freitas

import csv

def etl_generate_stations():
    stations = []
    with open('metrosp_stations_filtered.csv', newline='', encoding='utf-8') as spmfile:
        reader = csv.DictReader(spmfile, delimiter=';')
        for row in reader:
            row['lines'] = eval(row['line'])  # Avaliar a string como lista
            row['neighbors'] = eval(row['neigh'])
            del row['lines']
            del row['neigh']
            stations.append(row)
    
    index_map = {s['station']: i for i, s in enumerate(stations)}
    for s in stations:
        neigh_indexes = []
        for n in s['neighbors']:
            neigh_indexes.append(index_map[n])
        
        s['neigh_indexes'] = neigh_indexes
    
    return stations

__stations = None
def etl_get_stations():
    global __stations
    if not __stations:
        __stations = etl_generate_stations()
    
    return __stations

