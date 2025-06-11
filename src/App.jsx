import React from 'react';
import CanvasScene from './components/CanvasScene.jsx';
import Intro from './components/Intro.jsx';
import BackgroundScene from './components/BackgroundScene.jsx';
import AboutMe from './components/AboutMe.jsx';
import Skills from './components/Skills.jsx';


export default function App() {
  return (
    <>
      <div className="app" style={{ position: 'relative' }}>
        <BackgroundScene />
        <CanvasScene />

        <div className="content" style={{ position: 'relative', zIndex: 2 }}>
          {/* First 100vh */}
          <section style={{ height: '100vh',margin:'0px' }}>
            <Intro />
          </section>
          <section style={{ height: '100vh', margin:'0px' }}>
            <AboutMe />
          </section>
          <section style={{ height: '100vh' }}>
            <Skills />
          </section>

        </div>
      </div>
    </>
  );
}
