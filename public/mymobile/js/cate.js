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
    getCateLeft();
    getCateRight()
})
function getCateLeft() {
    $.ajax({
        url:'/category/queryTopCategory',
        success:function (backData) {
            //console.log(backData)
            var html=template('catelefttem',backData);
            $('.cateleft ul').html(html);
        }

    })
}
function getCateRight() {
    $('.cateleft ul').on('click',function(e) {
        //console.log(this);
        var dataid= $(e.target).data('id');
        $.ajax({
            url:' /category/querySecondCategory',
            data:{
                id:dataid
            },
            success:function (backData) {
                console.log(backData)
                var html=template('caterighttem',backData);
                $('.cateright ul').html(html);
            }

        })
    })
}