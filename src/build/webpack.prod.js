const path = require("path");
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
process.env.NODE_ENV = 'production';
module.exports = merge(common, {
    mode : 'production',
    devtool : 'source-map', // source-map for no eval
    output : {
        path : path.resolve(__dirname, '../../dist'), // default value
        filename: '[name].bundle.[chunkhash].js',
        chunkFilename : '[name][chunkhash].js',
        publicPath : '/',
        // publicPath : ASSET_PATH,
    },
    optimization : {
        // realContentHash: false,
        // runtimeChunk: 'single',
        // chunkIds : 'named',
        splitChunks: {
            cacheGroups : {
                commons : {
                    name(module, chunks, cacheGroupKey){
                        // adds chunks to file strucutre based on chunk filename
                        // e.g. admin/js/pdjs/pdf.chunk[hash] (extesion appended by output)
                        // console.log('chunks', chunks)
                        // console.log('chunk name',chunks[0].name)
                        // console.log('chunk hash',chunks[0].hash)
                        const moduleFileName = module
                            .identifier()
                            .split('/')
                            .reduceRight((item) => item)
                            .replace(/\.js$/i, '');
                        let runtime = typeof chunks[0].runtime == 'string' ? chunks[0].runtime : '';
                        runtime = runtime !== 'main' ? runtime : '.';
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        // console.log('allChunksNames',allChunksNames)
                        // console.log('moduleFilename',moduleFileName)
                        
                        return `${runtime}/js/${allChunksNames}/${moduleFileName}.chunk.`;
                    }
                }
            }
        }
    },
    module : {
        rules : [
            {
                test : /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                use : {
                    loader : 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
            }
        ]
    }

});