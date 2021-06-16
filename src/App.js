import React from 'react'
import Routing from "./compoents/Routing";
const  App = () => {
  if(!localStorage.getItem('count')){
    localStorage.setItem('count',0)
  }
  return (
    <div className="App" style={{background: '#B4A5A5',}}>
      <Routing/>
    </div>
  );
}

export default App;
