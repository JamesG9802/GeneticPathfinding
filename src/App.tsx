import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Graph2D, Node2D, Node2DEquals } from './algorithm/Graph2D'
import { PPGA, rebuild_path } from './algorithm/PPGA'

function App() {
  const [count, setCount] = useState(0)

  let graph: Graph2D = new Graph2D(10, 10);
  graph.walls.add({x: 5, y: 0});
  graph.walls.add({x: 5, y: 1});
  graph.walls.add({x: 5, y: 2});
  graph.walls.add({x: 5, y: 3});
  graph.walls.add({x: 5, y: 4});
  graph.walls.add({x: 5, y: 5});
  graph.walls.add({x: 5, y: 7});
  graph.walls.add({x: 5, y: 9});
  let connections = PPGA<Node2D>(
    graph, 
    {x: 0, y: 0}, 
    {x: 9, y: 9}, 
    (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y));

  let path = rebuild_path(connections, {x: 0, y: 0}, {x: 9, y: 9}, Node2DEquals);

  let grid: number[][] = [];
  for(let i = 0; i < 10; i++) {
    let arr = [];
    for(let j = 0; j < 10;j ++) {
      arr.push(0);
    }
    grid.push(arr)
  }

  let walls = graph.walls.values();
  for(let i = 0; i < walls.length; i++) {
    let v = walls[i];
    grid[v.y][v.x] = 1;
  }

  for(let i = 0; i < path.length;i++) {
    let v = path[i];
    grid[v.y][v.x] = 2;
  }

  let string = "";
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      if(grid[i][j] == 0) {
        string += "- ";
      }
      else if (grid[i][j] == 1) {
        string += "X ";
      }
      else if (grid[i][j] == 2) {
        string += "@ ";
      }
    }
    string += "\n";
  }
  console.log(string);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
