# Grandlarc

This repository contains the GrandLarceny sample game mode written using [infernus-starter](https://github.com/dockfries/infernus-starter).

## Get Started

```sh
# if you are using the x86 version of samp-node
export npm_config_arch=ia32
export npm_config_target_arch=ia32

# powershell env
# $env:npm_config_arch="ia32";
# $env:npm_config_target_arch="ia32";

# cmd env
# set npm_config_arch=ia32
# set npm_config_target_arch=ia32

pnpm dlx @infernus/create-app@latest install

pnpm install --dev # ensure node-gyp install first

pnpm install

pnpm build
pnpm serve
```
