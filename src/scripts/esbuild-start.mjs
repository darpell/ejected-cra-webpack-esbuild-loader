#!/usr/bin/env node
import esbuild from 'esbuild';
import sassPlugin from 'esbuild-plugin-sass';
import svgrPlugin from 'esbuild-plugin-svgr';

import http from 'http';
import child_process from 'child_process';

const clients = [];

// Based on https://github.com/evanw/esbuild/issues/802#issuecomment-819578182

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    sourcemap: true,
    outdir: 'web',
    banner: { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' },
    watch: {
      onRebuild(error, result) {
        clients.forEach((res) => res.write('data: update\n\n'))
        clients.length = 0
        console.log(error ? error : '...')
      },
    },
    target: ['node16.13', 'chrome60', 'firefox60', 'safari11', 'edge18'],
    loader: {
      '.png': 'file', 
      '.jpg': 'file', 
      '.ttf': 'file', 
      '.woff': 'file',
      '.svg': 'dataurl',
    },
    plugins: [
        sassPlugin({
          platform: 'node',
        }),
        svgrPlugin({
            typescript: true,
            memo: true,
            ref: true,
            // outDir: 'dist',
            exportType: 'named',
        }),
        // svgPlugin({
        //   customElement: false,
        //   namespace: 'icon', // namespace custom elements
        //   minify: false, // with svgo
        //   minifyOptions: {} // svgo options
        // }),
        // svgjPlugin.svgjPlugin({
        //   readFile: (path) => readFile(path, "utf8"),
        // }),
    ],
  })
  .catch(() => process.exit(1))

esbuild.serve({ servedir: 'web' }, {}).then(() => {
    http.createServer((req, res) => {
    const { url, method, headers } = req
    if (req.url === '/esbuild')
      return clients.push(
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })
      )
    const path = ~url.split('/').pop().indexOf('.') ? url : `/index.html` //for PWA with router
    req.pipe(
        http.request({ hostname: '0.0.0.0', port: 8000, path, method, headers }, (prxRes) => {
        res.writeHead(prxRes.statusCode, prxRes.headers)
        prxRes.pipe(res, { end: true })
      }),
      { end: true }
    )
  }).listen(3000)

  setTimeout(() => {
    const op = { darwin: ['open'], linux: ['xdg-open'], win32: ['cmd', '/c', 'start'] }
    const ptf = process.platform
    if (clients.length === 0) child_process.spawn(op[ptf][0], [...[op[ptf].slice(1)], `http://localhost:3000`])
  }, 1000) //open the default browser only if it is not opened yet
})
