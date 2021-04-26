// 入口函数
$(function() {
        // alert('ok')
        /**** 1-获取用户的基本信息 ****/
        getUserInfo()

        var layer = layui.layer
            /**** 2-退出登录 ****/
        $('#logout').on('click', function() {
            // 询问
            layer.confirm('您确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 清除本地存储中的token
                localStorage.removeItem('token')
                    // 页面跳转到登录页
                location.href = '/login.html'
                layer.close(index);
            });
        })
    })
    // 把获取用户信息和渲染用户信息的函数，放到入口函数的外面
    // 全局函数都是window对象的方法
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 请求头
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            // console.log(res) // 服务器响应回来的数据
            // 判断是否获取成功
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户信息
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // 请求成功和失败都会调用此回调函数
        //     // console.log(res) // ajax对象
        //     // console.log(res.responseJSON) // res.responseJSON服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清除token
        //         localStorage.removeItem('token')
        //         // 跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // console.log(user)
    // 获取用户的名称（有nickname就用nickname，没有就用username）
    var name = user.nickname || user.username
        // 渲染欢迎语
    $('#welcome').html('欢迎  ' + name)

    // 渲染头像（有图片头像则渲染，没有则渲染文字头像）
    if (user.user_pic !== null) {
        // 渲染图片头像，隐藏文字头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像，隐藏图片头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}