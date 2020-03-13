import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import VuePlugin from 'rollup-plugin-vue'

export default {
    input: "./src/lib/index.js",
    output: {
        file: './dist/VueRouterSlider.umd.js',
        name: 'VueRouterSlider',
        format: 'umd'
    },
    plugins: [
        babel({
            exclude: 'node_modules',
        }),
        commonjs(),
        VuePlugin()
    ]
}
