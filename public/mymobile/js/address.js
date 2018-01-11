/**
 * Created by Administrator on 2018/1/7 0007.
 */
$(function () {
    //mui.init();
    queryaddress();
    updataaddress();
})

function queryaddress() {
    $.ajax({
        url:'/address/queryAddress',
        success:function (backData) {
            console.log(backData)
           var html=template('queryaddress',{rows:backData});
            $('#main>ul').html(html);
        }
    })
};

function updataaddress() {
    $('#main').on('click','.mui-table-view>li',function () {
        var id=$(this).data('id');
        //console.log(id);
        window.location.href="./addressManage.html?addressId="+id;
    })
}