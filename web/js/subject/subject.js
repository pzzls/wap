$(function () {
    if ($("#scroll_img").length > 0) sg.scroll.scroll_img();

    $("#courses").on("click", function () {
        window.location.href = "/subject/courses?sid=" + sg.common.param("id");
    });

    $(".course").on("click", function () {
        window.location.href = "/course?id=" + $(this).attr("cid");
    });

    $("#intro").html(sg.common.sections_html($("#intro").html()));

    $(".notice.content").each(function(){
        $(this).html(sg.common.sections_html($(this).html()));
    });

    $("#btn_buy").on("click", function () {
        window.location.href = "/subject/placeorder?id=" + sg.common.param("id");
    });
});