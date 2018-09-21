const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getText(url){
    const promise1 = new Promise(function(resolve,reject){
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
    promise1.then(
        function(data){
            console.log('resolved,response Text:'+data);
        },function(type){
            console.log('rejected,response type:'+type);
    })
}
getText('http://127.0.0.1:8888/1.txt')
getText('http://127.0.0.1:8888/1.jpg')
getText('http://127.0.0.1:8888/null.??')


