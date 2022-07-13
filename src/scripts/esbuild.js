#!/usr/bin/env node
const svgrPlugin = require('esbuild-plugin-svgr');
const sassPlugin = require('esbuild-plugin-sass');

require('esbuild').build({
    entryPoints: ['src/index.tsx'],
    define: { 'process.env.NODE_ENV': '\"production\"' },
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['chrome60', 'firefox60', 'safari11', 'edge18'],
    outdir: 'dist',
    platform: 'node',
    target: ['node14.11'],
    loader: {
        '.tsx': 'tsx',
        '.png': 'file',
        '.jpg': 'file', 
        '.ttf': 'file',
        '.woff': 'file',
        '.svg': 'dataurl',
    },
    plugins: [
        sassPlugin(),
        svgrPlugin({
            typescript: true,
            memo: true,
            ref: true,
            outDir: 'dist',
            exportType: 'named', // https://issueantenna.com/repo/kazijawad/esbuild-plugin-svgr/issues/8

        }),
    ],
  }).catch(() => process.exit(1))