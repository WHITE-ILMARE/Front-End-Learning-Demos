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
console.log('hello');