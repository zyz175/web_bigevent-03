$(function () {
    //点击去注册，登录页面隐藏
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    //点击去登录，登录页面显示
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //自定义验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,16}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码规则
        repwd: function (value) {
            //选择器必须带空格，选择的是后代中的input，name属性值为password的那一个标签
            var pwd = $('.reg-box input[name=password]').val()
            //比较
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }

    })
    //注册功能
    $('#form_reg').on('submit', function (e) {
        //阻止表单提交
        e.preventDefault()
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //提交成功后处理代码
                layer.msg(res.message, { icon: 6 })
                //手动切换到登录表单
                $('#link_login').click()
                //重置form表单
            }
        })
    })
    //登录功能
    $('#form_login').submit(function (e) {
        //阻止表单提交
        e.preventDefault()
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                // 检验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜您，登录成功', { icon: 6 })
                //保存token未来接口要使用token
                localStorage.setItem('token', res.token)
                //跳转
                location.href = '/index.html'
            }
        })
    })
})