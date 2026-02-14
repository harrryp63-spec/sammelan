import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Virat Hindu Sammelan',
        short_name: 'Sammelan',
        description: 'Event management PWA for Virat Hindu Sammelan',
        theme_color: '#ea580c',
        background_color: '#fff7ed',
        display: 'standalone',
        start_url: '/',
        icons: []
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache' }
          }
        ]
      }
    })
  ]
});
