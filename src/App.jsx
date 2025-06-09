import React from 'react';
import CanvasScene from './components/CanvasScene.jsx';
import Intro from './components/Intro.jsx'
import BackgroundScene from './components/BackgroundScene.jsx';



export default function App() {
  return (
    <>
      <div className="app">
        <BackgroundScene/>
        <CanvasScene/>
        <div className="content">
          <Intro/>
          <Intro/>
          <Intro/>
        </div>
        
      
      </div>
    </>
    
  );
}