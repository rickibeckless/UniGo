import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { replace } from 'react-router-dom'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
        server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
})