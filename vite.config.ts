import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import {viteMockServe} from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const envs = loadEnv(mode, process.cwd(), '')
    return {
        server: {
            hmr: true,
            port: Number.parseInt(envs.VITE_PORT)
        },
        plugins: [
            vue(),
            viteMockServe({
                supportTs: true,
            }),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "~/styles/element/index.scss" as *;`,
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "/src"),
                "~@": path.resolve(__dirname, "/src"),
            },
        },
    }
})
