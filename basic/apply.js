//实现类似于call，只是参数变成了数组
Function.prototype.selfapply = function(obj,args)
{
    let context = obj;
    if(!context) context = (typeof window==='object')?window:global;
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
//也可以用eval实现，这里就不写了

function test(val1,val2,val3){
    console.log('this.x='+this.x);
    console.log('val='+val1+','+val2+','+val3);
}

let testobj = {
    x:3
}

test.selfapply(testobj,[5,6,7])