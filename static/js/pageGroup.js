$(function(){
    //根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
    //每页显示条数10条
    var show_per_page = 10;
    //获取页面总条数
    var number_of_items = $('.news').children().size();
    // console.log(number_of_items);
    //求出需要几页
    var pageCount = Math.ceil(number_of_items/show_per_page);
    // console.log(pageCount);
    $('.page-total-info .toggle-num b').text(pageCount);
    //隐藏所有需要分页的内容
    $('.news').children().css('display', 'none');
    //将从0到默认显示条数的记录显示
    $('.news').children().slice(0, show_per_page).css('display', 'block');
    //给默认隐藏的input赋值(起始页，当前页，每页显示个数，结束页)
    $('#start_page').val(0);
    $('#current_page').val(0);
    $('#show_per_page').val(show_per_page);
    $('#end_page').val(pageCount);
    //生成分页按钮
    if(pageCount>5){
        page_icon(1,5,0);
    }else{
        page_icon(1,pageCount,0);
    }
    //点击分页按钮触发
    $(document).on("click","#pageGro li",function(){
        var pageNum = parseInt($(this).html())-1;//获取当前点击页数-1
        console.log(pageNum);
        var page = pageNum +1;//获取当前点击页数
        var show_per_page = parseInt($('#show_per_page').val());
        //获取当前显示页面条数的起始位置
         start_from = pageNum * show_per_page;
        //获取当前显示页面条数的结束位置
        end_on = start_from + show_per_page;
        //隐藏所有内容只显示start_from到end_on下面的内容
        $('.news').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
        if(pageCount > 5){
            //当超过5条的时候传值点击的当前页面数和页面总条数
            pageGroup(page,pageCount);
        }else{
            $(this).addClass("on");
            $(this).siblings("li").removeClass("on");
        }
    });
    //点击上一页的时候
    $("#pageGro .pageUp").click(function(){
        var pageNum = parseInt($("#pageGro li.on").html());//首先获取到当前class为on页面的值
        if (pageNum <= 1) {
            var page = pageNum;
        }else{
            var page = pageNum-1;
        }
        var show_per_page = parseInt($('#show_per_page').val());

        //获取当前显示页面条数的起始位置
         start_from = page * show_per_page - show_per_page;

        //获取当前显示页面条数的结束位置
        end_on = start_from + show_per_page;

        //隐藏所有内容只显示start_from到end_on下面的内容
        $('.news').children().css('display', 'none').slice(start_from,end_on).css('display', 'block');
        if(pageCount > 5){
            pageUp(pageNum,pageCount);
        }else{
            var index = $("#pageGro ul li.on").index();//获取当前带on元素的索引
            if(index > 0){
                $("#pageGro li").removeClass("on");//移除当前元素的class
                $("#pageGro ul li").eq(index-1).addClass("on");//给比它小1的索引值就上class
            }
        }
    });
    //点击下一页的时候
    $("#pageGro .pageDown").click(function(){
        var pageNum = parseInt($("#pageGro li.on").html());//首先获取到当前class为on页面的值
        var page = pageNum;
        if (pageNum===pageCount) {
            page = pageNum-1;
        }
        var show_per_page = parseInt($('#show_per_page').val());
        //获取当前显示页面条数的起始位置
        start_from = page * show_per_page;

        //获取当前显示页面条数的结束位置
        end_on = start_from + show_per_page;

        //隐藏所有内容只显示start_from到end_on下面的内容
        $('.news').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
        if(pageCount > 5){
            pageDown(pageNum,pageCount);
        }else{
            var index = $("#pageGro ul li.on").index();

            if(index+1 < pageCount){
                $("#pageGro li").removeClass("on");
                $("#pageGro ul li").eq(index+1).addClass("on");
            }
        }
    });
    //点击跳转页的时候
    $('#pageGro .link-page .pageHerf').click(function() {
        var hrefVal = parseInt($(this).siblings('input').val());
        if(hrefVal < 1) {
            return false;
        }
        if(hrefVal > pageCount) {
            return false;
        }
        var page = hrefVal;
        var show_per_page = parseInt($('#show_per_page').val());
        //获取当前显示页面条数的起始位置
        start_from = page * show_per_page - show_per_page;
        //获取当前显示页面条数的结束位置
        end_on = start_from + show_per_page;
        //隐藏所有内容只显示start_from到end_on下面的内容
        $('.news').children().css('display', 'none').slice(start_from,end_on).css('display', 'block');
        if(pageCount > 5){
            pageGroup(page,pageCount);
        }
    });
    //点击起始页的时候
    $(document).on("click","#pageGro .pagestart",function(){
        var pageNum = $('#start_page').val();
        start_from = pageNum * show_per_page;
        end_on = start_from + show_per_page;
        $('.news').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
        if (pageCount > 5) {
            pageGroup(1,pageCount);
        }else{
            var index = $("#pageGro ul li.on").index();
            if(index < pageCount){
                $("#pageGro li").removeClass("on");
                $("#pageGro ul li:first").addClass("on");
            }
        }
    });
    //点击结束页的时候
    $(document).on("click","#pageGro .pageend",function(){
        var pageNum1 = $('#end_page').val();
        var pagenum = pageNum1-2
        var page = pageNum1-1;
        start_from = page * show_per_page;
        end_on = start_from + show_per_page;
        $('.news').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
        if (pageCount > 5) {
            pageGroup(pagenum,pageNum1);
            $("#pageGro ul li:last-child").addClass("on").siblings().removeClass("on");
        }else{
            var index = $("#pageGro ul li.on").index();
            if(index < pageCount){
                $("#pageGro li").removeClass("on");
                $("#pageGro ul li:last-child").addClass("on");
            }
        }
    });
    //当前页
    var nowPage = 1;
    // 数字点击
    $(document).on('click', '.pageList li', function() {
        nowPage  = $(this).text();
        $('#pageGro .link-page input').val('');
        $('.page-total-info .now-num b').text(nowPage);
    })
    //上一页
    $(document).on('click', '.pageUp', function() {
        nowPage--;
        $('#pageGro .link-page input').val('');
        $('.page-total-info .now-num b').text(nowPage);
        if(nowPage < 1) {
            nowPage = 1;
            $('.page-total-info .now-num b').text(nowPage);
            return false;
        }
    })
    //下一页
    $(document).on('click', '.pageDown', function() {
        nowPage++;
        $('#pageGro .link-page input').val('');
        $('.page-total-info .now-num b').text(nowPage);
        if(nowPage > pageCount) {
            nowPage = pageCount;
            $('.page-total-info .now-num b').text(nowPage);
            return false;
        }
    })
    //首页
    $(document).on('click', '.pagestart', function() {
        nowPage = 1;
        $('.page-total-info .now-num b').text(nowPage);
        $('#pageGro .link-page input').val('');
    })
    //尾页
    $(document).on('click', '.pageend', function() {
        nowPage = pageCount;
        $('.page-total-info .now-num b').text(nowPage);
        $('#pageGro .link-page input').val('');
    })
    //跳转点击
    $(document).on('click', '.link-page .pageHerf', function() {
        var hrefVal = parseInt($(this).siblings('input').val());
        nowPage = hrefVal;
        $('.page-total-info .now-num b').text(nowPage);
    })
});

