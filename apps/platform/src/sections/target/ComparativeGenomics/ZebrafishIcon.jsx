import React from 'react';
import { useTheme } from '@mui/material';

function ZebrafishIcon() {
  const theme = useTheme();
  return (
    <svg height="13" viewBox="0 0 1016 317">
      <path
        transform="rotate(180, 512, 294)"
        fill={theme.palette.text.primary}
        d="M659.328 587.488c-8.448-0.096-44.736-9.28-49.632-11.552-4.832-2.24-64.704-22.432-72.768-26.752-13.344-7.232-49.984-8.992-77.792-3.776-65.152 7.936-170.56 1.632-227.424-9.6-8.864-1.76-47.488-8.544-54.56-10.4-17.472-4.512-52.512-12.64-69.056-16.064-19.136-3.968-49.856-12.704-58.080-16.448-3.808-1.76-36-19.68-38.88-23.84-3.456-4.96-3.84-19.488-0.512-20.768 1.312-0.48 3.68-4.928 5.28-9.856 3.008-9.248 10.944-20.384 21.44-30.112 10.144-9.504 47.168-28.512 68.416-35.2 61.472-19.264 131.456-37.984 141.312-41.152 33.472-10.944 87.136-17.856 138.688-17.856l33.92-0.096c0 0 44.8-22.976 57.152-25.984 12.352-3.072 21.888 4.128 23.2 14.176s3.744 24.768 0.672 25.888c-1.44 0.576-0.928 1.888 1.632 4.16 2.624 2.336 28.48 6.56 31.776 7.968 5.696 2.336 6.144 2.272 10.848-2.016 2.752-2.528 44.288-47.168 45.856-50.080 23.936-23.392 41.056-14.944 42.528-14.944s7.84 2.944 14.112 6.624 15.648 8.512 20.768 10.816 62.112 49.6 65.184 51.616c6.56 4.512 16.576 17.952 16.672 22.432 0.032 1.696 1.12 4.576 2.496 6.4 3.072 4.032 3.264 11.392 0.448 14.24-1.568 1.568 7.584-1.024 12.224-1.152 4.672-0.128 34.784-3.008 68.672-18.048 4.64-2.368 20.448-10.56 38.016-19.328 5.6-2.816 20.416-11.36 32.96-18.88 12.544-7.68 27.424-15.936 31.36-18.464 24.8-14.4 33.792-19.040 53.056-13.664 19.328 5.376 31.488 47.872-3.36 75.36-48.576 38.368-24 51.776-20.192 56.16 9.824 11.456 34.848 34.944 39.008 39.136 12.064 12.032 21.568 33.984 18.592 42.912-4 12-29.92 34.848-95.52 9.216-2.656-1.024-15.328-7.2-28.16-13.664s-27.808-12.864-33.28-14.24c-5.376-1.344-38.016-14.336-64.416-10.496-58.656 7.296-121.216 17.024-123.584 17.664-4.864 1.376-6.688 6.912-3.2 9.6 1.376 1.024 3.904 6.656 5.696 12.64 7.328 24.448 0.288 59.936-13.088 66.336-1.504 0.832-4.576 1.12-8.48 1.088v0zM373.344 514.944c20.608 0 38.816-0.32 50.208-1.216 13.12-1.024 41.152-2.272 62.24-2.752 37.6-0.864 60.96-3.488 67.52-7.456 2.56-1.568 1.184-1.728-6.944-0.672-16.352 2.080-282.56 1.184-298.432-1.024-7.488-1.056-20.928-2.976-29.856-4.352-13.056-2.016-33.76-5.152-46.048-8.192-4.896 3.968-14.624 13.184-16.416 13.696-1.184 3.136 11.328-1.312 21.248-1.312 4.384 0 12.96 1.248 19.072 2.72s17.6 2.944 25.568 3.168c7.968 0.288 20.64 1.344 28.128 2.368 21.632 2.976 78.432 4.992 123.712 5.024v0zM100.48 479.040c0.992 0 2.144-0.608 4.128-1.92 2.336-1.536 5.024-4.32 6.048-6.208 1.536-2.88 1.312-9.504-1.536-9.504-1.888 0-3.904-1.184-4.512-0.128-0.64 0.992-6.304-11.872-4.512-10.752 1.6 1.024-3.68 24.736-12.96 21.824-2.176 1.6 3.232 1.984 4.704 1.984 1.312 0 3.68 1.28 5.408 2.784 1.408 1.312 2.272 1.92 3.232 1.92v0zM388.928 478.848c28.96 0 59.52-0.352 85.792-0.96 71.104-1.632 103.072-3.392 148.32-8.256 8.448-0.896 17.984-1.76 21.312-1.824 9.632-0.192 52.192-5.024 71.616-8.064 9.888-1.568 22.336-3.136 27.808-3.52 5.504-0.384 15.808-1.952 23.008-3.456s16.928-3.072 21.664-3.52c4.672-0.416 9.344-1.504 10.336-2.336 1.088-0.832 5.408-1.088 9.632-0.48 7.488 0.992 18.56-1.344 23.072-4.928 1.632-1.28 1.696-2.304 0.256-4.032-2.368-2.816-4.16-2.752-11.2 0.32-3.072 1.312-16.64 3.52-30.272 4.896-13.696 1.344-25.472 2.848-26.208 3.36-0.768 0.48-13.312 2.080-27.744 3.552-14.464 1.472-27.424 3.136-28.832 3.616-6.592 2.464-52.32 6.016-86.112 6.784-20.672 0.448-39.040 1.28-40.896 1.792-1.888 0.576-16.768 1.6-33.216 2.336s-35.584 2.56-42.656 4c-10.336 2.112-15.68 2.304-27.712 0.928-8.192-0.992-15.584-1.344-16.512-0.736-0.896 0.544-34.912 1.472-75.584 1.984-54.144 0.704-77.376 0.416-86.656-1.12-18.208-2.976-76.224-6.272-84.256-4.8-3.712 0.704-25.408-1.696-31.552-1.664-2.048 4-2.272 10.592-4.992 14.304-1.984 2.688 11.584-1.216 33.6-3.104 19.328-1.664 41.44-0.736 74.592 3.008 11.392 1.312 55.104 1.984 103.392 1.92v0zM71.712 475.168c0.864 0 1.76-0.128 2.56-0.416 1.536-0.352 3.136-0.288 4.672-0.416 0.448-0.128 0.992-0.416 0.864-0.992-1.408 0.096-3.072-0.16-4.096-1.248-1.792-1.344-4.096-2.016-5.344-4-1.952-1.984-3.488-4.672-3.488-7.488-0.224-1.056 0.576-2.176-0.032-3.168-0.832-0.768-1.376 0.8-1.152 1.568 0.128 1.312-1.248 2.080-1.696 3.2-0.416 1.152-0.224 2.432-0.064 3.616 0.512 2.016 1.056 4.096 2.304 5.824 0.8 1.152 1.632 2.4 2.976 2.976 0.8 0.384 1.632 0.544 2.496 0.544v0zM907.328 466.144c1.408 0 3.072-0.064 5.088-0.448 3.968-0.768 10.976-1.44 15.392-1.504 4.448 0 8.064-0.864 8.064-1.792 0-2.176-23.264-2.080-28.672 0.064-4.704 1.92-3.904 3.616 0.128 3.68v0zM108.512 454.112c1.632-1.984 5.632-7.2 3.2-9.92-1.664-1.856-3.488-4.992-4.736-4.992-4.384-2.336-17.12-9.696-15.648 0.544 4.928 0.224 9.344 6.016 8.928 12.128 4.832-1.696 6.976 1.856 8.256 2.24zM75.904 443.52c2.848-0.704 10.464-2.912 9.92-3.584l0.576-3.296c-1.024-3.072-10.176-5.312-11.296-2.368-0.576 1.536-0.544 8.416-0.096 8.864 0.16 0.192 0.448 0.32 0.896 0.384v0zM904.48 440.064c20.704 0.128 28.128-0.352 30.528-2.112 3.104-2.272 3.168-2.432-0.096-4.16-1.824-0.992-4.512-1.184-5.888-0.448s-10.944 1.856-21.216 2.432c-32.352 1.92-34.016 4.096-3.328 4.288v0zM250.912 434.304c4.992 0 11.104 0 18.56 0 39.328-0.192 109.856-3.392 129.376-5.856 6.080-0.768 38.688-1.024 72.448-0.64 176 2.112 195.488 1.504 231.872-7.136 5.632-1.344 22.016-3.264 36.448-4.192 14.336-0.992 30.048-2.944 34.944-4.288 4.8-1.344 16.48-3.296 25.824-4.384 18.56-2.080 22.432-3.872 17.184-7.712-3.808-2.88-8.064-2.784-29.088 0.288-8.48 1.28-26.080 3.104-39.232 4.16s-28.512 3.328-34.112 4.992c-9.088 2.752-17.248 4.256-34.048 6.24-54.4 6.4-153.984 8.64-162.176 3.616-5.024-3.136-100.384-1.504-132.8 2.176-8.416 0.96-22.624 2.080-31.52 2.528-8.928 0.384-25.824 1.44-37.504 2.368-19.648 1.536-77.632 0.8-80.608-1.024-2.016-1.248-6.816 4.416-5.888 6.88 0.416 1.312 5.344 1.856 20.32 1.984v0zM860.512 412.928c1.856 0 4.704-0.16 9.024-0.576 12.672-1.152 37.536-8.672 48.896-14.72l6.4-3.328-5.12 0.192c-2.816 0.064-8.96 1.248-13.632 2.624-4.736 1.312-14.656 3.552-22.176 4.928-24.224 4.352-25.504 4.672-26.112 8.16-0.384 1.952-0.256 2.688 2.72 2.72v0zM706.24 397.504c11.456 0.096 15.488-1.28 13.152-4.064-1.12-1.376-7.072-2.656-15.072-3.232-7.2-0.48-24.992-1.728-39.52-2.752-14.528-1.056-31.776-2.080-38.336-2.368-6.592-0.256-22.688-1.76-35.808-3.328s-27.648-3.232-32.352-3.584c-11.616-0.928-21.536-2.688-25.632-4.512-1.888-0.8-9.952-2.112-17.92-2.944s-40.96-1.568-73.344-1.728c-47.936-0.288-60.704 0.224-69.056 2.336-5.6 1.44-11.936 2.944-14.048 3.392-2.112 0.416-3.84 1.504-3.84 2.4 0 0.864 1.696 2.784 3.84 4.128 3.36 2.176 4.992 2.176 13.216-0.128 5.824-1.504 15.488-2.304 25.568-2.112 8.896 0.224 23.488-0.192 32.384-0.864 14.816-1.152 31.2-0.384 82.88 3.872 9.472 0.8 17.984 1.888 18.912 2.4 4.704 2.976 37.856 5.856 109.632 9.664 17.344 0.896 40.448 2.112 51.328 2.816 5.504 0.352 10.144 0.512 13.984 0.544v0.064zM867.104 376.96c3.136 0.128 8.32-1.12 16.384-3.776 9.056-3.040 11.136-4.288 9.536-5.92-2.4-2.368-2.144-2.368-16.768 0.8-11.68 2.496-14.688 4.192-12.864 7.264 0.64 1.024 1.792 1.568 3.712 1.632v0zM723.648 358.176c0.672 0 0.576-0.576-0.128-1.6-0.576-0.928-5.824-3.936-11.552-6.656-5.792-2.656-14.368-5.344-19.072-5.92l-8.48-0.928 7.648 2.24c4.224 1.248 12.736 4.736 19.072 7.648 7.776 3.712 11.328 5.216 12.512 5.216v0zM677.216 342.56l-6.816-2.528c-3.744-1.344-51.872-11.488-57.92-11.36-14.976-0.384-30.944 2.944-19.52 4.672 4.192 0.64 68.448 7.552 73.984 8.128l10.272 1.088zM452 319.040c0.288 0 0.608 0 0.96 0 3.712-0.128 23.424-12.32 23.424-14.496 0-4.032-10.752-2.048-19.968 3.744-6.432 4.128-8.704 10.208-4.416 10.752v0z"
      />
    </svg>
  );
}

export default ZebrafishIcon;
