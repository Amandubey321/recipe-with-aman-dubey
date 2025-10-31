import React from 'react';

const ImageSkeletonLoader: React.FC = () => {
  return (
    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
  );
};

export default ImageSkeletonLoader;
