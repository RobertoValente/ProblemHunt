const tempNODE_ENV = process.env.NODE_ENV || 'development';
exports.NODE_ENV = tempNODE_ENV;

console.log('-> NODE_ENV: ' + tempNODE_ENV);
require('./website/src/index.js');
