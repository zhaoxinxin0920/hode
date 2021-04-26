//入口函数
$(function() {
    initUserInfo()
        //获取用户信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.form.val('formUserInfo', res.data)
            },
        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()

    })
    layui.form.verify({
            nickname: function(value, item) {
                if (value.length > 6) {
                    return '不能超过六个字符'
                }
            }

        })
        //添加submit事件
    $('.layui-form').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault()
            //收集表单数据
        var data = $(this).serialize()
            //发送ajax请求
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: data,

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })
                window.parent.getUserInfo()
            },
        })
    })
})