//bind的实现以apply为基础，这是基础版
Function.prototype.selfbind = function(context)
{
    let self = this;
    let bindargs = [].slice.call(arguments);
    bindargs = bindargs.slice(1);
    return function(){
        let innerargs = [].slice.call(arguments);
        let beforeargs = bindargs.concat(innerargs);
        //用apply不用call因为apply第二个参数是数组，不用转化为一个个参数
        return self.apply(context,beforeargs);
    }
}

//这是完全版，包含bind作为构造函数的使用,这个用法我还没遇到过
Function.prototype.fullbind = function(context)
{
    let self = this;
    let bindargs = [].slice.call(arguments);
    bindargs = bindargs.slice(1);
    let funbind = function(){
        let innerargs = [].slice.call(arguments);
        let beforeargs = bindargs.concat(innerargs);
        //用apply不用call因为apply第二个参数是数组，不用转化为一个个参数
        //作为构造函数使用时，构造函数内this指向新建的对象
        //不作为构造函数使用时，this指向window或undefined，就设置this为context
        return self.apply(this instanceof funbind?this:context,beforeargs);
    }
    //使用一个空函数保存调用函数的原型，再将原型赋给返回的函数的原型
    let transfor = function(){};
    transfor.prototype = this.prototype;
    funbind.prototype = new transfor();
    return funbind;
}

//测试基础版bind
let testfun = function(val2,val3){
    return this.val+val3+val2;
}
let testobj = {
    val:3
}
let bindval = testfun.selfbind(testobj,1);
console.log(bindval(4));

//测试作为构造函数的bind返回的函数
let testCons = function(val)
{
    this.testval = val;
}
let constructor = testCons.fullbind();
let instance = new constructor(5);
console.log(instance);