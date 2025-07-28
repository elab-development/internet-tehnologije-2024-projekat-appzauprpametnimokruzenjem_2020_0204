// src/utils/glowTracker.js

export const createGlowTracker = (glowRef, boxRef) => {
  const handleMouseMove = (e) => {
    if (!boxRef.current || !glowRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    const x = e.pageX - rect.left - window.scrollX;
    const y = e.pageY - rect.top - window.scrollY;

    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
    glowRef.current.style.opacity = 1;
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = 0;
    }
  };

  return { handleMouseMove, handleMouseLeave };
};