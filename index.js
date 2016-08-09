var mixin = require('utils-merge');
var Promise = require('promise');
var common = require('./lib/functions');

var params = {
    basedir : __dirname,

}
console.log('DEBUG');
common.listfile(params.basedir + '/app/lib/').then(result =>{
    console.log('Start lib promise');
    var lib_promise = [];
    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            console.log(result[key]);
            lib_promise.push(common.loadlibrary(params.basedir + '/app/lib/' + result[key]).catch(resolve({'result':-1, 'error':error})));
        }
    }
    console.log('Lib_promise');
    Promise.all(lib_promise).then(value => {
        var lib = {};
        if (value instanceof Array){
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (value[k].result === -1){
                        console.log(value[k]);
                    }else{
                        mixin(lib, value[k]);
                    }
                }
            }
        }
        console.log('LIB');
        console.log(lib);
        resolve(lib);
    });
}, error =>{
    console.log(error)
    resolve({});
}).then(lib => {
    console.log('hahaha');
    console.log(lib);
    lib.println();
});
