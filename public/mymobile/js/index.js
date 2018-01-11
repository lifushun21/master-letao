
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
})

window.addEventListener('load',function () {
    var slide = mui('.mui-slider');
    slide.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
})