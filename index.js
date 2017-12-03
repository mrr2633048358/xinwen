/*$(function () {
    let myScroll = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
    });
    $.ajax({
        url:'http://api.jisuapi.com/news/channel?appkey=fe2a29e929bf5cc5',
        dataType:'jsonp',
        success:function (res) {
            let arr=res.result;
            console.log(arr);
            let str=''
            arr.forEach((val,index)=>{
                if(index==0){
                    str+=`<li class="active">${val}</li>`
                }else{
                    str+=`<li>${val}</li>`
                }
            })
            $('#scroller ul').html(str);
            $.ajax({
                url:'http://api.jisuapi.com/news/get?channel='+$('#scroller li.active').text()+'&start=0&num=10&appkey=fe2a29e929bf5cc5',
                dataType:'jaonp',
                success:function (res) {
                    let arr = res.result.list;
                    console.log(arr);
                    let str = "";
                    arr.forEach(val => {
                        if(val.pic == ""
                )
                    {
                        str += `<li class="list">
                                <a href="${val.url}">
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                    }
                else
                    {
                        str += `<li class="list">
                                <a href="${val.url}">
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;
                    }
                })
                }
            })
        }
    })
})*/






$(function () {
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false});
})
//加载过渡动画
$(document).ajaxSend(function(){
    $("#gd").show();
});
$(document).ajaxSuccess(function(){
    $("#gd").hide();
});
// 封装添加新闻函数
function render(type,repaint=true,start=0) {
    $.ajax({
        url:"https://api.jisuapi.com/news/get?channel="+type+"&start="+start+"&num=10&appkey=6b54d90d60aab77d",
        dataType:'jsonp',
        success:function (res) {
            let arr = res.result.list;
            let str = "";
            arr.forEach(val=>{
                if(val.pic ==""){
                str += `<li class="list nopic">
                                <a href="${val.url}">
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
            }else
            {
                str += `<li class="list">
                                <a href="${val.url}">
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="right">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;
            }
        })
            if(repaint) {
                $('.listBox').html(str);
            }else {
                $('.listBox').html($('.listBox').html()+str);

            }
        }
    })
}

//获取新闻频道
$.ajax({
    url:'https://api.jisuapi.com/news/channel?appkey=6b54d90d60aab77d',
    dataType:'jsonp',
    success:function (res) {
        let arr = res.result;
        console.log(arr);
        let str = "";
        arr.forEach((val, index) => {
            if(index==0){
            str += `<li class="active">${val}</li>`;
        }
    else
        {
            str += `<li>${val}</li>`
        }
    })
        $('#scroller ul').html(str);
        render($('#scroller li.active').text());
    }
})
// 点击栏目切换新闻
console.log($('#scroller ul').find('active'));
$('#scroller ul').on('click','li',function () {
    if($(this).hasClass('active')){
        return;
    }
    $(this).siblings().removeClass('active').end().addClass('active');
    let text=$(this).html();
    render(text);
})
// 点击加载更多
$('#add').click(function () {
    render($('#scroller li.active').html(),false,$(".content").children("li").length);
})
