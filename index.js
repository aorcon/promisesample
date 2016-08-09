var mixin = require('merge-descriptors');
var Promise = require('promise');
var common = require('./lib/functions');

var params = {
    basedir : __dirname,

}
console.log('DEBUG');
common.listfile(params.basedir + '/app/lib/').then(result =>{
    console.log('Start lib promise');
    // var lib_promise = [];
    // for (var key in result) {
    //     if (result.hasOwnProperty(key)) {
    //         console.log(result[key]);
    //         lib_promise.push(
    //             new Promise((resolve, reject) =>{
    //                 lib_promise.push(common.loadlibrary(params.basedir + '/app/lib/' + result[key])
    //                     .catch(error => {
    //                         return Promise.resolve({'result':-1, 'error':error});
    //                 }));
    //             })
    //         );
    //     }
    // }
    console.log('Lib_promise');
    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            result[key] = params.basedir + '/app/lib/' + result[key];
        }
    }
    return Promise.all(result.map(common.loadlibrary));
    // Promise.all(lib_promise).;
}, error =>{
    console.log("will error");
    console.log(error);
    Promise.reject({});
}).then(value => {
    console.log("all done");
    var Lib = function(){

    };
    var lib = new Lib();
    if (value instanceof Array){
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                console.log(value[key]);
                if (value[key].result === -1){
                    console.log(value[key]);
                }else{
                    mixin(Lib, value[key].prototype, false);
                }
            }
        }
    }
    lib.println();
    console.log(lib);
}).catch(error => {
    console.log(error);
});
/*
.all(lib_promise)
.then(value => {
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
})
.then(lib => {
    console.log('hahaha');
    console.log(lib);
    lib.println();
});
*/
