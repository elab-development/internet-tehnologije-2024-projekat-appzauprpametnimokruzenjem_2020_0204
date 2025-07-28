import React, { useRef, useEffect, useCallback } from 'react';
import { createGlowTracker } from '../utils/glowTracker';

const GlowContainer = ({ className = '', color = '', children}) => {
  
  const boxRef = useRef(null);
  const glowRef = useRef(null);
  const handlers = useRef({ handleMouseMove: () => {}, handleMouseLeave: () => {} });

  const background = color
    ? `radial-gradient(circle, ${color} 0%, transparent 70%)`
    : 'radial-gradient(circle, #64DED2 0%, transparent 70%)';

  
  const glow = true;
  useEffect(() => {
    if (glow || boxRef.current && glowRef.current) {
      handlers.current = createGlowTracker(glowRef, boxRef);
    }
  }, [glow]);

  return (
    <div
      ref={boxRef}
      className={`${className} relative overflow-hidden`}
      onMouseMove={glow ? handlers.current.handleMouseMove : null}
      onMouseLeave={glow ? handlers.current.handleMouseLeave : null}
    >
      {glow && <div ref={glowRef} className="glow-dot" style={{background}}></div>}
      <div>
        {children}
      </div>
    </div>
  );
};

export default GlowContainer;