import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: false
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@sveltejs/vite-plugin-svelte']
  },
  ssr: {
    noExternal: ['@sveltejs/vite-plugin-svelte']
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'CasdoorSvelteSDK',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte'
        },
        exports: 'named'
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});