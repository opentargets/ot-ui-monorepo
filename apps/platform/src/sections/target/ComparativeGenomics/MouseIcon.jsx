import React from 'react';
import { useTheme } from '@mui/material';

function MouseIcon() {
  const theme = useTheme();
  return (
    <svg height="13" viewBox="0 0 1025 439">
      <path
        transform="rotate(180, 511, 326)"
        fill={theme.palette.text.primary}
        d="M1001.6 345.6c-25.6 9.6-80 9.6-112 6.4-25.6-3.2-83.2-12.8-108.8-12.8-28.8 0-67.2 3.2-92.8 22.4-12.8 9.6-28.8 25.6-38.4 38.4 0 12.8-3.2 22.4-3.2 25.6 0 12.8-28.8 99.2-54.4 128s-73.6 57.6-96 64c-25.6 6.4-105.6 12.8-121.6 6.4s-51.2-25.6-60.8-38.4c-9.6-12.8-32-22.4-32-22.4s9.6 25.6-12.8 54.4c-22.4 25.6-38.4 32-57.6 19.2-16-12.8-35.2-60.8-35.2-60.8h-38.4c0 0-12.8 12.8-25.6 28.8-9.6 16-16 48-22.4 44.8s-19.2-48-16-57.6c6.4-9.6 25.6-48 25.6-48s-16-28.8-19.2-35.2c-3.2-6.4-6.4-19.2-9.6-25.6 0 0-3.2 0-3.2 0-16 0-25.6-12.8-25.6-25.6 0-6.4 3.2-16 9.6-19.2-9.6-12.8-51.2-60.8-51.2-60.8s-6.4-19.2 3.2-19.2c9.6 0 35.2-6.4 35.2-6.4s67.2 0 76.8 0c12.8 0 48 0 57.6 0 9.6-3.2 44.8-22.4 51.2-28.8s32-44.8 32-44.8-19.2-22.4-28.8-28.8c-9.6-6.4-16-9.6-25.6-6.4s-22.4-3.2-25.6-9.6c-3.2-6.4-16-16-6.4-16s32 6.4 32 6.4 0-9.6 9.6-9.6c9.6 0 38.4 6.4 38.4 6.4s9.6 0 28.8 9.6c19.2 9.6 44.8 19.2 44.8 19.2s22.4 0 38.4 9.6c16 9.6 28.8 3.2 28.8 3.2s22.4-3.2 35.2 6.4c16 9.6 28.8 28.8 32 32 3.2 0 28.8 0 41.6-6.4s35.2-12.8 35.2-12.8 0-19.2-9.6-22.4c-9.6-3.2-16 0-25.6-3.2s-25.6-6.4-28.8-16c-3.2-9.6-3.2-19.2 0-16 3.2 0 12.8 9.6 12.8 9.6s-6.4-16 3.2-12.8c6.4 3.2 16 9.6 16 9.6h16c0 0-6.4-9.6 3.2-9.6s19.2 6.4 19.2 6.4 25.6 6.4 32 16c6.4 9.6 6.4 19.2 6.4 19.2s-16 16-6.4 16c9.6 3.2 32 3.2 48 9.6 16 9.6 32 25.6 32 35.2 16-6.4 32-16 44.8-19.2 25.6-6.4 86.4 0 108.8 6.4 25.6 6.4 76.8 16 86.4 16s80 6.4 102.4-3.2 22.4 0 22.4 0 9.6 12.8-16 22.4zM147.2 403.2c-19.2 0-35.2 16-35.2 35.2s16 35.2 35.2 35.2 35.2-16 35.2-35.2c0-19.2-16-35.2-35.2-35.2z"
      />
    </svg>
  );
}

export default MouseIcon;
