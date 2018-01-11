/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
var id=getQueryString('id');
var count=0;
$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        //scrollX: false, //是否横向滚动
        //startX: 0, //初始化时滚动至x
        //startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    productList();
    clickspan();
    getbtnspan();
    getcart();
})

window.addEventListener('load',function () {
    var slide = mui('.mui-slider');
    slide.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
})
function productList() {
    $.ajax({
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:function (backData) {
            //console.log(backData.pic)
            for(var i=0;i<backData.pic.length;i++) {
                var pic=backData.pic[i].picAddr.split('/');
                 backData.pic[i].picAddr=pic[pic.length-1]
            }
            var sizetr=backData.size.split('-');
            var size=[];
            for(var i=sizetr[0];i<=sizetr[1];i++) {
                size.push(i);
            }
            backData.size=size;
            //console.log(size);
            //console.log(backData);
            var html=template('producttem',backData);

            $('#main .box').html(html);
            var divfirst=$('.mui-slider .mui-slider-item').first().clone();
            divfirst.addClass('mui-slider-item-duplicate');
            $('.mui-slider .mui-slider-group').append(divfirst);
            var divlast=$('.mui-slider .mui-slider-item').last().clone();
            divlast.addClass('mui-slider-item-duplicate');
            $('.mui-slider .mui-slider-group').prepend(divlast);
            $('.mui-slider  .mui-indicator').first().addClass('mui-active');
            //$('.box .size span').first().addClass('active');
        }
    })
}

function clickspan() {
    $('.box').on('click','.size span',function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
};
function getbtnspan() {
    $('.box').on('click','.num span',function () {
         var type=$(this).data('type');
        var num=$(this).siblings('i').text();
        //console.log(num);
        if(type=='left'){
            count--
            if(count<=0)
            count=0;
        }else{
            count++
            if(count>=num)
            count=num;
        }
        $(this).siblings('input').val(count)
    })
};
function getcart() {
     $('#footer button').on('click',function () {
         var size=$('.box .size span.active').text();
         //console.log(size);
         var num=$('.box .num input').val();
         var type=$(this).data('type')
         //console.log(num);
         if(!size) {
             mui.toast('请选择尺码');
             return;
         }
         if(num==0) {
             mui.toast('请选择数量');
             return;
         }
         $.ajax({
             url:' /cart/addCart',
             type:'post',
             data:{
                 productId:id,
                 num:num,
                 size:size
             },
             success:function (backData) {
                 console.log(backData)
                 if(backData.error) {
                     window.location.href="./login.html";
                 };
                 if(backData.success) {
                     if(type=='cart') {

                         //    var btnArray =['是', '否'] ;
    mui.confirm('温馨提示', '添加成功，是否去购物车看看?', ['是', '否'], function(e) {
        if (e.index == 0) {
            window.location.href="./cart.html";
        } else {
            mui.toast('添加成功');
        }
    })
                     }else if (type=="buy") {
                         window.location.href="./cart.html"
                     }
                 }
             }
         })
     })
}
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}




//mui初始化
//var info = document.getElementById("info");
//document.getElementById("alertBtn").addEventListener('tap', function() {
//    mui.alert('欢迎使用Hello MUI', 'Hello MUI', function() {
//        info.innerText = '你刚关闭了警告框';
//    });
//});
//document.getElementById("confirmBtn").addEventListener('tap', function() {
//    var btnArray = ['是', '否'];
//    mui.confirm('MUI是个好框架，确认？', 'Hello MUI', btnArray, function(e) {
//        if (e.index == 0) {
//            info.innerText = '你刚确认MUI是个好框架';
//        } else {
//            info.innerText = 'MUI没有得到你的认可，继续加油'
//        }
//    })
//});
//document.getElementById("promptBtn").addEventListener('tap', function(e) {
//    e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
//    var btnArray = ['确定', '取消'];
//    mui.prompt('请输入你对MUI的评语：', '性能好', 'Hello MUI', btnArray, function(e) {
//        if (e.index == 0) {
//            info.innerText = '谢谢你的评语：' + e.value;
//        } else {
//            info.innerText = '你点了取消按钮';
//        }
//    })
//});
//document.getElementById("toastBtn").addEventListener('tap', function() {
//    mui.toast('欢迎体验Hello MUI');
//});
