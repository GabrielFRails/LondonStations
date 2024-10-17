# Copyright (c) 2024, Gabriel Freitas

import csv
import json

def etl_generate_stations():
    stations = []
    with open('metrosp_stations_filtered.csv', newline='', encoding='utf-8') as spmfile:
        reader = csv.DictReader(spmfile, delimiter=';')
        for row in reader:
            row['lines'] = eval(row['line'])  # Avaliar a string como lista
            row['neighbors'] = eval(row['neigh'])
            row['lat'] = eval(row['lat'].replace(",", "."))
            row['lon'] = eval(row['lon'].replace(",", "."))
            del row['line']
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
    
    with open("view/stations.json", "w", encoding='utf-8') as out:
        json.dump(__stations, out, ensure_ascii=False, indent=4)

etl_get_stations()