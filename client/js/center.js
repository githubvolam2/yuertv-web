// if(obj=='女'){img.src="nv"}else{img.src="nan"}
$(function() {
// 个人中心的tab切换
    $("#leftmain li").off('click').on('click', function(event) {
        event.preventDefault();
        console.log($(this).index());
        $(this).addClass("rightswitchcolor").siblings().removeClass("rightswitchcolor");
        $("div.rightswitch").eq($(this).index() - 1).show().siblings().hide();
    });
//我的资料的tab切换；
    $(".m-bottom a").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("switch").siblings().removeClass("switch");
        $(".switch-content").hide().eq($(this).index()).show();
    })
    $(".m-bottom a:eq(0)").trigger("click");

// 我的道具弹出框
    $(".imgprops .u-props").off("click").on("click", function(e) {
        e.preventDefault();
        $(".u-propsgtips").show();
    });
//我的消息中的div之间的切换
        $(".m-mainm a").on("click", function(e) {
            e.preventDefault();
            $(this).addClass("focuscurrent").siblings().removeClass("focuscurrent");
            $(".mcurrent").hide().eq($(this).index()).show();
        })
    $(".m-mainm a:eq(0)").trigger("click");
//我的消息－－关注消息的划入事件
    $(".u-foucscolor").on("mouseenter", function() { $(".u-messnickname").show().css("top", $(this).position().top) })
    $(".u-foucscolor").on("mouseleave", function() { $(".u-messnickname").hide() })
       
    $("#cancel").off("click").on("click", function() {
            $(".u-topupwindow").hide();
        })
//我要当主播的div之间的切换
    $(".m-mainh a").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("").siblings().removeClass("");
        $(".switchcontent").hide().eq($(this).index()).show();
    })
    $(".m-mainh a:eq(0)").trigger("click");
//我要当主播中的下级div的切换
    $(".u-certification a").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("").siblings().removeClass("");
        $(".switchrepeat").hide().eq($(this).index()).show();
    })
    $(".u-certification a:eq(0)").trigger("click");
// 修改昵称弹出框
    $("#nickname").on("click", function() {
        $(".m-layer").addClass("z-show");
    });
    $(".lybt .u-btn").on("click", function() {
        $(this).parents(".m-layer").removeClass("z-show");
    });
 //选中支付宝
   $(".payimg").off("click").on("click",function(){$(".payimg .u-checked").hide();
   	$(".payimg .u-dischecked").show();$(this).find(".u-checked").show();$(this).find(".u-dischecked").hide();})
//我要充值－－选中鱼币的样式
    $(".u-value div").on("click", function() {
    		$(this).addClass("checktopup").siblings().removeClass("checktopup");
            window.checktopup=this;
        })
//我要充值－－－点击充值出现弹框
    $("#topupvalue").off("click").on("click", function(e) {
        e.preventDefault();  
        $(".u-wmtips").text($(window.checktopup).find(".u-vmoney").text().substr(0,$(window.checktopup).find(".u-vmoney").text().length-1));
        $(".u-topupwindow").show(); 
        $.ajax({
            method: "GET", //对于请求类型
            url: "http://localhost:3000/api/pay/recharge",
            dataType: 'json',
            data:{id:$(window.checktopup).attr("data-id")}, //这个是一个验证是否重名的接口。参数只有一个 名字
            success: function(data) {
                if (data.code == 0) { //data.code的值这个是后端人员规定的。
                    console.log("请求成功");
                    $("#tovalue").attr("href","/alipay?id="+data.object);
                  $(".u-wn span:eq(1)").text(data.object);
                    if (data.object == 1) { //1为重复
                        console.log("这个重复啦");
                    } else if (data.object == 0) {
                        console.log("这个不重复");
                    } else {
                        console.log("未知异常");
                    }
                } else if (data.code == -2) {
                    console.log("你没有权限，通常来讲，你是没有登录");
                } else if (data.code == -5) {
                    console.log("参数错误哦。");
                } else {
                    console.log(data.result);
                }
            },
            error: function(a, b, c) {
                console.log("接口出问题啦");
            }
        })
    })
   
