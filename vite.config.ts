import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    // Add API proxy for development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // Add CORS handling
    cors: true
  },
  plugins: [
    // React SWC plugin for fast refresh and compilation
    react({
      jsxImportSource: undefined,
      tsDecorators: true,
    }),
    // Development-only plugins
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Add common extensions to resolve
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode === 'development', // Only in development mode
    // Performance optimizations
    minify: mode !== 'development',
    cssMinify: mode !== 'development',
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            // Add other UI components as needed
          ]
        }
      }
    },
    // Add cache busting
    chunkSizeWarningLimit: 1000,
  },
  // Optimize CSS
  css: {
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      // Add preprocessor options if needed
    }
  },
  // Add environment variable handling
  envPrefix: 'VITE_',
}));