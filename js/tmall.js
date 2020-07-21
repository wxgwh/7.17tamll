// function animate(obj, attr0bj, duration, fn, callback) {
//     // console.log(1)
//     // clearInterval(obj.t)
//     clearInterval(obj.t);
//     //参数初始化
//     if (obj.nodeType != 1) {
//         console.error("对象的类型不对");
//         return;
//     }
//     var start = {};
//     var change = {};
//     var time = 0;
//     var fn = fn || Tween.Linear;


//     //获取每个属性的初始值
//     for (var i in attr0bj) {
//         start[i] = parseInt(getComputedStyle(obj, null)[i]);

//         change[i] = attr0bj[i] - start[i];
//         // console.log(change[i])
//     }

//     obj.t = setInterval(function() {
//         time += 50;
//         for (var i in attr0bj) {
//             // obj.style[i] = (change[i] * time / duration + start[i]) + "px"
//             obj.style[i] = fn(time, start[i], change[i], duration) + "px"
//                 // obj.style[i] = + "px"
//             console.log(obj.style[i])
//         }
//         if (time >= duration) {
//             for (var i in attr0bj) {
//                 obj.style[i] = attr0bj[i] + "px"
//             }
//             clearInterval(obj.t);

//             if (callback) {
//                 callback();

//             }

//         }



//     }, 50)
// }



/*
    动画函数

    obj  动画的对象
    attrobj  动画的属性和最终值  object{}
    duration  动画的持续时间
    fn  动画函数  默认值 Tween.Linear
        callback  回调函数，本次动画执行完后运行的函数
    */

   function animate(obj, attrObj, duration, fn, callback) {
    // 参数初始化
    if (obj.nodeType !== 1) {
        console.error("类型不对");
        return;

    }
    var start = {};
    var change = {};
    var time = 0;
    var fn = fn || Tween.Linear;

    // 
    for (var i in attrObj) {
        start[i] = css(obj, i)
        change[i] = attrObj[i] - start[i]
    }

    obj.t = setInterval(function() {
        time += 50;
        for (var i in attrObj) {
            // obj.style[i] = fn(time, start[i], change[i], duration) + "px"
            css(obj, i, fn(time, start[i], change[i], duration))


        }
        if (time >= duration) {
            for (var i in attrObj) {
                css(obj, i, attrObj[i])
            }
            clearInterval(obj.t);
            if (callback) {
                callback();
            }
        }
    }, 50)


}


// css(div,"width",200)
function css(obj, attr, val) {
    if (arguments.length == 2) {
        switch (attr) {
            case "background":
            case "color":
            case "opacity":
                return getComputedStyle(obj, null)[attr];

                break;
            case "scrollTop":
                return obj[attr];
                break;
            default:
                return parseInt(getComputedStyle(obj, null)[attr]);

        }

    } else if (arguments.length == 3) {
        switch (attr) {
            case "background":
            case "color":
            case "opacity":
            case "border":
                obj.style[attr] = val;
                break;
            case "scrollTop":
                obj[attr] = val;
            default:
                obj.style[attr] = val + "px"

        }


    }
}













//动画算法
/*
		    Linear：无缓动效果(匀速运动)；
			Quad：二次方的缓动；
			Cubic：三次方的缓动
			Quartic：四次方的缓动；
			Quintic：五次方的缓动；
			Sinusoidal：正弦曲线的缓动；
			Exponential：指数曲线的缓动；
			Circular：圆形曲线的缓动；
			Elastic：指数衰减的正弦曲线缓动；
			Back：超过范围的三次方缓动）；
			Bounce：指数衰减的反弹缓动。
			

			每个效果都分三个缓动方式（方法），分别是：
			easeIn：从0开始加速的运动；
			easeOut：减速到0的运动；
			easeInOut：前半段从0开始加速，后半段减速到0的运动。
			


			函数的四个参数分别代表：

				t--- current time（当前时间）；0 +=60
				b--- beginning value（初始值）；
				c--- change in value（变化量）；end-start
				d---duration（持续时间）  5000
			Tween.Quad.easeInt()

	
             运算的结果就是当前的运动路程。
             
             ecmascsript 基本语法  flash   nodejs  
             flash 里面 取出来的算法
          */

