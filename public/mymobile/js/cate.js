$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //�Ƿ��������
        //scrollX: false, //�Ƿ�������
        //startX: 0, //��ʼ��ʱ������x
        //startY: 0, //��ʼ��ʱ������y
        indicators: false, //�Ƿ���ʾ������
        deceleration:0.0001, //����ϵ��,ϵ��ԽС����Խ����
        bounce: true //�Ƿ����ûص�
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