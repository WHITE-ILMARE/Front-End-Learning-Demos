const promise = new Promise(function(resolve,reject){
    let info = 'promise';
    setTimeout(function(){
        console.log(info);
        resolve();
    },1000);
});
promise.then(function(){
    console.log('success');
});

const promise_err = new Promise(function(resolve,reject){
    throw new Error('reject can catch error');
}).then(null,function(error){console.log('xxx,'+error);})