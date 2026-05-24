'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'rgba(20, 5, 30, 0.92)',
          color: '#fff',
          border: '1px solid rgba(255, 31, 113, 0.25)',
          backdropFilter: 'blur(12px)',
          fontSize: '0.875rem',
          fontFamily: "'DM Sans', sans-serif",
        },
      }}
    />
  );
}
