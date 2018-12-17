const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.module.rules[3].exclude = [/\.svg$/]

    defaultConfig.module.rules.push({
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader'
            }
        ]
    });

    return defaultConfig;
};