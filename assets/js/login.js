//入口函数
$(function() {
    //单机去注册事件
    $('#link_reg,#link_login').on('click', function() {
            //表单登录和注册显示与隐藏
            $('.login-box,.reg-box').toggle()
        })
        //自定义表单属性
    layui.form.verify({
            pwd: [/^[\S]{6,12}$/, ],
            repwd: function(value, item) {
                var pwd = $('.reg-box [name=password]').val().trim()
                if (pwd !== value) {
                    return ('两次不一致')
                }
            }
        })
        //注册功能
    $('#form_reg').submit(function(e) {
            // 阻止默认行为
            e.preventDefault()
                // 获得表单数据
            var data = {
                    username: $('.reg-box [name=username]').val().trim(),
                    password: $('.reg-box [name=password]').val().trim()
                }
                //发送ajax请求
            $.ajax({
                type: 'post',
                url: '/api/reguser',
                data: data,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {

                        return layui.layer.msg(es.message, { icon: 5 })
                    }
                    layui.layer.msg('注册成功', { icon: 6 }, function() {
                        $('#link_login').click()
                    })
                }
            })

        })
        //登录功能`
        // 添加submit点击事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
            //收集表单数据
        var data = $(this).serialize()
            //发送sjax请求
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                })

            },
        })
    })
})