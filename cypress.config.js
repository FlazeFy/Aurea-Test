const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        // baseUrl : 'https://aurea.leonardhors.com',

        // For Backend Apps
        baseUrl: 'http://localhost:5555/',

        // For Frontend Apps
        // baseUrl: 'http://localhost:3000/',
        
        specPattern : "support",
        supportFile : false,
    }
})