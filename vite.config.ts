import dayjs from 'dayjs'
import { resolve } from 'path'
import pkg from './package.json'
import { getPluginsList } from './build/plugin'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'

// 当前执行node命令时文件夹的地址（工作目录）
const root: string = process.cwd()

// 路径查找
const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
    '@': pathResolve('src'),
    '/@': pathResolve('src'),
    '@build': pathResolve('build'),
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const env = loadEnv(mode, root)
    return {
        base: `${env.VITE_PUBLIC_PATH}${env.VITE_APP_MOUNT_NAME}`,
        root,
        resolve: {
            alias,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: [
                        // `@use "beeboat-plus/es/beeboat-theme/src/themes/scss/var.scss" as *;`,
                    ].join('\n'),
                },
            },
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: atRule => {
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            },
                        },
                    },
                ],
            },
        },
        // 服务端渲染
        server: {
            // 是否开启 https
            https: false,
            // 端口号
            port: 3033,
            host: '0.0.0.0',
        },

        plugins: getPluginsList(command, env, mode),
        optimizeDeps: {
            include: [
                'pinia',
                'vue-i18n',
                'lodash-es',
                '@vueuse/core',
                '@iconify/vue',
                'element-plus/dist/locale/en.mjs',
                'element-plus/dist/locale/zh-cn.mjs',
            ],
            exclude: [
                '@pureadmin/theme/dist/browser-utils',
                '@antv/x6',
                '@antv/x6-plugin-stencil',
                '@antv/x6-plugin-transform',
                '@antv/x6-plugin-selection',
                '@antv/x6-plugin-snapline',
                '@antv/x6-plugin-clipboard',
                '@antv/x6-plugin-history',
            ],
        },
        build: {
            sourcemap: false,
            chunkSizeWarningLimit: 2000,
            outDir: `dist/${env.VITE_APP_MOUNT_NAME}`,
        },
        define: {
            __INTLIFY_PROD_DEVTOOLS__: false,
            __APP_INFO__: JSON.stringify(__APP_INFO__),
        },
    }
}
