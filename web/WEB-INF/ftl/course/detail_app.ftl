<@override name="title">课程介绍</@override>

<@override name="css">
    <link rel="stylesheet" type="text/css" href="/css/course/detail.css">
</@override>

<@override name="body">
    <@block name="header" ></@block>
    <div class="content"><div class="detail">${detail.detail}</div></div>
</@override>

<@extends name="../base.ftl"/>
