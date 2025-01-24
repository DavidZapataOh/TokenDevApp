'use client';

import { Toaster } from 'react-hot-toast';

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 40,
        right: 40,
        padding: '4px',
      }}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#05000c', // dark
          color: '#f5f5f5', // light
        },
      }}
    />
  );
} 