import React from 'react';
import { useTheme } from '@mui/material';

function DogIcon() {
  const theme = useTheme();
  return (
    <svg height="13" viewBox="0 0 988 1027">
      <path
        fill={theme.palette.text.primary}
        transform="rotate(180, 502, 480)"
        d="M100.63 862.296c0 0-27.568-15.162-38.59-24.808-11.026-9.646-38.59-24.808-44.106-34.454-5.516-9.652 9.652-44.106 9.652-44.106s4.124-35.834 13.776-44.1c9.652-8.272 30.324-11.026 30.324-11.026s52.372-20.672 57.882-23.434c5.516-2.756 42.726-19.292 42.726-19.292l9.646-44.106c0 0-12.402-64.778-11.026-79.934s6.89-71.664 6.89-71.664 6.89-85.45 8.272-99.238c1.38-13.782 27.558-82.69 24.808-103.368-2.756-20.672 0-67.538 2.75-77.184 2.76-9.646-6.886-74.418-9.646-79.934-2.756-5.516-31.698-48.236-31.698-48.236s-26.182 0-30.318-11.026c-4.136-11.026-22.052-16.542-8.266-27.564 13.782-11.026 70.282-16.542 78.554-11.026s28.944 28.944 28.944 28.944l19.292 63.398c0 0 19.298 57.882 23.434 88.206 5.108 37.498 20.672 104.748 20.672 104.748l59.268-26.182c0 0 28.938-74.424 24.802-100.612-4.13-26.188-9.646-66.152-5.51-77.184 4.136-11.026-1.38-53.752-16.536-74.424-15.162-20.666-37.214-35.828-42.726-50.99-5.522-15.168 39.964-34.46 73.044-28.944 33.074 5.516 37.214 17.918 38.584 26.182 1.38 8.272 12.406 64.778 17.918 74.424 5.51 9.646 4.13 53.752 6.89 60.648 2.756 6.886 11.026 93.71 15.162 113.014 4.13 19.298 4.13 77.184 4.13 77.184s84.070 22.048 114.394 37.21c30.312 15.162 66.148 26.188 66.148 26.188s31.964-38.238 52.376-50.996c44.1-27.564 46.86-37.21 55.126-50.996 6.014-10.026 13.788-34.454 12.406-38.59-1.38-4.136-2.76-33.080-13.792-42.726-11.020-9.652-14.738-22.89-11.020-26.188 12.402-11.026 33.080-16.536 50.996-6.89 17.922 9.646 26.188 15.162 24.808 33.080-1.374 17.918-12.056 55.058-9.646 68.914 5.516 31.704-4.13 52.372-4.13 52.372s53.752-44.106 75.798-50.996 48.236-45.48 49.616-64.778c1.38-19.292-9.646-39.964-9.646-39.964s-16.536-20.666-11.020-28.944c5.51-8.266 38.584-27.558 63.392-15.162 24.814 12.406 15.162 33.084 15.162 33.084s-4.13 52.372-6.886 62.018c-2.76 9.652-22.052 53.752-20.672 66.152 1.374 12.406-5.516 31.704-13.788 37.214s-41.35 70.288-41.35 70.288-8.266 13.782-11.020 41.35c-2.756 27.564-1.38 46.856-15.162 84.070-13.788 37.21-53.752 62.022-55.132 78.56-1.38 16.542-12.396 50.99-5.516 60.636 6.896 9.646 26.188 100.612 16.542 150.228-18.884 97.116-53.752 132.306-71.664 148.848-21.080 19.45-53.758 35.84-64.778 27.568-11.026-8.266 2.438-24.004 26.182-56.506 26.188-35.834 52.376-79.934 45.48-154.358-6.886-74.424-28.938-97.858-38.59-103.368-9.646-5.51-107.498-2.76-121.284-2.76-13.782 0-79.94 1.38-90.966 11.026-11.020 9.652-28.938 22.052-48.236 28.944-19.292 6.89-41.344 17.918-41.344 17.918s-1.38 15.156-12.406 23.428c-11.020 8.272-17.912 23.434-17.912 23.434s26.182 22.052 22.052 56.506c-4.142 34.46-27.568 79.934-48.236 95.096-20.672 15.168-53.752 46.866-64.778 52.376-11.026 5.516-23.434 6.89-23.434 6.89s-9.646 9.652-30.318 11.026c-20.672 1.38-67.534 2.76-67.534 2.76s-34.454-1.38-42.726-5.516c-8.272-4.13-33.080-34.46-38.59-39.97-5.51-5.516-19.298-22.052-20.672-27.568-1.37-5.518 2.772-24.82 2.772-24.82z"
      />
    </svg>
  );
}

export default DogIcon;
