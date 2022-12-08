import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020'
		}
	},

	build: {
		outDir: 'build'
	},
	plugins: [svelte()]
});
