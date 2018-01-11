/**
 * Created by Administrator on 2018/1/7 0007.
 */

$(function () {
    getaddresslarge();
    editaddress();
})

function getaddresslarge() {
    //ѡ��ʡ����
    var pickerCity = new mui.PopPicker({layer: 3});
    //console.log(cityData)
    pickerCity.setData(cityData);
    $('#main .addresslarge').on('click', function () {

        setTimeout(function () {
            pickerCity.show(function(items){
                console.log(items)
                if(items[0].text==items[1].text) {
                    items[0].text='';
                }
                $('#main .addresslarge>input').val(items[0].text+items[1].text+items[1].text);
                //pickerCity.dispose();
                //return false;
            })
        },200)

    });

}

function editaddress() {
   var addressId=location.search.split('=')[1];
    //console.log(addressId);
    if(addressId) {
        $('#header>p').text('�༭�ջ��˵�ַ');
        getaddressdata(addressId);
    }
    $('#main .btn-confirm').on('click',function () {
        var data={
            recipients:$('#main .input-man>input').val(),
            postcode:$('#main .addressemail>input').val(),
            address:$('#main .addresslarge>input').val( ),
            addressDetail:$('#main .addressdeteill>input').val()
        }
        if(!data.recipients) {
            mui.toast('�������ջ���');
            return;
        }
        if(!data.postcode) {
            mui.toast('����������');
            return;
        }
        if(!data.address) {
            mui.toast('��ѡ��ʡ����');
            return;
        }
        if(!data.addressDetail) {
            mui.toast('��д��ϸ��ַ');
            return;
        }
        var editurl='/address/addAddress';
        if(addressId) {
            data.id=addressId;
            editurl='/address/updateAddress';
        }
        $.ajax({
            url:editurl,
            type:'post',
            data:data,
            success:function (backData) {
                console.log(backData);
                window.location.href="./address.html";
            }
        })
    })
}

function getaddressdata(addressId) {
    $.ajax({
        url:'/address/queryAddress',
        success:function (backData) {
            //console.log(backData)
            var addressdata=null;
            for(var i=0;i<backData.length;i++) {
                if(backData[i].id==addressId) {
                    addressdata=backData[i]
                }
            }
            //console.log(addressdata)
            $('#main .input-man>input').val(addressdata.recipients);
            $('#main .addressemail>input').val(addressdata.postCode);
            $('#main .addresslarge>input').val(addressdata.address);
            $('#main .addressdeteill>input').val(addressdata.addressDetail)
        }
    })

}