Tween = {
    Linear: function(t, b, c, d) { return c * t / d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}




// var carouseCont=document.querySelectorAll(".carousel-cont a");
var carouselList=document.querySelectorAll(".carousel-cont a img");
var carouselIndex=document.querySelectorAll(".carousel-index li");
console.log(carouselIndex)

var num=0;
var t=setInterval(function(){
    num++;
    if(num>carouselList.length-1){
        num=0;
    }
    for(var i=0;i<carouselList.length;i++){
        carouselList[i].style.opacity=0;
        carouselList[i].style.zIndex=0;
    }
    animate(carouselList[num],{opacity:1},500,Tween.Linear,function(){
        carouselList[num].style.zIndex=1;
    })
    for(var j=0;j<carouselList.length;j++){
        carouselIndex[j].style.background="#999";
    }
    carouselIndex[num].style.background="#fff";
},5000)
// 按钮轮播
for(let m=0;m<carouselIndex.length;m++){
    carouselIndex[m].onclick=function(){
        num=m;
        for(var i=0;i<carouselList.length;i++){
            carouselList[i].style.opacity=0;
            carouselList[i].style.zIndex=0;
        }
        animate(carouselList[num],{opacity:1},500,Tween.Linear,function(){
            carouselList[num].style.zIndex=1;
        })
        for(var j=0;j<carouselList.length;j++){
            carouselIndex[j].style.background="#999";
        }
        carouselIndex[num].style.background="#fff";
    }
}


// 选项卡
var flag=true;
var links=document.querySelectorAll(".tabs-title a");
var lists=document.querySelectorAll(".tabs-cont-one");
console.log(lists)
function clock(){
    if(flag==true){
        lists[0].style.display="none";
        lists[1].style.display="block";
        links[0].style.background="#F5F5F5";
        links[0].style.color="black";
        links[1].style.background="#00B262";
        links[1].style.color="#fff";
        flag=false;
    }else{
        lists[1].style.display="none";
        lists[0].style.display="block";
        links[1].style.background="#F5F5F5";
        links[1].style.color="black";
        links[0].style.background="#00B262";
        links[0].style.color="#fff";
        flag=true;
    }
}       
setInterval("clock()",5000);
for( let i=0;i<links.length;i++){
    links[i].onmouseover=function(){
        for(var j=0;j<lists.length;j++){
            lists[j].style.display="none";
            links[j].style.background="#F5F5F5";
            links[j].style.color="black";
        }
        lists[i].style.display="block";
        this.style.background="#00B262";
        this.style.color="#fff";
    }
}


// 侧边栏和隐藏的搜索框
var search=document.querySelector(".hidden-search");
var nav=document.querySelector(".hidden-nav");
//nav.style.left=document.documentElement.clientWidth-navigator.offsetWidth-615+"px";
//console.log(nav)
window.onscroll=function(){
    var st=document.documentElement.scrollTop;
    if(st>1000){
        search.style.top=0;
       //animate(search,{top:0},300)
    }else{
        search.style.top=-50+"px";
       //animate(search,{top:-40},300)
    }
    if(st>800){
        nav.style.transform="scale(1,1)"
    }else{
        nav.style.transform="scale(0,0)"
    }

    


    for(var i=0; i<navList.length;i++){
        if(navList[i].top<st && navList[i].top+navList[i].height>st){
            for(var j=0;j<navList.length;j++){
                navList[j].style.background="rgba(0,0,0,.6)";
            }
            navList[i].style.background=navList[i].getAttribute("color")
            // console.log(12)
        }
    }
    

    for(var i=0;i<navList.length;i++){
        // console.log(i);
        if(navList[i].top-document.documentElement.clientHeight<st){
            //  console.log(1);
            var imgs=contList[i].querySelectorAll("img")
            for(var j=0;j<imgs.length;j++){
                imgs[j].src=imgs[j].getAttribute("attr");
            }
        }
    }



    
}

var navList=document.querySelectorAll(".hidden-nav li:not(.daohang)");
//var lastList=document.querySelectorAll(".dingbu")[0];
var contList=document.querySelectorAll(".floor-one ul,.floor-two ul,.floor-three ul,.floor-four ul,.floor-five ul,.floor-sex ul");

for(var i=0;i<navList.length;i++){
    
    navList[i].top=contList[i].offsetTop;
    navList[i].height=contList[i].offsetHeight;
    // if(i==navList.length-1){
    //     navList[i].top=0;
    // }
    navList[i].onclick=function(){
        //console.log(this.top)
        animate(document.documentElement,{
            scrollTop:this.top
        },500)
    }

    navList[i].onmouseover=function(){
        this.style.background=this.getAttribute("color");
    }
    navList[i].onmouseout=function(){
        this.style.background="rgba(0,0,0,.6)";
    }
}
// lastList.onclick=function(){
   
// }


//侧边栏

// console.log(navigator)
// navigator.style.left=(document.documentElement.clientWidth-navigator.offsetWidth)/2-615+"px";