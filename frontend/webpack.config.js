const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './index.jsx',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, './.dist'),
		filename: 'index_bundle.js',
		publicPath: '/',
		assetModuleFilename: 'src/assets/images/[name].[ext]'
	},
	target: 'web',
	devServer: {
		port: '5000',
		static: {
			directory: path.join(__dirname, 'public'),
		},
		open: true,
		hot: true,
		liveReload: true,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
				type: 'asset/resource'
			 }
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
};
