/**
 * Created by Administrator on 2018/1/5 0005.
 */
$(function () {
    getuser();
    logout()
})

function getuser() {
    $.ajax({
        url:'/user/queryUserMessage',
        success:function (backData) {
            console.log(backData);
            if(backData.error) {
                window.location.href="./login.html";
            }
            $('#main .mui-media-body>i').text(backData.username);
            $('#main .mui-media-body>p>i').text(backData.mobile);
        }
    })
}
function logout() {
    $('#main>a').on('click',function () {
        $.ajax({
            url:'/user/logout',
            success:function (backData) {
                if(backData.success) {
                    window.location.href="./login.html";
                }
            }
        })
    })
}