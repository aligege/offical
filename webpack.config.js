var nodeExternals = require('webpack-node-externals')
module.exports = 
{
    // 入口
    entry: "./out/Main/Eychat.js",
    //entry: "./out/Main/Offical.js",
    //entry: "./out/Main/Offical.js",
    // 输出的文件名
    output: {
        filename: 'eychat_server.js'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
    //mode: 'production'
    mode: 'development'
}