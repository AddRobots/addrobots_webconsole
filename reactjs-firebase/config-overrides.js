var path = require('path');
//var paths = require('paths');

module.exports = (config, env) => {
	config.module.rules.push(
		{
			test: /\.tsx?$/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						babelrc: true,
						plugins: ['react-hot-loader/babel'],
					},
				},
				'ts-loader', // (or awesome-typescript-loader)
			],
		}
	);
	return config
};