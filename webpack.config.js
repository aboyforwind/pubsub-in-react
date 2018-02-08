var webpack = require('webpack');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
	entry:{
		'app' : ['./src/index.jsx','webpack-dev-server/client?http://localhost:8084']
	},
	output:{
		path:__dirname+'/dist/',
		publicPath:'/dist/',
		filename:'js/[name].js'

	},
	module:{
		loaders:[
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback : 'style-loader'
                })
            },
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=20&name=resource/[name].[ext]'},
			{test:/\.scss$/,loader:ExtractTextPlugin.extract({
				use:'css-loader!sass-loader',
				fallback:'style-loader'
				})
			},
			{
				test:/\.js?$/,
				exclude: /(node_modules)/,
				loader:'babel-loader',
				query:{
					presets:['es2015']
				}
			},
			{
				test:/\.jsx?$/,
				exclude:'/(node_modules)/',
				loader:'babel-loader',
				query:{
					presets:['es2015','react']
				}
			}
		]


	},
	plugins :[
		//单独处理css
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            filename        : 'view/index.html',
            title           : 'MMall 后台管理系统',
            template        : './src/index.html',
            inject          : true,
            hash            : true,
            chunks          : ['vendors', 'app'],
            chunksSortMode  : 'dependency',
            minify          : {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ]

}
module.exports = config;