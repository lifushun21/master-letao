/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
var searchvalue=getQueryString('searchvalue');
$(function () {
    searchList({
        proName:searchvalue,
        page:1,
        pageSize:4
    });
    btnsearchList();
    productpriceList();
    var page=1;
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
                        searchList({
                            proName:searchvalue,
                            page:1,
                            pageSize:4
                        });
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        page=1;
                        // 注意重置上拉刷新的效果 如果不重置是无法拉动
                        mui('#refreshContainer').pullRefresh().refresh(true);
                    },2000)
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
                contentdown : "下拉可以刷新",
                contentrefresh : "正在加载中...",
                //contentnomore: '在下实在是给不更多',

                callback : function () {
          setTimeout(function () {
              page++;

              $.ajax({
                  url:'/product/queryProduct',
                  data:{
                      proName:searchvalue,
                      page:page,
                      pageSize:2
                  },
                  success:function (backData) {
                      //console.log(backData)
                      setTimeout(function() {

                          var counttol=backData.data.length;
                          if(counttol<=0) {
                              //console.log(1234)
                              mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                              return;
                          }
                          for(var i=0;i<backData.data.length;i++) {
                              for (var j = 0; j < backData.data[i].pic.length; j++) {
                                  var pic=backData.data[i].pic[j].picAddr.split('/');
                                  backData.data[i].pic[j].picAddr=pic[pic.length-1];
                              }

                          }
                          var html=template('searchListtem',backData);
                          $('.productList .mui-row').append(html);
                          mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                      })
                  }
              })
          },2000)

                }
            }
        }
    });
    $('.productList .mui-row').on('click','.btn-buy',function () {
        //console.log(1);
        var id=$(this).data('id');
        window.location.href="./product.html?id="+id;
    })
})
function searchList(options) {
    $.ajax({
        url:'/product/queryProduct',
        data:options,
        success:function (backData) {
            console.log(backData)
            //counttol=backData.count
            for(var i=0;i<backData.data.length;i++) {
                for (var j = 0; j < backData.data[i].pic.length; j++) {
                    var pic=backData.data[i].pic[j].picAddr.split('/');
                    backData.data[i].pic[j].picAddr=pic[pic.length-1];
                }

            }
            var html=template('searchListtem',backData);
            $('.productList .mui-row').html(html);
        }
    })
    $('#main .searchbox input').val(searchvalue);
}
function btnsearchList() {
    $('#main .searchbox .search-btn').on('tap',function() {
        searchvalue=$('#main .searchbox input').val();
        searchList({
            proName:searchvalue,
            page:1,
            pageSize:4
        });
        //$('#main .searchbox input').val('')
    })
}
function productpriceList() {
    $('.searchHeader .mui-row>a').on('tap',function() {
        var sort=$(this).data('sort');
        var type=$(this).data('type')
        $(this).siblings().find('i').removeClass().addClass('fa fa-angle-down');
        $(this).siblings().data('sort',2)
        if(sort==2) {
            sort=1;
            $(this).find('i').removeClass().addClass('fa fa-angle-up');
            $(this).data('sort',1)
        }else{
            sort=2;
            $(this).find('i').removeClass().addClass('fa fa-angle-down');
            $(this).data('sort',2)
        }
        //console.log(price);
        if(type=='price') {
            searchList({
                proName:searchvalue,
                price:sort,
                page:1,
                pageSize:4
            })
        }else if (type=='num') {
            searchList({
                proName:searchvalue,
                num:sort,
                page:1,
                pageSize:4
            })
            };
    })
};

//获取url中的参数并且解决中文乱码问题
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}




