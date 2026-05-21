import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
    alias: {
      // Resolve CJS path to ESM build (fixes "does not provide export named 'darken'")
      '@mui/system/colorManipulator': path.resolve(
        __dirname,
        'node_modules/@mui/system/esm/colorManipulator.js',
      ),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@emotion/react',
      '@emotion/react/jsx-runtime',
      '@emotion/react/jsx-dev-runtime',
      '@emotion/styled',
      '@emotion/styled/base',
      'prop-types',
      'react-is',
      'hoist-non-react-statics',
      'clsx',
      '@mui/material',
      '@mui/material/styles',
      '@mui/material/Tooltip',
      '@mui/icons-material',
      '@mui/system',
      '@mui/utils',
      '@mui/styled-engine',
    ],
  },
});