//  // 分页插件
//  $('.M-box').pagination();
// //  $('.M-box').pagination({
// //     callback:function(index){
// //         $('.now').text(index);
// //     }
// // },function(api){
// //     $('.now').text(api.getCurrent());
// // });
//  //我的关注
// $("#myfocusclick").on('click',function(){
//     $.ajax({
//         method: "GET", //对于请求类型
//         url: "http://localhost:3000/api/person-center/my-concern",
//         dataType: 'json',
//         data: {
//             page: $.trim($("#page").val()),
//             pageSize: $.trim($("#pageSize").val())
//         }, //这个是一个验证是否重名的接口。参数只有一个 名字
//         success: function(data) {
//             if (data.code == 0) { //data.code的值这个是后端人员规定的。
//                 console.log("请求成功");
//                 var str = "";
//                 for (index in data.object.list) {
//                     str += '<div class="m-main"><div class="u-top"><h3>主播</h3></div>' +
//                         '<div class="u-host"><div class="u-hleft"><div class="u-focusimg">' +
//                         '<img src="' + data.object.list[index].icon + '"></div>' +
//                         '<div class="u-nickhost"><p class="u-nicksex"><span>' + data.object.list[index].nickname + '</span>' +
//                         '<img src="' + data.object.list[index].sex + '"></p><div class="u-hostfans"><p>' +
//                         '<span class="u-hf">直播间ID</span>&nbsp;  ' +
//                         '<span class="u-num">' + data.object.list[index].room_number + '</span></p>' +
//                         '<p class="u-hhf"><span class="u-hf">粉丝</span>&nbsp;' +
//                         '<span class="u-num">' + data.object.list[index].fans + '</span></p></div>' +
//                         '</div></div><div class="u-hright"><img src="/images/focusclick.png">' +
//                         '<a href="' + data.object.list[index].room_number + '">进入房间</a></div></div>'
//                 }
//                 if (data.object.total == 0) {

//                 } else if (data.object.total < 6) {
//                     for (index in data.object.list) {
                       
//                     }
//                 } else {
                    
//                 }
//                 if (data.object == 1) { //1为重复
//                     console.log("这个重复啦");
//                 } else if (data.object == 0) {
//                     console.log("这个不重复");
//                 } else {
//                     console.log("未知异常");
//                 }
//             } else if (data.code == -2) {
//                 console.log("你没有权限，通常来讲，你是没有登录");
//             } else if (data.code == -5) {
//                 console.log("参数错误哦。");

//             } else {
//                 console.log(data.result);
//             }
//         },
//         error: function(a, b, c) {
//             console.log("接口出问题啦");
//         }
//     })
// })
// //我的消息
// $("#mymessageclick").on('click',function(){
//     $.ajax({
//             method: "GET", //对于请求类型
//             url: "http://localhost:3000/api/person-center/my-msg",
//             dataType: 'json',
//             data: {
//                 page: $.trim($("#page").val()),
//                 pageSize: $.trim($("#pageSize").val()),
//                 type: $.trim($("#type").val()),
//             }, //这个是一个验证是否重名的接口。参数只有一个 名字
//             success: function(data) {
//                 if (data.code == 0) { //data.code的值这个是后端人员规定的。
//                     console.log("请求成功");
//                     var str = "";
//                     for (index in data.object.list) {
//                         str += '<div class="m-mainm">' +
//                             '<div class="u-m-top">' +
//                             '<a href="">系统消息</a>' +
//                             '<a href="">关注消息</a>' +
//                             '</div>' +
//                             '<div class="u-systemmessage mcurrent">' +
//                             '<div class="u-message">' +
//                             '<div class="u-msystem">' +
//                             '<img src="/images/messagehead.png">' +
//                             '</div>' +
//                             '<div class="u-yuer">' +
//                             '<p>' +
//                             '<h3>' + data.object.list[index].title + '</h3>' +
//                             '<span class="u-messagetime">' + data.object.list[index].create_date + '</span>' +
//                             '<p>' +
//                             '<p>' +
//                             '<span class="u-messagecontent"></span><span class="u-messtips">' + data.object.list[index].obj_id + '</span>' +
//                             '</p>' +
//                             '</div>' +
//                             '</div>'
//                     }
//                     if (data.object.total == 0) {

