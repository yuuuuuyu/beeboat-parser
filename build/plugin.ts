import path from 'path'
import { readdir, stat } from 'fs'
import { Plugin } from 'vite'
import dayjs, { Dayjs } from 'dayjs'
import { sum } from 'lodash-unified'
import duration from 'dayjs/plugin/duration'
import { green, bold } from 'picocolors'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import removeConsole from 'vite-plugin-remove-console'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import { visualizer } from 'rollup-plugin-visualizer'
import BeeboatUIPlugin from 'vite-plugin-beeboat-ui'

/**
 * 递归解析文件夹
 * @param rootFolder 根文件夹
 * @param fileListTotal 文件列表
 * @param folder 当前目录
 * @param callback 回调
 *
 */
function recursiveDirectory(
    rootFolder: string,
    fileListTotal: number[],
    folder: string,
    callback: Function,
): void {
    readdir(folder, (err, files: string[]) => {
        if (err) throw err
        let count = 0
        const checkEnd = () => {
            ++count == files.length && callback()
        }
        files.forEach((item: string) => {
            stat(`${folder}/${item}`, async (err, stats) => {
                if (err) throw err
                if (stats.isFile()) {
                    fileListTotal.push(stats.size)
                    checkEnd()
                } else if (stats.isDirectory()) {
                    recursiveDirectory(
                        rootFolder,
                        fileListTotal,
                        `${rootFolder}/${item}/`,
                        checkEnd,
                    )
                }
            })
        })
        files.length === 0 && callback()
    })
}

/**
 * 格式化字节
 * @param bytes 字节数
 * @param fixedNumber 小数位数
 * @returns 格式化内容
 *
 */
function formatByteValue(bytes: number, fixedNumber?: number): string {
    if (bytes == 0) {
        return '0 Byte'
    }
    const types = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const f = Math.floor(Math.log(bytes) / Math.log(1024))

    return `${parseFloat((bytes / Math.pow(1024, f)).toFixed(fixedNumber || 2))} ${types[f]}`
}
/**
 * 创建打包信息汇总输出插件
 */
function createBuildInfoPrintPlugin(env): Plugin {
    dayjs.extend(duration)

    const rootFolder = `dist/${env.VITE_APP_MOUNT_NAME}`
    const fileListTotal: number[] = []
    let config: { command: string }
    let startTime: Dayjs
    return {
        name: 'vite:buildInfo',
        configResolved(resolvedConfig: { command: string }) {
            config = resolvedConfig
        },
        buildStart() {
            if (config.command === 'build') {
                startTime = dayjs(new Date())
            }
        },
        closeBundle() {
            if (config.command === 'build') {
                const endTime = dayjs(new Date())
                recursiveDirectory(rootFolder, fileListTotal, rootFolder, () => {
                    const duration = dayjs.duration(endTime.diff(startTime)).format('mm分ss秒')
                    const sizeText = formatByteValue(sum(fileListTotal))
                    console.log(
                        bold(green(`打包完成(总用时${duration}，打包后的大小为${sizeText})`)),
                    )
                })
            }
        },
    }
}

/**
 * 建index.html入口的初始化加载样式
 */
function createCircleSpinner() {
    return `<style>
                .first-loading-wrap {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                .first-loading-wrap > h1 {
                    font-size: 128px;
                }

                .fulfilling-bouncing-circle-spinner,
                .fulfilling-bouncing-circle-spinner * {
                    box-sizing: border-box;
                }

                .fulfilling-bouncing-circle-spinner {
                    height: 60px;
                    width: 60px;
                    position: relative;
                    animation: fulfilling-bouncing-circle-spinner-animation infinite 4000ms ease;
                }

                .fulfilling-bouncing-circle-spinner .orbit {
                    height: 60px;
                    width: 60px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 50%;
                    border: calc(60px * 0.03) solid #409eff;
                    animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite 4000ms
                        ease;
                }

                .fulfilling-bouncing-circle-spinner .circle {
                    height: 60px;
                    width: 60px;
                    color: #409eff;
                    display: block;
                    border-radius: 50%;
                    position: relative;
                    border: calc(60px * 0.1) solid #409eff;
                    animation: fulfilling-bouncing-circle-spinner-circle-animation infinite 4000ms
                        ease;
                    transform: rotate(0deg) scale(1);
                }

                @keyframes fulfilling-bouncing-circle-spinner-animation {
                    0% {
                        transform: rotate(0deg);
                    }

                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1);
                    }
                    62.5% {
                        transform: scale(0.8);
                    }
                    75% {
                        transform: scale(1);
                    }
                    87.5% {
                        transform: scale(0.8);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes fulfilling-bouncing-circle-spinner-circle-animation {
                    0% {
                        transform: scale(1);
                        border-color: transparent;
                        border-top-color: inherit;
                    }
                    16.7% {
                        border-color: transparent;
                        border-top-color: initial;
                        border-right-color: initial;
                    }
                    33.4% {
                        border-color: transparent;
                        border-top-color: inherit;
                        border-right-color: inherit;
                        border-bottom-color: inherit;
                    }
                    50% {
                        border-color: inherit;
                        transform: scale(1);
                    }
                    62.5% {
                        border-color: inherit;
                        transform: scale(1.4);
                    }
                    75% {
                        border-color: inherit;
                        transform: scale(1);
                        opacity: 1;
                    }
                    87.5% {
                        border-color: inherit;
                        transform: scale(1.4);
                    }
                    100% {
                        border-color: transparent;
                        border-top-color: inherit;
                        transform: scale(1);
                    }
                }
            </style>
            <div class="first-loading-wrap">
                <div class="fulfilling-bouncing-circle-spinner">
                    <div class="circle"></div>
                    <div class="orbit"></div>
                </div>
            </div>`
}
/*
 * 创建HTML页面插件
 */
function createViteHtmlPlugin(envs) {
    return createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        template: 'index.html',
        inject: {
            data: {
                title: '首页',
                injectScript: ``,
            },
            tags: [
                {
                    injectTo: 'body-prepend',
                    tag: 'div',
                    attrs: {
                        id: `${envs.VITE_APP_MOUNT_NAME}`,
                        class: 'bt-child-body',
                    },
                    children: createCircleSpinner(),
                },
            ],
        },
    })
}

/**
 * 创建SVG图标插件
 *
 * @returns 插件
 */
function createViteSvgIconsPlugin() {
    return createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets')],
        symbolId: 'icon-[dir]-[name]',
    })
}
export function getPluginsList(command, env, mode) {
    const lifecycle = process.env.npm_lifecycle_event
    return [
        vue(),
        BeeboatUIPlugin({}),
        createViteHtmlPlugin(env, mode),
        createViteSvgIconsPlugin(),
        vueJsx(),
        removeConsole(),
        createBuildInfoPrintPlugin(env),
        svgLoader(),
        env.VITE_LEGACY
            ? legacy({
                  targets: ['ie >= 11'],
                  additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
              })
            : null,
        lifecycle === 'report'
            ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
            : null,
    ]
}
