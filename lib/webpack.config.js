
let config;

if(process.env.NODE_ENV === "production"){
    config = require('./webpack.prod.js');
}else{
    config = require('./webpack.dev.js');
}

exports.default = config