//                     } else if (data.object.total < 11) {
//                         for (index in data.object.list) {
//                             console.log("内容是" + data.object.list[index].content);
//                             console.log("时间是" + data.object.list[index].create_date);
//                             console.log("消息id是" + data.object.list[index].id);
//                             console.log("目标id是" + data.object.list[index].obj_id);
//                             console.log("标题是" + data.object.list[index].title);
//                         }
//                     } else {

//                     }
//                     if (data.object == 1) { //1为重复
//                         console.log("这个重复啦");
//                     } else if (data.object == 0) {
//                         console.log("这个不重复");
//                     } else {
//                         console.log("未知异常");
//                     }
//                 } else if (data.code == -2) {
//                     console.log("你没有权限，通常来讲，你是没有登录");
//                 } else if (data.code == -5) {
//                     console.log("参数错误哦。");

//                 } else {
//                     console.log(data.result);
//                 }
//             },
//             error: function(a, b, c) {
//                 console.log("接口出问题啦");
//             }
//     })
//  })


});
;(function(window,$,undefined){
    local={
        updatePasswordTag_current:false,
        updatePasswordTag_new:false,
        updatePasswordTag_confirm:false,
        iphoneAuth:false,
        init : function(){
            local.eventBind();
        },
        eventBind : function(){            
            $("#u-current").off().on("blur",function(){
                local.updatePasswordTag_current=false;
                $("#u-current").parent().find("span").each(function(){
                    if($(this).attr("class").indexOf("u-verifypassword") != -1){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                });
                $.ajax({
                    method: "GET",
                    url: "http://localhost:3000/api/person-center/is-password-right",
                    dataType: 'json',
                    data: {
                        password: $("#u-current").val()
                    },
                    success: function(data) {
                        if (data.code == 0) {
                            local.updatePasswordTag_current=true;
                            $("#u-current").parent().find("span").each(function(){
                                if($(this).attr("class").indexOf("u-rightpassword") != -1){
                                    $(this).show();
                                }else{
                                    $(this).hide();
                                }
                            });
                        }else if(data.code == 2){
                            $("#u-current").parent().find("span").each(function(){
                                if($(this).attr("class").indexOf("u-failpassword") != -1){
                                    $(this).show();
                                }else{
                                    $(this).hide();
                                }
                            });
                        }else{
                            console.log(data.result);
                        }
                    },
                    error: function(a, b, c) {
                        console.log("接口出问题啦");
                    }
                })
            });
            $("#u-new").off().on("blur",function(){
                local.updatePasswordTag_new=false;
                if(local.updatePasswordTag_confirm==true){
                    $("#u-confirm").trigger("blur")
                }
                if($(this).val()<=6){
                    $("#u-new").parent().find("span").each(function(){
                        if($(this).attr("class").indexOf("u-vpassword") != -1){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });
                }else{
                    local.updatePasswordTag_new=true;
                    $("#u-new").parent().find("span").each(function(){
                            $(this).hide();
                    });
                }
            });
            $("#u-confirm").off().on("blur",function(){
               local.updatePasswordTag_confirm=false;
               if($(this).val() === $("#u-new").val()){
                    local.updatePasswordTag_confirm=true;
                    $("#u-confirm").parent().find("span").each(function(){
                        if($(this).attr("class").indexOf("u-rightpassword") != -1){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });
                }else{
                    $("#u-confirm").parent().find("span").each(function(){
                        if($(this).attr("class").indexOf("u-failpassword") != -1){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });
                }
            });
            $("#send").off().on("click",function(){
                if(local.updatePasswordTag_current && local.updatePasswordTag_new &&local.updatePasswordTag_confirm){
                    $.ajax({
                        method: "GET",
                        url: "http://localhost:3000/api/person-center/update-password",
                        dataType: 'json',
                        data: {
                            oldPassword:$("#u-current").val(),
                            password: $("#u-new").val()
                        },
                        success: function(data) {
                            if (data.code == 0) {
                                $(".m-psuccess").show();
                            }else if(data.code == 1){
                                alert("更新失败");//没找到你的弹窗
                            }else if(data.code == 2){
                                alert("密码错误");//没找到你的弹窗
                            }else{
                                console.log(data.result);
                            }
                        },
                        error: function(a, b, c) {
                            console.log("接口出问题啦");
                        }
                    })
                }
            });
            $(".m-psuccess").off().on("click",function(e){
                e.preventDefault();
                $(this).hide();
                window.location.href = window.location.href;
            })
            $("#number").on("focus",function(){
                $("#gainnumber").show();
            });
            $("#gainnumber").off().on("click",function(){
                if(($("#number").val().length == 11) && (/^(13|15|17|18){1}[0-9]{9}$/.test($("#number").val()))){
                    // $(this).hide();
                    $(".m-mask").show().find(".pic-code img").attr("src","http://localhost:3000/api/checkCode?phone="+$("#number").val() + '&phoneCache=' + new Date());
                } else {
                     alert("手机号不合法");//没找到你的弹框
                }
            });
            $(".m-mask .changePic").off().on("click",function(){
                $(".m-mask .pic-code img").attr("src","http://localhost:3000/api/checkCode?phone="+$("#number").val());
            });
            $(".m-mask .confirm").off().on("click",function(event){
                event.preventDefault();
                $.ajax({
                    method: "GET",
                    url: "http://localhost:3000/api/sendSMSCode",
                    dataType: 'json',
                    data: {
                        imgCheckCode:$(".m-mask .m-input input").val(),
                        mobile:$("#number").val(),
                    },
                    success: function(data) {
                        if(data.code == 0){
                            $(".m-mask").hide();
                        }else{
                            $(".m-mask .changePic").trigger("click");
                            alert(data.result);//这个先这样用，后台应该是文档写的有问题
                        }
                    },
                    error: function(a, b, c) {
                        console.log("接口出问题啦");
                    }
                });
            });
            $(".m-mask .cancel").off().on("click",function(){
                $(".m-mask").hide();
            });
            $("#userbox").off().on("click",function(){
                if($("#verify").val()!="" && $("#number").val()!=""){
                    $.ajax({
                        method: "GET",
                        url: "http://localhost:3000/api/person-center/mobile-auth",
                        dataType: 'json',
                        data: {
                            checkCode:$("#verify").val(),
                            mobile:$("#number").val(),
                        },
                        success: function(data) {
                            if (data.code == 0) {
                                alert("认证成功");//没找到你的弹框
                                window.location.href=window.location.href;
                            }else if(data.code == 1){
                                alert("更新失败");//没找到你的弹窗
                            }else if(data.code == 2){
                                alert("手机号已被绑定");//没找到你的弹窗
                            }else if(data.code == 3){
                                alert("已绑定手机号");//没找到你的弹窗
                                window.location.href=window.location.href;
                            }else if(data.code == 4){
                                $("#verify").parent().find("span").each(function(){
                                    if($(this).attr("class").indexOf("error-tip") != -1){
                                        $(this).show();
                                    }else{
                                        $(this).hide();
                                    }
                                });
                            }else{
                                console.log(data.result);
                            }
                        },
                        error: function(a, b, c) {
                            console.log("接口出问题啦");
                        }
                    })
                }
            });
            $("#verify").off().on("focus",function(){
                $(this).parent().find("span").each(function(){
                        $(this).hide();
                });
            });
            $("#checktips").off().on("focus",function(){
                $(this).parent().find("span").each(function(){
                        $(this).hide();
                });
            });
            $(".lybt button").off().on("click",function(){
                $.ajax({
                        method: "GET",
                        url: "http://localhost:3000/api/person-center/update-nickname",
                        dataType: 'json',
                        data: {
                            nickname:$("#checktips").val()
                        },
                        success: function(data) {
                            if (data.code == 0) {
                                alert("认证成功");//没找到你的弹框
                                // window.location.href=window.location.href;
                                window.reload(true);
                            }else if(data.code == 1){
                                alert("更新失败");//没找到你的弹窗
                            }else if(data.code == 2){
                                $("#retips").show();
                            }else if(data.code == 3){
                                alert("昵称只能免费修改一次");//没找到你的弹窗
                            }else{
                                console.log(data.result);
                            }
                        },
                        error: function(a, b, c) {
                            console.log("接口出问题啦");
                        }
                    })
            })
        },
    };
    local.init();
})(window,jQuery);