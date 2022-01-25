rm -rf build
# replace package entry point with unminified version
npx babel src/FileSelect.js --out-file build/FileSelect.cjs --presets=@babel/preset-env --plugins @babel/plugin-transform-modules-commonjs
# Webpack bundle for browser use with es6
webpack --config ./src/build/webpack.dev.js
# yalc update
yalc publish --push