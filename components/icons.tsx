import React from 'react';

export const UploadCloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

export const GenerateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
);

export const ChefLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g>
      {/* Hat Top */}
      <path
        d="M 50,15 C 25,15 15,35 30,55 C 35,65 65,65 70,55 C 85,35 75,15 50,15 Z"
        fill="#F7F3E9"
        stroke="#6B5738"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="60" r="15" fill="#F7F3E9" stroke="#6B5738" strokeWidth="3" />
      <circle cx="75" cy="60" r="15" fill="#F7F3E9" stroke="#6B5738" strokeWidth="3" />
      
      {/* Hat Band */}
      <rect x="15" y="70" width="70" height="15" rx="3" fill="#6B5738" />

      {/* Leaf on Band */}
      <g transform="translate(42, 71.5) scale(0.15)">
        <path
          d="M50,90 C10,40 40,10 50,10 C60,10 90,40 50,90 Z"
          fill="#6A994E"
          stroke="#386641"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="50" y1="90" x2="50" y2="30" stroke="#386641" strokeWidth="6" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);