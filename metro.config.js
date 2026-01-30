const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    server: {
        // Workaround for React Native 0.76.x Metro bundler bug
        enhanceMiddleware: (middleware) => {
            return middleware;
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
