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

      const neighbors = this.nodes.get(node2);
    
      const updatedNode = this.nodes.get(node1).filter(element => element !== node2);

      // Set the updated array back to the Map
      this.nodes.set(node1, updatedNode);

      this.nodes.delete(node2);
      neighbors.forEach(neighbor => {
          if(neighbor !== node1){
              if(!this.nodes.get(node1).includes(neighbor))
              {
                  this.nodes.get(node1).push(neighbor);
              }
              if(!this.nodes.get(neighbor).includes(node1))
              {
                  this.nodes.get(neighbor).push(node1);
              }
              if(this.nodes.get(neighbor).includes(node2))
              {
                  const updatedNode2 = this.nodes.get(neighbor).filter(element => element !== node2);

                  // Set the updated array back to the Map
                  this.nodes.set(neighbor, updatedNode2);
              }
          }
      })
  }
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
      console.log("First Graph : " + Array.from(visited.values()));

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


    mergedNextNode()
    {
      // Obtenir un tableau des clés de la Map
    let keysArray = Array.from(this.nodes.keys());

    let randomIndex = Math.floor(Math.random() * keysArray.length);

    // Obtenir une clé aléatoire de la Map
      let randomKey = keysArray[randomIndex];
      this.mergedNodes(randomKey, this.nodes.get(randomKey)[0]);
      if(this.nodes.size > 2)
      {
          this.mergedNextNode();
      }
    }

    bfsWithPathAll(startNode, endNode) {
      const queue = [[startNode]];
      const visited = new Set();
      const allPaths = [];
    
      while (queue.length > 0) {
        const currentPath = queue.shift();
        const currentNode = currentPath[currentPath.length - 1];
    
        if (currentNode === endNode) {
          allPaths.push(currentPath.slice()); // Ajoutez une copie du chemin trouvé
        }
    
        visited.add(currentNode);
    
        for (const neighbor of this.nodes.get(currentNode)) {
          if (!visited.has(neighbor)) {
            const newPath = currentPath.slice();
            newPath.push(neighbor);
            queue.push(newPath);
          }
        }
      }
    
      return allPaths.length > 0 ? allPaths : null;
    }
  

    findEdgeToCut(source, destination) {

      console.log("source :" + source);
      console.log("destination :" + destination)
      const visited = new Set();
      const stack = [];
      const path = [];
  
      stack.push(source);
  
      while (stack.length !== 0) {
        const current = stack.pop();
  
        if (current === destination) {
          // Retournez le chemin trouvé
          return path;
        }
  
        if (!visited.has(current)) {
          visited.add(current);
  
          let neighbors =  this.nodes.get(current);

          console.log("NNN :" + neighbors);
          if(neighbors != null)
          {
          neighbors.forEach(neighbor => { {
            stack.push(neighbor);
            // Mettez à jour le chemin pour inclure l'arête courante
            path.push([current, neighbor]);
          }
        });
      }

      }
  
      return null;  // Pas de chemin trouvé
    }

    
  }

  dfsWithPathAll(startNode, endNode, visited = new Set(), currentPath = [], allPaths = []) {
    currentPath.push(startNode);
  
    if (startNode === endNode) {
      allPaths.push(currentPath.slice()); // Add a copy of the found path
    }
  
    visited.add(startNode);
  
    const neighbors = this.nodes[startNode];
  
    if (!neighbors) {
      console.error(`No neighbors found for node ${startNode}`);
      return null;
    }
  
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfsWithPathAll(neighbor, endNode, new Set(visited), currentPath.slice(), allPaths);
      }
    }
  
    return allPaths.length > 0 ? allPaths : null;
  }

  dfs2(startNode, endNode, visited = new Set(), path = []) {
    visited.add(startNode);
    path.push(startNode);

    if (startNode === endNode) {
      return path.slice();  // Return a copy of the path
    }

    for (const neighbor of this.nodes.get(startNode)) {
      if (!visited.has(neighbor)) {
        const result = this.dfs2(neighbor, endNode, visited, path);
        if (result) {
          return result;
        }
      }
    }

    path.pop();
    return null;
  }

  findEdgesToIsolateNodes(node1, node2) {
    const path = this.dfs2(node1, node2);

    if (!path) {
      console.error('No path found between the nodes.');
      return null;
    }

    const edgesToIsolate = [];
    for (let i = 0; i < path.length - 1; i++) {
      edgesToIsolate.push([path[i], path[i + 1]]);
    }

    return edgesToIsolate;
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
}



  const fs = require('fs');

  // Nom du fichier
  const fileName = 'diagramme.txt';

  // Lecture du contenu du fichier
  const content = fs.readFileSync(fileName, 'utf-8').replace(/:/g, '');

  const nodeList = content.split(/[\r\n]+/g);

  let size = 20;


  while(size != 5) {
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
          console.log(child);
          graph.addEdge(elementList[0], child);
      })
  });


  console.log('\nContenu du fichier:', nodeList);

  console.log('\nGraph :', graph);

  console.log("Neighbors :" + graph.getNeighbors('xhk'));

  graph.mergedNextNode();

  let iterator = graph.nodes.keys();

  console.log('\nGraph :', graph);

  graph = new Graph();

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
          graph.addEdge(elementList[0], child);
      })
  });

  let value1 = iterator.next().value;

  let value2 = iterator.next().value;

let toCut = graph.findEdgesToIsolateNodes(value1, value2);
let toCut2 = graph.findEdgesToIsolateNodes(value2, value1);
let toCut3 = graph.findEdgesToIsolateNodes(value1, value2);

console.log("to cut size :" + toCut.length);
console.log("to cut :" + toCut);
console.log("to cut2 :" + toCut2);
console.log("to cut :" + toCut3);

size = toCut.length;

  graph.cutWire('rzs','qnr')
  graph.cutWire('cmg','nvd')
  graph.cutWire('nvd','jqt')

  console.log(graph.isGraphConnected());
}