const selectedStations = []

function getClickEvents() {
    renderer.on('clickNode', ({node}) => {
        handleClick(node)
    })
    document.getElementById("clearBtn")
        .addEventListener("click", function() { 
            clearSelectedPath() 
        });
}

function handleClick(node) {    
    let station = stations.find(s => s.station == node)

    if(selectedStations.includes(node)) {
        if(twoStationsSelected()) clearPath()
        removeStation(station)
        return
    }

    if(twoStationsSelected()) return
    
    addStation(station)

    if(twoStationsSelected()) {
        const start = stations.find(s => s.station == selectedStations[0])
        const end = stations.find(s => s.station == selectedStations[1])

        const path = getShortestPath(start, end).map(n => n.name)
        const pathStr = path.join(' > ')
        const pathDiv = document.getElementById('path')
        pathDiv.innerHTML = `<p>O caminho mais curto entre as estações selecionadas é: <br/> ${pathStr}</p>`

        highlightPath(path)
    }
}

function twoStationsSelected() {
    return selectedStations.length == 2
}

function addStation(station) {
    console.log('add', station)
    const p = document.getElementById(`station${selectedStations.length + 1}`)
    p.innerHTML += station.name
    selectedStations.push(station.station)
}

function removeStation(station) {
    console.log('remove', station)
    const index = selectedStations.findIndex(s => s == station.station)
    selectedStations.splice(index, 1)

    const p = document.getElementById(`station1`)
    const p2 = document.getElementById('station2')
    p2.innerHTML = 'Estação 2: '
    
    if(index == 2) {
        const p2 = document.getElementById('station2')
        p2.innerHTML = 'Estação 2: '
        p.innerHTML = `Estação 1: ${station.name}`
    } else p.innerHTML = 'Estação 1: '

    if(selectedStations.length > 0) {
        let station = stations.find(s => s.station == selectedStations[0])
        p.innerHTML += station.name
    }
}

function getShortestPath(start, end) {
    const queue = [[start]];
    const visited = new Set();

    while (queue.length) {
        const path = queue.shift();
        const node = path[path.length - 1];

        if (node.station === end.station) {
            return path
        }

        if (!visited.has(node)) {
            visited.add(node);

            for (const neighbor of node.neighbors) {
                const neighStation = stations.find(s => s.station == neighbor)
                const newPath = [...path, neighStation];
                queue.push(newPath);
            }
        }
    }

    return null;
}

function clearSelectedPath() {
    const selectedStationsCopy = Object.assign([], selectedStations)
    for(const stationName of selectedStationsCopy) {
        let station = stations.find(s => s.station == stationName)
        removeStation(station)
    }
    clearPath()
    createSigmaInstance()
}

function clearPath() {
    const pathDiv = document.getElementById('path')
    pathDiv.innerHTML = ''
}

function createEventListeners() {
    getClickEvents()
}

function highlightPath(path) {
    graph.forEachNode((node) => {
        const label = graph.getNodeAttribute(node, 'label');
        if (!path.includes(label)) {
            graph.updateNodeAttribute(node, 'color', () => '#eeeeee'); // Destaca em vermelho os do caminho
        }
    });

    graph.forEachEdge((edge) => {
        const sourceLabel = graph.getNodeAttribute(graph.source(edge), 'label');
        const targetLabel = graph.getNodeAttribute(graph.target(edge), 'label');

        // Verifica se ambos os nós da aresta estão no caminho mais curto
        if (!(path.includes(sourceLabel) && path.includes(targetLabel))) {
            graph.updateEdgeAttribute(edge, 'color', () => '#eeeeee'); // Destaca em vermelho
        }
    });

    renderer.refresh()
}