$(function () {
    if (!sg.common.is_weixin()) {
        alert("送礼功能目前只支持微信哦~");
        window.location.href = "/";
    }

    var receive = sg.common.param("receive", 0);
    if (receive == 1 && sg.common.is_login()) sg.receive.receive();

    $("#btn_receive").on("click", function () {
        if (!sg.common.is_login()) {
            alert("本新年礼包只有松果亲子的注册用户才能领取哦，您还没有登录，快去登录后再来领取吧~（未注册的用户需要先注册）");
            var current_url = window.location.href + "&receive=1";
            window.location.href = "/auth/login?ref=" + encodeURIComponent(current_url);
        } else {
            sg.receive.receive();
        }
    });
});

sg.receive = {
    receive: function () {
        var oid = sg.common.param("oid");
        sg.common.get(sg.config.api + "/subject/order/gift/status", {
            utoken: sg.common.cookie.get("utoken"),
            oid: oid
        }, function (data) {
            if (data == 1) {
                alert("您不能领取自己的礼包");
            } else if (data == 2) {
                alert("您已经领取了礼包，请按照下面的使用说明来使用哦~");
            } else if (data == 3) {
                alert("手慢了，礼包已经被别人领走了");
            } else if (data == 4) {
                alert("手慢了，礼包已经过期了");
            } else {
                var address = prompt("请输入您的收件地址\n玩具和书包将于2月15日后为您寄出", "");
                if (address) {
                    sg.common.post(sg.config.api + "/user/address", {
                        utoken: sg.common.cookie.get("utoken"),
                        address: address
                    }, function (data) {
                        var expired = sg.common.param("expired");
                        var giftsign = sg.common.param("giftsign");
                        sg.common.post(sg.config.api + "/subject/order/gift/receive", {
                            utoken: sg.common.cookie.get("utoken"),
                            oid: oid,
                            expired: expired,
                            giftsign: giftsign
                        }, function (data) {
                            if (data == true) {
                                alert("新年礼包领取成功，如何使用礼包可参考下面的[礼包使用说明]哦~");
                            } else {
                                alert("新年礼包领取失败，请与客服联系");
                            }
                        });
                    });
                } else {
                    alert("收件地址不能为空");
                }
            }
        });
    }
};