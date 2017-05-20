module.exports = {
	configureWebpack: config => {
		return {
			resolve: {
				alias: {
					'/src': config.resolve.alias['@']
				}
			}
		};
	},
	css: {
		loaderOptions: {
			// pass options to sass-loader
			sass: {
				data: `@import "src/assets/commons";`
			},
		}
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:4567'
			}
		}
	}
}