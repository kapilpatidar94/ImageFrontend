import React from 'react'
import Routing from "./compoents/Routing";
function App() {
  if(!localStorage.getItem('count')){
    localStorage.setItem('count',0)
  }
  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
