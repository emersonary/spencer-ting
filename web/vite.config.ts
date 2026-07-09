import path from 'node:path';
import os from 'node:os';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiTarget = process.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:8084';
const postsApiTarget = process.env.VITE_POSTS_API_URL?.replace(/\/$/, '') || 'http://localhost:8091';
const repoRoot = path.resolve(__dirname, '..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@emersonary/appkit-accounts': path.resolve(repoRoot, '../via-jeri/appkit/blocks/account/web/src/index.ts'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  cacheDir: path.join(os.tmpdir(), 'vite-cache-spencer-ting'),
  server: {
    fs: {
      allow: [repoRoot, path.resolve(repoRoot, '../via-jeri/appkit/blocks/account/web')],
    },
    port: 5182,
    proxy: {
      '/account.v1.AccountService': { target: apiTarget, changeOrigin: true },
      '/property.v1.PropertyService': { target: apiTarget, changeOrigin: true },
      '/blog.v1.BlogService': { target: postsApiTarget, changeOrigin: true },
      '/r': { target: apiTarget, changeOrigin: true },
      '/account': {
        target: apiTarget,
        changeOrigin: true,
        bypass(req) {
          if (req.url?.startsWith('/account/callback')) {
            return '/index.html';
          }
        },
      },
      '/healthz': { target: apiTarget, changeOrigin: true },
    },
  },
});
