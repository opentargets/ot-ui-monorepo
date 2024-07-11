import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import gql from 'vite-plugin-simple-gql';
import svgrPlugin from 'vite-plugin-svgr';
import path from "path";

export default defineConfig({
  build: {
    outDir: './bundle-platform',
  },
  plugins: [
    react(),
    gql(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      // Molstar: path.resolve(__dirname, '../../node_modules/molstar/lib')
      Molstar: 'molstar/lib'
    }
  },
  // optimizeDeps: {
  //   exclude: ['molstar-pdbe']
  // }
});
