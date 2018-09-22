const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function getText(url){
    const promise = new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.send(null);
        xhr.onreadystatechange = function(){
            if(this.readyState == 4)
            {
                if(this.status===200)
                {
                    if(this.getResponseHeader('Content-Type').match(/^text/))
                    resolve(xhr.responseText);
                    else
                    reject(this.getResponseHeader('Content-Type'));                    
                }
                reject('null');
            }
        }
        //reject(new Error(xhr.status));
    })
    promise.then(
        function(data){
            console.log('resolved,response Text:'+data);
        },function(type){
            console.log('rejected,response type:'+type);
    })
    return promise;
}

let promise1 = getText('http://127.0.0.1:8888/1.txt');
let promise2 = getText('http://127.0.0.1:8888/2.txt');
let promise3 = Promise.all([promise1,promise2]);
promise3.then(data=>{
    console.log('two promise instances has resolved,result:'+data);
    let promise4 = getText('http://127.0.0.1:8888/1.jpg');
    /*如果不显式地return新建的这个promise实例，then方法返回另一个promise实例，后面的catch就不会捕捉到promise4的reject*/
    return promise4;
}).catch(type=>{
    console.log('the final promise failed,type:'+type);
})