//remember to od production sass

var webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
var PATHS  = {
    "production" : "../SunDevilGivingDay2017/Scripts/",
    "images" : "./Content/images/",
    "imagesPublic" : "./Content/images/",
    "filesPublic" : "./Content/files/",
    "scripts" : "./scripts/"
};
module.exports = {
    entry: "./src/webparts/webPortal/WebPortalWebPart.ts",
    /*output: {
        path: "./dist",
        filename: "scripts/[name].bundle.js"
    },*/
    resolve : {
        extensions : ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
           
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
               loader:[
                    {
                        loader:"url-loader",
                        options : {
                            limit: 25000,
                            outputPath : PATHS.images,
                            publicPath : PATHS.imagesPublic
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                            }
                        },
                    },
                ]
            },
            /*
            consider putting this in later but only when we have more files.  dont want to include too many things.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "script-loader"
            }*/
            
            {
                test: /\.scss$/,
                use: [
                    {
                        loader : "style-loader"
                    },
                    {
                        loader : "css-loader",
                    },
                    {
                      loader : "sass-loader",
                    }

                ]
            },
            {
                test : /\.css$/,
                use : ["style-loader", "css-loader"]},
            {
                test : /\.jsx$/,
                use : [
                   {
                        loader: 'babel-loader',
                        options: {
                            presets: [ 
                                ["env", {
                                        "targets" : {
                                            "browsers" : ["last 3 versions", ">1%"]
                                        },
                                        useBuiltIns : true,
                                        }
                                ],
                                ["es2017"],
                                ["es2016"],
                                ["es2015"],
                                ["react"],
                            ]
                        }
                   }
               ]
            }, 
            {
            test :/.*\.(tsx|ts)$/i,
               use : [
                   {
                    loader: "ts-loader",
                    options : {
                        transpileOnly : true,
                        isolatedModule: true
                    }
                   }
                   
               ]
               
           }
        ]
    },
    plugins:[
       /*new webpack.optimize.CommonsChunkPlugin({
            //chunk name
            name: "common",
            //filename
            filename: PATHS.scripts + "common.js",
            //if the module is used in 3 entry points we put it in the common.
            minChunks: 3,
        }),
        //new CheckerPlugin()
        /*new webpack.DefinePlugin({
        "process.env": { 
            NODE_ENV: JSON.stringify("production") 
        }
        }) */
    ],
}