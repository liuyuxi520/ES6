function Log(...arg){
	console.log(...arg)
}
{
	Log('%c1.变量','color:red');//参数前面加%c，后面既可添加样式
	//ES5 var 定义变量
	var arr = [],
	    obj = {};
	//ES6 var、function、let、const、class、import 定义变量
	let b = [1];
//	let b = {};//报错 ES6 let声明完变量不可更改数据类型
	Log(b)
	const hour =24;
	const aa = {a:5};
	aa.a = 3;
//	hour = 23;//报错，只能读，不能更改
	Log(hour,aa.a)//24 3
}
{
	Log('%c2.块级作用域','color:red');
	//ES6
	let arr = [];
	for(let i = 0;i<5;i++){//let定义，能保存每个i的值
		arr.push(function(){
			Log('ES6结果',i)
		})
	}
	arr[2]();
	
	//ES5
	var arrs = [];
	for(var j = 0; j<5; j++){
		arrs.push(function(){//闭包函数会保存变量的最后一个值
			Log('ES5结果',j)
		})
	}
	arrs[2]();
	
	//ES5换新方法
	var arra = [];
	for(var r=0;r<5;r++){
		(function(r){
			arra.push(function(){
				Log('ES5整合后',r);
			})
		})(r)
	}
	arra[2]();
}
{
	Log('%c3.解构赋值','color:red');
	// 默认参数、不定参数、Module、一个新的api等都应用的结构赋值的原理
	//注意：解构赋值也是变量声明的过程，所以要遵循ES6变量声明的规则
	{//数组解构赋值
		var c = [],
			arr = ["a1","a2","a3","a4"];
		// 实现：第2项后面的都放进c数组内
		//ES5方法
		var	a = arr[0],
			b = arr[1],
			c = arr.slice(2);
			Log(a,b,c)
		
		//ES6
		//三个点是扩展运算符，后面跟的是个数组(f为存储剩余数组的变量)，而解构时，arr数组中未被匹配的项都将放进该数组
		//如果等号右边不是数组，那么就会报错
		let [d,e,...f] = arr;
		Log(d,e,f)
		{
			// rest参数和扩展运算符：
			// rest参数，形式为 ...变量名 ，将函数多余参数放入一个数组，应用场景是声明函数传参时  ...arg
			// 扩展运算符是三个点 ... ,将数组转为由逗号分隔的参数序列，好比rest参数的逆运算，
			// 应用场景为函数调用时，用以将数组用逗号分隔成多个参数传入
		}
	}
	{//对象解构赋值：属性没有次序，变量与属性名相同才能取到值
		let obj = {
			a:1,
			b:2,
			c:3
		};
		//ES5方法
//		var a = obj.a,
//			f = obj.b,
//			g = obj.c,
//			h = obj.d || 5;
//		Log(f,g,h)
		
		//ES6方法
		let {a=4,b:p,c:q,z=4} = obj;
		//:前面代表对象中的属性，：后面代表对象中该属性的值 等价于 let {a,b:p,c:q,z=4} = obj; 当let后面对象的属性没有：赋值时，默认为 a:a,用属性名当解构后的变量名称
		Log(a,p,q,z)//1,2,3,4  当对象中，有属性a的值时，在解构对象时，对a属性赋值不起作用，默认解构原对象中a属性的值
	}
}

