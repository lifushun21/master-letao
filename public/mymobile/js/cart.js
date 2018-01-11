$(function () {
    getcart();
    getscrollwrapper();
    getsum();
    getdelete();
    updatecart();
    clickspan();
    getbtnspan()
});
function getscrollwrapper() {
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                //style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                //color:'red', //可选，默认“#2BD009” 下拉刷新控件颜色
                //height:'50px',//可选,默认50px.下拉刷新控件的高度,
                //range:'50px', //可选 默认100px,控件可下拉拖拽的范围
                //offset:'45px', //可选 默认0px,下拉刷新控件的起始位置
                //auto: true,//可选,默认false.首次加载自动上拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放可以刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新中...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function() {
                    setTimeout(function() {
                        getcart();
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

                        // 注意重置上拉刷新的效果 如果不重置是无法拉动
                        //mui('#refreshContainer').pullRefresh().refresh(true);
                    },2000)
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },

        }
    });
};
function getcart() {
    $.ajax({
        url:' /cart/queryCartPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function (backData) {
            var sums=0;
            for(var i=0;i<backData.data.length;i++) {
                for (var j = 0; j < backData.data[i].pic.length; j++) {
                    var pic=backData.data[i].pic[j].picAddr.split('/');
                    backData.data[i].pic[j].picAddr=pic[pic.length-1];
                }
                sums+=backData.data[i].num*backData.data[i].price;
                //console.log(sums);
            }
            //console.log(backData)
            sums=sums.toFixed(2);
            $('.cart-order .left>i').text(sums);
            var html=template('cartTem',backData);
            $('#main .mui-scroll>ul').html(html);
        }
    })
};
function getsum() {
    var sum=+($('.cart-order .left>i').text());
    //console.log(sum)
   $('#main').on('click','.mui-table-cell .mui-media-body input',function () {
       var selected=$(this).prop('checked');
       var price=$(this).data('price');
       var num=$(this).data('num');
       var sum=+($('.cart-order .left>i').text());
       //console.log(selected);
       if(selected) {
           sum+=price*num;
       }else{
           sum-=price*num;
       }
       sum=sum.toFixed(2);
       $('.cart-order .left>i').text(sum);
   })
};
function getdelete() {
    $('#main').on('tap','.btn-delete',function () {
        var id=$(this).data('id');
        var price=$(this).data('price');
        var num=$(this).data('num');
        //console.log(price);
        var sum=+($('.cart-order .left>i').text());
        var that=this;
        mui.confirm("你要删除这个商品吗？","温馨提示", ['是', '否'], function(e) {

            if (e.index == 0) {
                //window.location.href="./cart.html";
                $.ajax({
                    url:'/cart/deleteCart',

                    data:{
                        id:id
                    },
                    success:function (backData) {
                        console.log(backData);
                        if(backData.success) {
                            sum-=price*num;
                            console.log(sum)
                            sum=sum.toFixed(2);
                            $('.cart-order .left>i').text(sum);
                            $(that).parents('li').remove();
                            mui.toast('删除成功');
                        }
                    }
                })
            } else {
                mui.toast('不删除');
            }
        })

    })
};
function updatecart() {
    $('#main').on('tap','.btn-update',function () {
        var id=$(this).data('id');
        var num=$(this).data('num');
        var productNum=$(this).data('productnum')
        var nowsize=$(this).data('size');
        var price=$(this).data('price');
        //console.log(price);
        var sum=$('.cart-order .left>i').text();
        sum-=num*price;
        var productSize=$(this).data('productsize');
        console.log(sum);
        var sizetr=productSize.split('-');
        var size=[];
        for(var i=sizetr[0];i<=sizetr[1];i++) {
            size.push(i);
        }

        //console.log(nowsize);
        var html=template('getsize',{rows:size,num:num,nowsize:nowsize,productNum:productNum}).replace(/(\r)?\n/g, "");
        //console.log(html);
        $('.confirm').find('br').remove();
        var that=this;
        mui.confirm(html,"编辑商品", ['是', '否'], function(e) {

            if (e.index == 0) {
                //window.location.href="./cart.html";
                $.ajax({
                    url:' /cart/updateCart',
                    type:'post',
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    success:function (backData) {
                        console.log(backData);
                        if(backData.success) {
                            var size=$('.mui-popup-text>span.active').text();
                            var num=$('.mui-popup-text .num input').val();
                            sum+=price*num;
                            sum=sum.toFixed(2);
                            console.log(sum);
                            $('.cart-order .left>i').text(sum);
                            $(that).parent().siblings().find('.num>i').text(num);
                            $(that).parent().siblings().find('.size>i').text(size);
                            mui.toast('编辑成功');
                        }

                    }
                })
            } else {
                mui.toast('未编辑');
            }
        })
        //console.log(size);

    })
};
function clickspan() {
    $('body').on('click','.mui-popup-text>span',function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
};
function getbtnspan() {
    //var count=$('.mui-popup-text .num input').val();
    //console.log(count);
    $('body').on('tap','.mui-popup-text .num>span',function () {
        var type=$(this).data('type');
        var count=$(this).siblings('input').val();
        var num=$(this).parent().siblings('i').text();
        //console.log(count);
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