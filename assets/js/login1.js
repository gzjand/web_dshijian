$(function() {
    //登录注册页面切换
    $('#link_reg').click(function(){
        $('.login-box').hide()
        $('.red-box').show()
    })
 
     $('#link_login').click(function(){
        $('.login-box').show()
        $('.red-box').hide()
    })  
    //密码6-12位验证
    let form =layui.form
    let layer=layui.layer
    form.verify({
        //密码6-12位验证
        pass: [ /^[\S]{6,12}$/ ,'密码必须6到12位，且不能出现空格'],
        redwd:function(value){
            let pwd = $('#red-box-m1').val()
            if(pwd !==value){
                return '两次密码不一致！'
            }
        }
    })
    //监听注册表单提交
    $('#form_reg').submit(function(e){
           e.preventDefault()
           let data={ username:$('#form_reg [name=username]').val(),
                      password:$('#form_reg [name=password]').val()}
           $.post('/api/reguser',data,(res)=>{
               if(res.status !==0) {
                   return layer.msg(res.message)
               }
               layer.msg('注册成功，请登录！')
               $('#link_login').click()
           })
    })
    //监听登录表单的提交事件
    $('#form_login').on('submit',(e)=>{
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status!==0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }

        })
    }) 
})