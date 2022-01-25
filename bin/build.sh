rm -rf build
echo "test"
# FileSelect.js entry point for node package (minified, commonjs)
npx babel src/FileSelect.js --out-file build/FileSelect.cjs --presets=@babel/preset-env --plugins=@babel/plugin-transform-modules-commonjs,@babel/plugin-syntax-dynamic-import --no-comments
# Webpack build libraries for browser use with es6 and umd
rm -rf lib
webpack --config ./src/build/webpack.prod.js --profile