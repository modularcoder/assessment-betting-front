import { defineConfig } from 'vite'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	plugins: [
		react(),
		viteCompression({
			algorithm: 'brotliCompress',
		}),
	],
})
