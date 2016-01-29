$(function () {
    //if (!sg.common.is_weixin()) {
    //    alert("送礼功能目前只支持微信哦~");
    //    window.location.href = "/";
    //}

    sessionStorage.removeItem("skuId");
    sessionStorage.removeItem("price");
    sessionStorage.removeItem("subjectId");

    $(".sku").on("click", function () {
        $(".sku.on .sel img").attr("src", "/img/notsel2x.png");
        $(".sku.on").removeClass("on");

        $(this).addClass("on");
        $(this).children(".sel").children("img").attr("src", "/img/sel2x.png");

        $("#total_fee").html($(this).attr("price"));

        sessionStorage.setItem("skuId", $(this).attr("id"));
        sessionStorage.setItem("price", $(this).attr("price"));
        sessionStorage.setItem("subjectId", $(this).attr("sid"));
    });

    $("#btn_submit").on("click", function () {
        var skuId = sessionStorage.getItem("skuId");
        var price = sessionStorage.getItem("price");
        var subjectId = sessionStorage.getItem("subjectId");
        var name = $("#name").val();
        var mobile = $("#mobile").val();

        if (skuId == null) {
            alert("请选择一个课程包");
        } else if (!name || name == "") {
            alert("联系人姓名不能为空");
        } else if (!mobile || mobile == "" || sg.common.is_invalid_mobile(mobile)) {
            alert("无效的手机号吗");
        } else {
            var invite = sessionStorage.getItem("invite");
            if (invite == null) invite = "";
            var order = {
                skus: [
                    {
                        id: skuId,
                        subjectId: subjectId,
                        price: price,
                        count: 1
                    }
                ],
                contact: {
                    name: name,
                    mobile: mobile
                },
                inviteCode: invite
            };

            sg.common.post(sg.config.api + "/subject/order", {
                utoken: sg.common.cookie.get("utoken"),
                order: JSON.stringify(order)
            }, sg.placeorder.success);
        }
    });
});

sg.placeorder = {
    success: function (data) {
        window.location.href = "/gift/pay?oid=" + data.id + "&count=" + data.count + "&fee=" + data.totalFee;
    }
};