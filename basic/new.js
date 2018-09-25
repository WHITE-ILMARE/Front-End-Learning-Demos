//不能直接实现new那样的写法，用一个函数替代
//主要还是使用apply处理参数，注意返回值问题
//心得：处理参数用apply而不是call很方便，也体现出es6里rest参数的便利之处
//这个形参由于arguments变量的存在真的可有可无，这是JS语言松散的一种体现吧
//ES6中rest参数的出现也是为了取代arguments这种不规范用法吧
function objFac()
{
    var result = new Object();
    var Constructor = Array.prototype.shift.call(arguments);
    var return_back = Constructor.apply(result,arguments);
    result.__proto__ = Constructor.prototype;
    return typeof return_back=='object'?return_back:result;
}

//测试普通用法 
var test1 = function(val){
    this.val = val;
}
var obj1 = objFac(test1,2);
console.log(obj1);
console.log(obj1 instanceof test1);

//测试返回对象用法,这种用法显然是不规范的，新建的对象根本不是构造函数的实例(原型没有指向同一对象)
var test2 = function(val){
    this.val = val;
    return {
        obj:3
    }
}
var obj2 = objFac(test2,2);
console.log(obj2);
console.log(obj2 instanceof test2);

//测试返回直接量的用法
var test3 = function(val){
    this.val = val;
    return 4;
}
var obj3 = objFac(test3,2);
console.log(obj3);
console.log(obj3 instanceof test3);
