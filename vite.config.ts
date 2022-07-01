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
            port: Number.parseInt(envs.VITE_PORT),
            proxy: {
                [envs.VITE_PROXY_DOMAIN]: {
                    target: envs.VITE_PROXY_DOMAIN_REAL,
                    changeOrigin: true,
                    rewrite: (path: string) => regExps(path, envs.VITE_PROXY_DOMAIN)
                }
            }
        },
        plugins: [
            vue(),
            viteMockServe({
                prodEnabled: false,
                localEnabled: mode == 'dev_mock',
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

// 跨域代理重写
const regExps = (value: string, reg: string): string => {
    return value.replace(new RegExp(reg, "g"), "");
};
