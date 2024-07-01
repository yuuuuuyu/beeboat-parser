import Vue, { VNode } from 'vue'

declare module '*.tsx' {
    import Vue from 'compatible-vue'
    export default Vue
}

declare global {
    namespace JSX {
        interface Element extends VNode {}
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any
        }
    }
}

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.scss' {
    const scss: Record<string, string>
    export default scss
}

