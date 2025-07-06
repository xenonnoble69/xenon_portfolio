import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for hover elements
    const hoverElements = document.querySelectorAll('a, button, .hover-target');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    gsap.to('.cursor', {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      duration: 0.1,
      ease: 'power2.out'
    });

    gsap.to('.cursor-follower', {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [mousePosition]);

  return (
    <>
      <div 
        className={`cursor fixed w-5 h-5 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{ left: 0, top: 0 }}
      />
      <div 
        className="cursor-follower fixed w-10 h-10 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default CustomCursor;