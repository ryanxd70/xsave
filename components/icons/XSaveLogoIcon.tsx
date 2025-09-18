import React from 'react';

export const XSaveLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 98 36"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="XSave Logo"
  >
    <rect x="0" y="0" width="36" height="36" rx="6" fill="white" />
    <g transform="translate(6, 6)">
        <path d="M5 2L9 2L19 22L15 22Z" fill="#3B82F6" />
        <path d="M15 2L19 2L9 22L5 22Z" fill="#3B82F6" />
    </g>
    <text
      x="44"
      y="26"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
      fontSize="20"
      fontWeight="bold"
      fill="currentColor"
    >
      Save
    </text>
  </svg>
);
