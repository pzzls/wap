$(function () {
    sg.bookable.more(0);
});

sg.bookable = {
    more: function (start) {
        sg.common.check_login();

        sg.common.get(sg.config.api + "/user/bookable", {
            utoken: sg.common.cookie.get("utoken"),
            start: start
        }, sg.bookable.success, sg.bookable.error);
    },

    success: function (resp) {
        if (resp.errno != 0) {
            alert(resp.errmsg);
        } else {
            var list = resp.data.list;
            if (list.length > 0) {
                unbind_scrollin();

                var html = "";
                html += "<div class='list small bottom-border'>";
                for (var i = 0; i < list.length; i++) {
                    html += generate_package_html(list[i]);
                    if (i < list.length - 1) html += "<hr class='sep' />";
                }
                html += "</div>";

                $(".content").append(html);

                if (resp.data.nextIndex != undefined) bind_scrollin(resp.data.nextIndex);
            }
        }

        function unbind_scrollin() {
            var last = $(".element:last-child");
            last.unbind("scrollin");
        }

        function generate_package_html(package) {
            var html = "";
            html += "<div class='element'>";
            html += "<a href='/subject/courses?sid=" + package.subjectId + "&pid=" + package.packageId + "'>";
            html += "<div class='left'>";
            html += "<img src='" + package.cover + "' />";
            html += "</div>";
            html += "<div class='right'>";
            html += "<div class='title overflow-hidden'>" + package.title + "</div>";
            html += "<div class='desc overflow-hidden'>" + package.expireTime + "</div>";
            html += "<div class='desc overflow-hidden'>还可约" + package.bookableCourseCount + "次课</div>";
            html += "</div>";
            html += "<div style='clear: both;'></div>";
            html += "</a>";
            html += "</div>";

            return html;
        }

        function bind_scrollin(next_index) {
            var last = $(".element:last-child");
            last.bind("scrollin", function () {
                sg.bookable.more(next_index);
            });
        }
    },

    error: function (resp) {
        alert("网络异常，请稍后再试");
    }
};