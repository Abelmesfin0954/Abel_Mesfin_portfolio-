'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';

const StarsCanvas = () => {
  return (
    <div className="w-full h-screen fixed inset-0 z-[-1]">
      <Canvas>
        {/* Your 3D content here */}
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
