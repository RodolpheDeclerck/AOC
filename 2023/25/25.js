class Graph {
    constructor() {
      this.nodes = new Map();
    }

    addNode(node) {
      this.nodes.set(node, []);
    }

    addEdge(node1, node2) {
      this.nodes.get(node1).push(node2);
      this.nodes.get(node2).push(node1); // Pour un graphe non orienté
    }

    getNeighbors(node) {
      return this.nodes.get(node);
    }

    mergedNodes(node1, node2){

        if(this.nodes.get(node1).includes(node2)){
  
            const mergedNode = node1 + "," + node2;

            this.addNode(mergedNode);

            if(this.nodes.get(node1) !== undefined)
            {
                const neighborsNode1 = this.nodes.get(node1).filter(element => element !== node2);

                neighborsNode1.forEach(neighborNode1 => {
                    if(this.nodes.get(neighborNode1) !== undefined)
                    {
                        this.addEdge(mergedNode, neighborNode1);
                        const updatedNeighborNode1 = this.nodes.get(neighborNode1).filter(element => element !== node1);
                        this.nodes.set(neighborNode1, updatedNeighborNode1);
                    }
                });
            }

            if(this.nodes.get(node2) !== undefined)
            {
               
                const neighborsNode2 = this.nodes.get(node2).filter(element => element !== node1 );

                neighborsNode2.forEach(neighborNode2 => {
                    if(this.nodes.get(neighborNode2) !== undefined && !this.nodes.get(neighborNode2).includes(mergedNode))
                    {
                        this.addEdge(mergedNode, neighborNode2);
                        
                    }

                    const updatedNeighborNode2 = this.nodes.get(neighborNode2).filter(element => element !== node2);
                        this.nodes.set(neighborNode2, updatedNeighborNode2);
                });
            }
            
            this.nodes.delete(node1);
            this.nodes.delete(node2);
        }
      }

    mergeNextNode(count)
    {
      // Obtenir un tableau des clés de la Map
    let keysArray = Array.from(this.nodes.keys());

    let randomIndex = Math.floor(Math.random() * keysArray.length);

    // Obtenir une clé aléatoire de la Map
      let randomKey = keysArray[randomIndex];
      if(this.nodes.size > 2)
      {
        this.mergedNodes(randomKey, this.nodes.get(randomKey)[0]);
        this.mergeNextNode();
      }
    }


    mergeRandomNode()
    {
             // Obtenir un tableau des clés de la Map
        let keysArray = Array.from(this.nodes.keys());

        let randomIndex = Math.floor(Math.random() * keysArray.length);

        // Obtenir une clé aléatoire de la Map
        let randomKey = keysArray[randomIndex];

        this.mergedNodes(randomKey, this.nodes.get(randomKey)[0]);
    }

    cutWire(node1, node2){
        const updatedNode = this.nodes.get(node1).filter(element => element !== node2);
        
        // Set the updated array back to the Map
        this.nodes.set(node1, updatedNode);
        
        const updatedNode2 = this.nodes.get(node2).filter(element => element !== node1);
        
        // Set the updated array back to the Map
        this.nodes.set(node2, updatedNode2);
        
        console.log("cut : " + node1 +","+node2)
    }

    isGraphConnected() {
        if (this.nodes.size === 0) {
          // Le graphe est considéré comme connexe s'il est vide
          return true;
        }
    
        const startNode = this.nodes.keys().next().value; // Prend un nœud arbitraire comme point de départ
        const visited = new Set();
    
        this.dfs(startNode, visited);
    
        console.log("First Graph Size : " + visited.size);
        //console.log("First Graph : " + Array.from(visited.values()));
  
        const connected = visited.size === this.nodes.size;
  
        visited.forEach(node => {
            this.nodes.delete(node);
        })
        if(!connected && this.nodes.size > 0) {
            this.isGraphConnected()
        }
  
        // Vérifie si tous les nœuds ont été visités
        return connected;
      }
    
      dfs(node, visited) {
        if (!visited.has(node)) {
          visited.add(node);
    
          for (const neighbor of this.nodes.get(node)) {
            this.dfs(neighbor, visited);
          }
        }
      }
}

