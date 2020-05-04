module.exports = {
    devServer: process.env.NODE_ENV !== 'production' ? {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000/api',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/api': ''}
            }
        }
    } : undefined,
    chainWebpack (config) {
        config
            .plugin('html')
            .tap((args) => {
                args[0].title = 'Glaze';
                return args;
            });
    }
}
