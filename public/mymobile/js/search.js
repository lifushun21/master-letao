/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */

 $(function () {
     getsearchList();
     getsearchStorage();
     searchList()
     deleteHis();
     clearhistory()
 })

function getsearchList() {
    var historydata=localStorage.getItem('historydata');
    //console.log(historydata);
    if(historydata) {
        historydata=JSON.parse(historydata);
        historydata.reverse();
    }else{
        historydata=[];
    }

        var html=template('historydatatem',{rows:historydata});
        $('#main .searchList').html(html);

}
function getsearchStorage() {
    $('.searchbox a').on('click',function() {
        //console.log($(this));
        var searchvalue=$('.searchbox form input').val().trim();
        console.log(searchvalue);
        if(!searchvalue) {
            alert('请输入商品品');
            return;
        }
        var historydata=localStorage.getItem('historydata');

        //console.log(historydata);
        if(historydata) {
            historydata=JSON.parse(historydata);
        }else{
            historydata=[];
        }
        //console.log(historydata);
        if(historydata.indexOf(searchvalue)==-1) {
            historydata.push(searchvalue);
            //console.log(historydata);
            historydata=JSON.stringify(historydata);
            //console.log(historydata);
            localStorage.setItem('historydata',historydata);
            //getsearchList();
        }
        $('.searchbox form input').val("");
        window.location.href="./searchList.html?searchvalue="+searchvalue;
    })
}

function deleteHis() {
    $('#main .searchList').on('click','.deleteHis',function (e) {
            //console.log(4)
        e.stopPropagation;
        var searchvalue=$(this).parent('.btn-search').data('search');
        var historydata=localStorage.getItem('historydata');
        historydata=JSON.parse(historydata);
        var searchindex=historydata.indexOf(searchvalue);
        //console.log(searchindex);
        historydata.splice(searchindex,1);
        historydata=JSON.stringify(historydata);
        //console.log(historydata);
        localStorage.setItem('historydata',historydata);
        console.log(historydata);
        getsearchList();
        })
}
function searchList() {
    $('#main .searchList').on('click','.btn-search',function () {
        console.log(this);
        var searchvalue=$(this).data('search');
        window.location.href="./searchList.html?searchvalue="+searchvalue;
    })
}

function clearhistory() {
    $('#main .searchope span').on('click',function () {
        console.log(this)
        localStorage.removeItem('historydata');
        historydata=localStorage.getItem('historydata');
        //console.log(historydata);
        getsearchList();
    })
}