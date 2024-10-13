const lineColors = {
    'amarela': 'yellow',
    'amarela_azul': '#88F601',
    'amarela_vermelha': 'orange',
    'azul': 'blue',
    'azul_lilas': '#7C01F6',
    'azul_vermelha': 'purple',
    'azul_verde': '#01F690',
    'lilas': '#D580ED',
    'lilas_verde': '#7DDA58',
    'prata': 'gray',
    'vermelha': 'red',
    'verde': 'green'
};

async function getStations() {
    return await fetch('../../stations.json')
        .then(res => {
            return res.json()
        })
}

function getNodeColor(lines) {
    let color = lines[0]
    if(lines.length > 1) color = `${lines[0]}_${lines[1]}`
    
    return lineColors[color]
}

function addGraphNodes(graph, stations) {
    stations.forEach((station) => {
        graph.addNode(station.station, {
            label: station.name,
            color: getNodeColor(station.lines),
            size: 10,  // Set default size for nodes,
            x: station.lat,
            y: station.lon,
        });
    });
}

function addGraphEdges(graph, stations) {
    stations.forEach((station) => {
        station.neighbors.forEach((neighbor) => {
            try {
                graph.addEdge(station.station, neighbor, { size: 3 });
            } catch (error) {
                console.error(error)
            }
        });
    });
}

async function createGraph() {
    const graph = new graphology.Graph();
    const stations = await getStations()
    window.stations = stations

    addGraphNodes(graph, stations)
    addGraphEdges(graph, stations)
    
    return graph
}

async function createSigmaInstance() {
    const graph = await createGraph()
    const container = document.getElementById('graph-container');
    
    window.renderer = new Sigma(
        graph,
        container
    );

    createEventListeners()
}

createSigmaInstance()