function extractEdgesToCut(result, originalGraph) {
    // Parse la chaîne de caractères pour obtenir les nœuds à couper et les parties du graphe
    const [nodesToCutString, graphPartsString] = result.split(' => ');
    const nodesToCut = nodesToCutString.split(',');
    const graphParts = graphPartsString.split(',');
  
    // Crée un ensemble pour les nœuds à couper pour une recherche plus efficace
    const nodesToCutSet = new Set(nodesToCut);
  
    // Initialise un objet pour stocker les arêtes à couper
    const edgesToCut = {};
  
    // Parcourt les nœuds à couper
    for (const node of nodesToCut) {
      edgesToCut[node] = [];
  
      // Parcourt les parties du graphe pour trouver les voisins dans la partie opposée
      for (const partNode of graphParts) {
        if (nodesToCutSet.has(partNode)) continue; // Ignore les nœuds à couper eux-mêmes
  
        // Vérifie si le nœud à couper est connecté au nœud dans la partie opposée
        // Vous devrez ajuster cette condition en fonction de la structure réelle du graphe
        if (areNodesConnectedInOriginalGraph(node, partNode, originalGraph)) {
          edgesToCut[node].push(partNode);
        }
      }
    }
  
    return edgesToCut;
  }
  
  // Exemple de fonction pour vérifier si deux nœuds sont connectés dans le graphe initial
  function areNodesConnectedInOriginalGraph(node1, node2, originalGraph) {
    // Vérifiez si node1 et node2 sont des nœuds valides dans le graphe original
    if (!originalGraph.nodes.has(node1) || !originalGraph.nodes.has(node2)) {
      console.error('Au moins l\'un des nœuds n\'existe pas dans le graphe original : ' + node1 + ' et ' + node2);
      return false;
    }
  
    // Vérifiez si node2 est un voisin de node1 dans le graphe original
    if (originalGraph.nodes.get(node1).includes(node2)) {
      return true;
    }
  
    // Vérifiez si node1 est un voisin de node2 dans le graphe original
    if (originalGraph.nodes.get(node2).includes(node1)) {
      return true;
    }
  
    // Si aucun des deux cas n'est vrai, les nœuds ne sont pas connectés dans le graphe original
    return false;
  }
  
// Démarrez le chronomètre
console.time('executionTime');

const fs = require('fs');

// Nom du fichier
const fileName = 'diagramme.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8').replace(/:/g, '');

const nodeList = content.split(/[\r\n]+/g);

let valide = false;

let result = [];

let originalGraph = new Graph();


while(valide == false){

originalGraph = new Graph();

nodeList.forEach(element => {
    elementList = element.split(" ");
    elementList.forEach(node => {
        originalGraph.addNode(node);
    })
});


nodeList.forEach(element => {
    elementList = element.split(" ");
    childList = elementList.slice(1, elementList.length);
    childList.forEach(child => {
        //console.log(child);
        originalGraph.addEdge(elementList[0], child);
    })
});

let graph = new Graph();

nodeList.forEach(element => {
    elementList = element.split(" ");
    elementList.forEach(node => {
        graph.addNode(node);
    })
});


nodeList.forEach(element => {
    elementList = element.split(" ");
    childList = elementList.slice(1, elementList.length);
    childList.forEach(child => {
        //console.log(child);
        graph.addEdge(elementList[0], child);
    })
});

console.log('\originalGraph :', originalGraph);

graph.mergeNextNode(1);

console.log('\nGraph :', graph);

const graphToString = graph.nodes.keys().next().value;

const resultGraph = graphToString + " => " + graph.nodes.get(graphToString)[0];

const edgesToCut = extractEdgesToCut(resultGraph, originalGraph);
console.log("Edges to cut:", edgesToCut);

const primaryNode = Object.keys(edgesToCut);

let count = 0;
result = [];

primaryNode.forEach(edge => {
    if(edgesToCut[edge].length > 1)
    {
        count = count + 10;
    }
    if(edgesToCut[edge].length == 1)
    {
        count = count + 1;
        result[edge] = edgesToCut[edge][0];
        originalGraph.cutWire(edge, edgesToCut[edge][0]);
    }

});

console.log("count:", count);

if(count == 3)
{
    valide = true;
}

}

console.log("Graph is connected :",originalGraph.isGraphConnected());


// Démarrez le chronomètre
console.timeEnd('executionTime');
