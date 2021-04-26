$(function() {
    // alert('ok')
    // 定义校验规则
    layui.form.verify({
            pwd: [
                /^[\S]{6,12}$/,
            ],
            samePwd: function(value) {
                if (value === $('[name=oldPwd]').val()) {
                    return '新旧密码不一致'
                }
            },
            rePwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码不一致'
                }
            }
        })
        //完成重置密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    $('.layui-form')[0].reset()
                })
            }
        })

    })
})