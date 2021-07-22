
const path = require("path");
const ASSET_PATH = process.env.ASSET_PATH || '/';
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('ASSET_PATH',ASSET_PATH);
module.exports = {
    name : 'inventory',
    entry : {
        main : './src/index.js', // chunkname main
        admin : { import : './src/admin/index.js', filename : 'admin/[name].bundle.[chunkhash].js' }, // chunkname admin
    },
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
    plugins : [ 
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks : ['main'], // reference chunkname 
            filename : 'index.html' // main goes in root directory
        }),
        new HtmlWebpackPlugin({
            template: './src/admin/index.html',
            chunks : ['admin'], // reference chunkname
            filename : 'admin/index.html'
        })
    ],
    module : {
        rules : [
            {
                test : /\.html$/i,
                loader: 'html-loader',
                options : {
                    sources : {
                        urlFilter: (attribute, value, resourcePath) => {
                            // The `attribute` argument contains a name of the HTML attribute.
                            // The `value` argument contains a value of the HTML attribute.
                            // The `resourcePath` argument contains a path to the loaded HTML file.
                            if (/\.heif$/.test(value)) {
                              return false;
                            }
              
                            return true;
                          },
                    }
                }

            },
            {
                test : /\.css$/, // regex to test for
                use : ['style-loader','css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                generator : {
                    filename: 'images/[name][hash][ext]'
                }
            },
            {
                test: /\.(mov)$/i,
                type: 'asset/resource',
                generator : {
                    filename: 'videos/[name][hash][ext]'
                }
            }

        ],
    },
    

}