//点击跳转页面
function pageGroup(pageNum,pageCount){
    switch(pageNum){
        case 1:
            page_icon(1,5,0);
        break;
        case 2:
            page_icon(1,5,1);
        break;
        case pageCount-1:
            page_icon(pageCount-4,pageCount,3);
        break;
        case pageCount:
            page_icon(pageCount-4,pageCount,4);
        break;
        default:
            page_icon(pageNum-2,pageNum+2,2);
        break;
    }
}

//根据当前选中页生成页面点击按钮
function page_icon(page,count,eq){
    var ul_html = "";
    for(var i=page; i<=count; i++){
        ul_html += "<li>"+i+"</li>";
    }
    $("#pageGro ul").html(ul_html);
    $("#pageGro ul li").eq(eq).addClass("on");
}

//点击上一页的方法
function pageUp(pageNum,pageCount){
    switch(pageNum){
        case 1:
        break;
        case 2:
            page_icon(1,5,0);
        break;
        case pageCount-1:
            page_icon(pageCount-4,pageCount,2);
        break;
        case pageCount:
            page_icon(pageCount-4,pageCount,3);
        break;
        default:
            page_icon(pageNum-2,pageNum+2,1);
        break;
    }
}

//点击下一页的方法
function pageDown(pageNum,pageCount){
    switch(pageNum){
        case 1:
            page_icon(1,5,1);
        break;
        case 2:
            page_icon(1,5,2);
        break;
        case pageCount-1:
            page_icon(pageCount-4,pageCount,4);
        break;
        case pageCount:
        break;
        default:
            page_icon(pageNum-2,pageNum+2,3);
        break;
    }
}

