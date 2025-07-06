import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const LoadingScreen: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.loading-logo',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    )
    .fromTo('.loading-text',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo('.loading-bar',
      { width: '0%' },
      { width: '100%', duration: 2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="loading-logo w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-white">MS</span>
        </div>
        
        <div className="loading-text mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mohit Soni</h1>
          <p className="text-xl text-gray-300">AI Engineer • Full-Stack Developer</p>
        </div>
        
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div className="loading-bar h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;