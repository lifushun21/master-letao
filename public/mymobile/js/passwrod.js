/**
 * Created by Administrator on 2018/1/5 0005.
 */
$(function () {
    mui('.mui-input-row input').input();
    updatepass();
    updatapasscode()
})

function updatepass() {
    $('#main>a').on('click',function () {
        var oldpass=$('.mui-input-row .oldpass').val();
        var newpass=$('.mui-input-row #newpass').val();
        var conformpass=$('#conformpass').val();
        var code=$('.code').val();
        console.log(code)
        var data={
            oldPassword:$.trim(oldpass),
            newPassword:$.trim(newpass),
            reNewPassword:$.trim(conformpass),
            code:$.trim(code)
        }
        if (!newpass) {
            mui.toast('请输入新密码');
            return;
        }
        if (!oldpass) {
            mui.toast('请输入原密码');
            return;
        }
        if (newpass!==conformpass) {
            mui.toast('确认密码不正确');
            return;
        }
        if(!(/^\d{6}$/.test(code))){
            mui.toast('确认码格式不对');
            return;
        }
        $.ajax({
            url:'/user/updatePassword',
            type:'post',
            data: data,
            success:function (backData) {
                    console.log(backData)
                mui.toast(backData.message)
            }
        })
    })
}

function updatapasscode() {
    $('.vertifycode .btn-vertify').on('click',function () {
        $.ajax({
            url:'/user/vCodeForUpdatePassword',
            success:function (backData) {
                console.log(backData)
            }
        })
    })
}