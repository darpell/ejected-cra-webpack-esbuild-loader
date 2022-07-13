# Eject CRA using webpack + esbuild-loader

This is a sandbox project to test CRA development using esbuild with special configurations.



# Deploying
You should have node installed in your system prefereably with [nvm](https://github.com/nvm-sh/nvm).

Please install all the packages by running
```
npm install --legacy-peer-deps
```

## Development
To deploy a development environment in local, run

```
npm run start
```

## Production
To deploy a production environment in local, run

```
npm run build && npx serve -s build
```