{
	Log('%c4.不定参数，默认参数','color:red')
	var es5 = {
		fn1 : function(){
			var args = Array.prototype.slice.call(arguments,0)
			Log(args.sort());
		},
		fn2 : function(opt){
			var a =opt && opt.a || 'hello',
				b =opt && opt.b || 'es5';
			Log(a +' ' + b + '!');
		}
	};
	es5.fn1(1,2,11,3);//[1, 11, 2, 3]
	es5.fn2({a:'hi'});//hi es5!
	
	let x ='web',
		es6 = {
			fn1(...args){
				Log(...args);
			},
			fn2(s='aa'){
				Log(s);//aa
			},
			fn3(s=x){//s变量的作用域是对象es6所处的作用域，而不是fn3函数的作用域
				let x = 'bb';
				Log(s);//web
			},
			fn4({a='hello',b='girl'}={}){//这里类似于对象解构吗？没有let也可以？
				Log(`${a+b}!`);
			}
		};

	es6.fn1('hi','xi',2);
	es6.fn2();
	es6.fn3();
	es6.fn4({a:'hii'});
	{
		let a1 = [1,2];
		let a2 = [2,3];
		//Es5方法
		let arr1 = a1.concat(a2);//a1不会被影响
		Log(a1,a2,arr1)
		//ES6方法
		let arr2 = [...a1,...a2];
		Log(a1,a2,arr2)
	}
}
{
	Log('%c5.代码简写:箭头函数对象的方法','color:red');
	let prop = 'es66';
	let	s = 'method';
	let	obj = {
			prop, //等于同prop:prop
			mehtod1(){},
			//属性名、方法名可以采用表达式
			//因为箭头函数没有自己的this，函数体内的this就是定义时所在的对象
			[`${s}2`](){
				[].forEach(function(val){
					Log(this) //window
				});
				[].forEach((val)=>{
					Log(this);
				});
			}
			
	};
	obj.method2();
	const add = (a,b)=>{
		return a+b;
	};
	Log(add(4,5));
}
{
	Log('%c6.Template Strings（字符串模板）','color:red');
	const start ='hi all';
	const getname = ()=>{
		return 'jer';
	};
	const conf = {
		fav : 'coding'
	};
	const msg = `${start},my name is ${getname()},${conf.fav} is my favourite.`
	Log(msg)
}
{
	Log('%c7.Promise','color:red');
//	传统嵌套函数
//	function a(call){
//		Log('a');
//		call && call();
//	}
//	function d(call){
//		Log('d');
//		call && call();
//	}
//	function c(call){
//		Log('c');
//		call && call();
//	}
//	function b(call){
//		Log('b')
//		call && call();
//	}
//	a(function(){
//		b(function(){
//			c(function(){
//				d()
//			})
//		})
//	});
	function a(){
		Log('a');
	}
	function d(){
		Log('d');
	}
	function c(){
		Log('c');
	}
	function b(){
		Log('b')
	}
	let q = new Promise((resolve)=>{
		resolve(a());
	});
	Log(q)
//	let bbb = q.then(b);
//	Log(bbb)//promise对象,b函数里面没有任何的resolve或reject,所以状态一直是pending
	q.then(b).then(c).then(d).catch((err)=>{
		throw new Error(err)
	});

	{	
		
		var promise = new Promise((resolve)=>{
		    console.log(1);
		    resolve(3);//resolve返出去的参数,将作为下一个then的value值
		});
		promise.then((value)=>{
		    console.log(value);
		});
		console.log(2);
	}	
	{
		function testPromise(ready) {
		    return new Promise(function(resolve,reject){
		        if(ready) {
		            resolve("hello world");
		        }else {
		            reject("No thanks");
		        }
		    });
		};
		// 方法调用
		testPromise(false).then(function(msg){//接收resolve
		    console.log(msg);
		},function(error){//接收reject
		    console.log(error);
		});
	}
	{
		var aaa = new Promise(function(resolve, reject) {
		  setTimeout(function() {
		      resolve('11')
		  }, 2000)
		})
		function b(val) {
		  console.log(val)
		  return new Promise(function(resolve, reject) {
		    setTimeout(function() {
		        resolve('22')
		    }, 2000)
		  })
		}
		aaa.then(b).then(function(val) {
		console.log(val)
		})
	}
}
{
	Log('%c8.class','color:red');
	//Class，有constructor、extends、super，但本质上是语法糖（对语言的功能并没有影响，但是更方便程序员使用）

	class Artist {
		constructor(name){
			this.name = name;
		}
		perform(){
			return `${this.name} performs`;
		}
	}
	class Singer extends Artist{
		constructor(name,song) {
			super(name);//放在顶端
			this.song = song;
		}
		perform(){
			return `${super.perform()} [ ${this.song} ]`;
		}
	}
	let jam = new Artist('jam');
	let lily = new Singer('lily','lemmon tree');
	Log(jam,jam.perform(),jam instanceof Artist);
	Log(lily,lily.perform(),lily instanceof Singer);
	
}
{

	Log('%c9.Generator','color:green');
	
	//3个ajax请求,不确定谁先执行成功,但是谁先执行成功,谁就调用a函数,以此类推
	function a(){
		Log('成功打印a')
		return 'a';
	}
	function b(){
		Log('成功打印b')
//		return 'b';
		
	}
	function c(){
		Log('成功打印c')
		return 'c';
		
	}
	function* g(){
		Log('run');
		yield a();///yield语句本身没有值，返回一个undifined
		yield b();
		yield c();
		return 'end';
	}
	let g1 = g();
//	let g2 = g1.next();
//	let g3 = g1.next();
//	let g4 = g1.next();
//	let g5 = g1.next();
//	let g6 = g1.next();
//	Log(g1,g2,g3,g4,g5,g6);
	
	$.ajax({
		url:'http://api.btime.com/living/getinfo?pam=1',
		datatype : 'jsonp'
	}).done((val)=>{
		Log('第一个ajax',val)
		g1.next();
	});
	$.ajax({
		url:'http://api.btime.com/living/getinfo?pam=layout',
		datatype : 'jsonp'
	}).done((val)=>{
		Log('第二个ajax',val)
		g1.next();
	});
	$.ajax({
		url:'http://api.btime.com/living/getRecentInfoByUid?pam=3',
		datatype : 'jsonp'
	}).done((val)=>{
		Log('第三个ajax',val)
		g1.next();
	});
	//ES6:目的是没有传参就报错，也就是参数是必传项 
	const err = () =>{
		throw new Error('没有传参可不行')
	};
	const fn = (param = err()) =>{Log(param) };
	fn(111);
	fn();
}



