import React, { useState, useEffect } from 'react';
import '../styles/Intro.css';

const namesArray = ["Web Developer", "Web Designer", "MERN Developer"];
const colors = ["#ff1f1f","#ff481f","#ff6d1f","#ff8f1f","#ffb81f","#ffec1f","#b4ff1f","#62ff1f","#1fff7c","#1fffbc","#1ffffb","#1fa9ff","#2a61f7","#5b19ff","#840ffa","#c70ffa","#fa0fee","#fa0fb3","#fa0f6d","#fa0f3e"];

const Intro = () => {
  const [index, setIndex] = useState(0);         // for names
  const [fade, setFade] = useState(true);        // for text fade
  const [colorIndex, setColorIndex] = useState(0); // for color

  // Change text every 3 seconds
  useEffect(() => {
    const textInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % namesArray.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(textInterval);
  }, []);

  // Change color every 0.3 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 300); // 0.3 seconds
    return () => clearInterval(colorInterval);
  }, []);

  return (
    <>
      <div className='main'>
        <div className='top-prof'>
            <h1>Hi! there</h1>
            <h1
            style={{color: 'yellow', textShadow: `3px 5px 5px ${colors[colorIndex]}`,fontSize:`80px`}}
            >I'm Dharaneesh</h1>
        </div>
        <div className='prof'>
            <h2>I'm</h2>
            <h1
            className={`fade-text ${fade ? 'fade-in' : 'fade-out'}`}
            style={{ color: colors[colorIndex],textShadow: `5px 5px -10px ${colors[colorIndex]}` }}
            >
            {namesArray[index]}
            </h1>
        </div>
      </div>
    </>
  );
};

export default Intro;
