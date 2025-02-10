import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: parseInt(env.STORE_PORT) || 5173,
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
      alias: {
        '@': '/src',
        '@context': '/src/context',
        '@components': '/src/components',
        '@hooks': '/src/hooks',
        '@pages': '/src/pages',
        '@providers': '/src/providers',
        '@router': '/src/router',
        '@styles': '/src/styles',
      },
    },
  };
});
