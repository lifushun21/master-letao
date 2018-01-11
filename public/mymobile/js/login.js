/**
 * Created by Administrator on 2018/1/4 0004.
 */
$(function () {
    mui('.mui-input-row input').input();
    getlogin();
    getback();
})

function getlogin() {
    $('#main .btn-login').on('click',function () {
        var userName=$('#main .userNamaInp').val();
        var passwordInp=$('#main .passwordInp').val();
        $.ajax({
            url:' /user/login',
            type:'post',
            data:{
                username:userName,
                password:passwordInp
            },
            success:function (backData) {
                console.log(backData)
                if(backData.error){
                    mui.toast(backData.message);
                }
                if(backData.success){
                    console.log(14);
                    window.location=document.referrer;
                    //history.back();
                }
            }
        })
    })
}
function getback() {
    $('#header a').on('click',function () {
        window.history.go(-1);
    })
}