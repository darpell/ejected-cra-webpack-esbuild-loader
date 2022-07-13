#!/usr/bin/env node
const sassPlugin = require('esbuild-plugin-sass');
const svgrPlugin = require('esbuild-plugin-svgr');

const esbuild = require('esbuild');
const http = require('http');
const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(`${__dirname}/..`);
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);


// ----- Using serve -----
// esbuild.serve(
//     { servedir: 'web' },
//     {
//       logLevel: 'error',
//       entryPoints: ['src/index.tsx'],
//       bundle: true,
//       loader: { '.png': 'file', '.svg': 'dataurl', '.jpg': 'file', '.ttf': 'file', '.woff': 'file' },
//       plugins: [
//             sassPlugin(),
//             svgrPlugin({
//                 typescript: true,
//                 memo: true,
//                 ref: true,
//                 outDir: 'dist',
//                 exportType: 'named',
//             }),
//         ],
//     },
//   )
//   .then((server) => {
//     // The result tells us where esbuild's local server is
//     console.log(server);
//     const { host, port, wait, stop } = server;

//     // Then start a proxy server on port 3000
//     http
//       .createServer((req, res) => {
//         const options = {
//           hostname: host,
//           port: port,
//           path: req.url,
//           method: req.method,
//           headers: req.headers,
//         };

//         // Forward each incoming request to esbuild
//         const proxyReq = http.request(options, proxyRes => {
//           // If esbuild returns "not found", send a custom 404 page
//           if (proxyRes.statusCode === 404) {
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             res.end('<h1>A custom 404 page</h1>');
//             return;
//           }

//           // Otherwise, forward the response from esbuild to the client
//           res.writeHead(proxyRes.statusCode, proxyRes.headers);
//           proxyRes.pipe(res, { end: true });
//         });

//         // Forward the body of the request to esbuild
//         req.pipe(proxyReq, { end: true });
//       })
//       .listen(3000);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// ----- Using watch -----
esbuild.build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    sourcemap: true,
    // external: ['./node_modules/*'],
    target: ['node16.13', 'chrome60', 'firefox60', 'safari11', 'edge18'],
    loader: {
      '.png': 'file', 
      '.svg': 'dataurl', 
      '.jpg': 'file', 
      '.ttf': 'file', 
      '.woff': 'file' 
    },
    outdir: 'web',
    // outfile: 'web/index.js',
    watch: {
        onRebuild(error, result) {
          if (error) 
            console.error('watch build failed:', error)
          else {
            console.log('watch build succeeded:', result)


          }
        },
    },
    plugins: [
        sassPlugin({}),
        svgrPlugin({
            typescript: true,
            memo: true,
            ref: true,
            outDir: 'dist',
            exportType: 'named',
        }),
    ],
})
.then(result => {
    console.log('Watching...');
    console.log(result);
    
    // Then start a proxy server on port 3000
    // const server = http.createServer((req, res) => {
        // const options = {
        //   // hostname: "0.0.0.0",
        //   // port: 8000,
        //   path: req.url,
        //   method: req.method, 
        //   headers: req.headers,
        // };

        // // Forward each incoming request to esbuild
        // const proxyReq = http.request(options, proxyRes => {
        //   console.log('proxyRes', proxyRes);
        //   // If esbuild returns "not found", send a custom 404 page
        //   if (proxyRes.statusCode === 404) {
        //     res.writeHead(404, { 'Content-Type': 'text/html' });
        //     res.end('<h1>A custom 404 page</h1>');
        //     return;
        //   }

        //   // Otherwise, forward the response from esbuild to the client
        //   res.writeHead(proxyRes.statusCode, proxyRes.headers);
        //   proxyRes.pipe(res, { end: true });
        // });
        // console.log('proxyReq', proxyReq);

        // // Forward the body of the request to esbuild
        // req.pipe(proxyReq, { end: true });

        // test
        // res.writeHead(200, { 'content-type': 'text/html' });
        // fs.createReadStream(resolveApp('../web')).pipe(res)
      // });
      
      // server.listen(3000);
})
.catch(err => {
  console.log(err);
});


//create a server object:
// http.createServer(function (req, res) {
//     res.write('Hello World!'); //write a response to the client
//     res.end(); //end the response
//   }).listen(8080); //the server object listens on port 8080
    
// ['SIGINT', 'SIGTERM'].forEach((sig) => {
//     process.on(sig, () => {
//       devServer.close();
//       process.exit();
//     });
//   });

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     fs.createReadStream('index.html').pipe(res)
//   })