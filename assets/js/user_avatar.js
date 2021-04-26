$(function() {
    // 1.1 获取裁剪区域的 元素对象
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)
        //点击上床
    $('#btnChooseImage').on('click', function() {
            $('#file').click()
        })
        //选择新图片更换
    $('#file').on('change', function(e) {
            var fileList = e.target.files
            if (fileList.length === 0) {
                return layui.layer.msg('请选择图片')
            }
            // 1. 拿到用户选择的文件
            var file = fileList[0]
                // 2. 将文件，转化为路径
            var newImgURL = URL.createObjectURL(file)
                // 3. 重新初始化裁剪区域
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域

        })
        //上传头像
    $('#btnUpload').on('click', function() {
        var fileList = $('#file')[0].files
        if (fileList.length === 0) {
            return layui.layer.msg('请选择头像')
        }
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            //调接口
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                //console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layer.msg(res.message, { icon: 6 }, function() {
                    //更换头像
                    window.parent.getUserInfo()
                })

            }
        })
    })
})