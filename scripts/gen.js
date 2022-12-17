const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const outputDir = path.resolve(__dirname, '../src/request/generator/');

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
    // input: path.resolve(__dirname, "./schemas.json"),
    url: 'http://localhost:8080/v3/api-docs',
    output: outputDir,
    modular: true,
    // templates: path.resolve(__dirname, './templates'),
    // axios: true,
    httpClientType: 'axios',
    // routeTypes: true,
});