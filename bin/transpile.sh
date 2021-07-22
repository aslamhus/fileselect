npx babel src/FileSelect.js --out-file build/FileSelect.js --presets @babel/preset-env --plugins @babel/plugin-transform-modules-commonjs
npx babel src/FileSelect.js --out-file build/FileSelect.min.js --presets=minify,@babel/preset-env --plugins @babel/plugin-transform-modules-commonjs
px babel src/FileSelect.js --out-file lib/FileSelect.mjs