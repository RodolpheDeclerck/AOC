class Graph {
    constructor(nodes) {
        this.nodes = nodes;
    }

    copier() {
        // Utilisation du constructeur pour créer une nouvelle instance
        return new Graph(this.nodes);
      }

    static avecAutresValeurs() {
        return newGraph(new Map());
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

    copy()
    {
        return new Graph().setNodes(this.nodes);
    }

    cut3RandomWire(){

              // Obtenir un tableau des clés de la Map
         let keysArray = Array.from(this.nodes.keys());

        // Obtenir une clé aléatoire de la Map
         let node1 = keysArray[Math.floor(Math.random() * keysArray.length)];

         keysArray = keysArray.filter(element => element !== node1);

         let node2 = this.nodes.get(node1)[Math.floor(Math.random() * this.nodes.get(node1).length)];

         keysArray = keysArray.filter(element => element !== node2);

         const updatedNode = this.nodes.get(node1).filter(element => element !== node2);

         // Set the updated array back to the Map
         this.nodes.set(node1, updatedNode);
 
         const updatedNode2 = this.nodes.get(node2).filter(element => element !== node1);
 
         // Set the updated array back to the Map
         this.nodes.set(node2, updatedNode2);

         console.log("cut : " + node1 +","+node2)


         let node3 = keysArray[Math.floor(Math.random() * keysArray.length)];
         
         keysArray = keysArray.filter(element => element !== node3);

         let node4 = this.nodes.get(node3)[Math.floor(Math.random() * this.nodes.get(node3).length)];

         keysArray = keysArray.filter(element => element !== node4);

         const updatedNode3 = this.nodes.get(node3).filter(element => element !== node4);

         // Set the updated array back to the Map
         this.nodes.set(node3, updatedNode3);
 
         const updatedNode4 = this.nodes.get(node4).filter(element => element !== node3);
 
         // Set the updated array back to the Map
         this.nodes.set(node4, updatedNode4);

         console.log("cut 2 : " + node3 + "," + node4)


         let node5 = keysArray[Math.floor(Math.random() * keysArray.length)];

         keysArray = keysArray.filter(element => element !== node5);

         let node6 = this.nodes.get(node5)[Math.floor(Math.random() * this.nodes.get(node5).length)];

         keysArray = keysArray.filter(element => element !== node6);

         const updatedNode5 = this.nodes.get(node5).filter(element => element !== node6);

         // Set the updated array back to the Map
         this.nodes.set(node5, updatedNode5);
 
         const updatedNode6 = this.nodes.get(node6).filter(element => element !== node5);
 
         // Set the updated array back to the Map
         this.nodes.set(node6, updatedNode6);

         console.log("cut 3 : " + node5 + "," + node6)

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
  }


  const fs = require('fs');

  // Nom du fichier
  const fileName = 'diagramme.txt';

  // Lecture du contenu du fichier
  const content = fs.readFileSync(fileName, 'utf-8').replace(/:/g, '');

  const nodeList = content.split(/[\r\n]+/g);

  let graph = new Graph(new Map());

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

  /*
  graph.cutWire('hfx', 'pzl');

  graph.cutWire('nvd', 'jqt');

  graph.cutWire('bvb', 'cmg');
  */

  while(graph.isGraphConnected())
  {
    graph = new Graph(new Map());

     nodeList.forEach(element => {
      elementList = element.split(" ");
      elementList.forEach(node => {
        graph.addNode(node);
      })
     });;

     nodeList.forEach(element => {
        elementList = element.split(" ");
        childList = elementList.slice(1, elementList.length);
        childList.forEach(child => {
            console.log(child);
            graph.addEdge(elementList[0], child);
        })
    });

     graph.cut3RandomWire();
  }

  console.log('\nGraph :', graph);




