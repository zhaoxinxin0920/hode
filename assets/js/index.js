//入口函数
$(function() {
    getUserInfo()


    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // headers: { Authorization: localStorage.getItem('token') },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')

                }
                renderAvatar(res.data)
            },
            // //不论成功失败最终会调用complete
            // complete: function(res) {
            //     console.log(res);
            //     //在com回调函数,可以使用res,rqjson拿到服务器响应
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败! ") {
            //         //强制清空token
            //         localStorage.removeItem('token')
            //             //强制跳转登陆页面
            //         location.href = '/login.html'
            //     }
            // }
        })
    }

    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎' + name)
        if (user.user_pic !== null) {
            //渲染图片头像隐藏文字头像
            $('.layui-nav-img').attr('scr', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            //渲染文字头像,隐藏图片头像
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        }
    }
    //退出登录
    $('#logout').on('click', function() {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清除本地存储的token
            localStorage.removeItem('token')
                //重新跳转登录页面
            location.href = '/login.html'
                //关闭confirm询问框
            layer.close(index);
        });
    })
})