import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import type { ImportMetaEnv } from './.env';
import eslintPlugin from 'vite-plugin-eslint';
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env: Record<keyof ImportMetaEnv, string> = loadEnv(mode, process.cwd());
	const serverUrl = env.VITE_SERVER_URL;
	return {
		server: {
			host: '0.0.0.0',
			port: 3000,
			proxy: {
				'/api': {
					target: serverUrl,
				},
			},
		},
		plugins: [
			vue(),
			eslintPlugin({
				include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@views': path.resolve(__dirname, 'src/views'),
				'@assets': path.resolve(__dirname, 'src/assets'),
			},
		},
		envDir: '.',
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler', // or "modern"
				},
			},
		},
	};
});
