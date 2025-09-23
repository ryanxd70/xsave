import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="XSave Logo Icon"
  >
    <path d="M5 2L9 2L19 22L15 22Z" />
    <path d="M15 2L19 2L9 22L5 22Z" />
  </svg>
);