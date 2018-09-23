//测试函数
let testFun = function(firstname,lastname){
    this.fullname = firstname+'.'+lastname;
    console.log('fullname:'+this.fullname);
}
//测试对象
let testObj = {};

//实现call功能的函数
Function.prototype.selfcall = function(obj){
    let context = Object(obj);
    let args = [];
    for(let k in arguments)
    args.push(arguments[k]);
    if(!context)
    context = typeof window==='object'?window:global;
    context.fn = this;
    //使用ES6的rest参数
    let result = context.fn(...(args.slice(1)));
    delete context.fn;
    return result;
}

//不使用ES6的方法实现
Function.prototype.selfcall_low = function(obj){
    var result,context=obj,args = [];
    if(!context)
    context = typeof window==='object'?window:global;
    context.fn = this;
    //这样做是因为参数可能是直接量，不能直接把参数push进数组中，在eval的过程中可能会导致引号丢失
    //所以保险的做法是通过arguments间接地调用参数
    for(var x=1;x<arguments.length;x++)
    args.push('arguments['+x+']');
    result = eval('context.fn('+args.toString()+')');
    delete context.fn;
    return result;
}
testFun.selfcall(testObj,'mengqi','D');
testFun.selfcall_low(testObj,'mengqi','D');
testFun.selfcall(null,'x','y');
testFun.selfcall_low(null,'x','y');
