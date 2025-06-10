import '../styles/common.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 20,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 60%', // trigger when top of element hits 50% of viewport
          toggleActions: 'play none none none', // play animation only once
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className='container'>
      <div>
        <h1 className="heading">About Me</h1>
      </div>
      <div className='info'>
        <p>
          Dynamic Computer Science student, known for adaptability, creativity,
          and a proactive mindset. Driven to learn quickly, advance computer
          proficiency and training in industry operations. Solid background in
          field and office settings supporting team needs. Flexible and
          hardworking team player focused on boosting productivity and
          performance with conscientious and detail-oriented approaches.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
