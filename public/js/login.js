/**
 * Created by SYT on 2016-07-31.
 */
var Box=document.getElementById("Box");
var loginBox=document.getElementById("loginBox");
var zhuceBox=document.getElementById("zhuceBox");
function login(){
    Box.style.visibility="visible";
    loginBox.style.visibility="visible"
    console.log("456")
}
function switchLogin(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="hidden";
    loginBox.style.visibility="visible"
}
function switchZhuce(){
    Box.style.visibility="visible";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="visible"
}
function zhuce(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="visible"
}
function close1(){
    console.log("123")
    Box.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="hidden"
}
//huanghuang add by 2020.08.25
$(function(){
    var layer=layui.layer;
    //登录
    $('#loginBtn').click(function(){
         let user=$('#loginUser').val();
         let pwd=$('#loginPwd').val();
    if(user.trim().length==0){
        layer.alert('用户名不能为空')
    }else if(pwd.trim().length==0){
        layer.alert('密码不能为空')
    }else{
        //loading 显示
        // var index = myLoading();
        //发起请求向服务器
        $.ajax({
            type: "post",
            url: "/userLogin",
            data: "user="+user+"&pwd="+pwd,
            success: function (data) {
                // layer.close(index);
                layer.alert(data.message);
                if(data.code == 200){
                    // console.log(data);
                    //刷新页面  重新处理
                    location.reload();
                    // close1();
                    // $('#user').html('<img class="userHead" src="'+data.data[0].HeadImage+'"/><span>'+user+'</span>');
                }
            }
         })
    }
    });
    $('#zhuceBtn').click(function(){
        var obj={'Email':'邮箱','zhuceUser':'用户名','zhucePwd':'密码不能为空','resPwd':'确认密码不能为空'};
        var flag= true;
        for(var key in obj){
            if($('#'+key).val().trim().length==0){
                flag=false;
                layer.alert(obj[key]+'不能空');
                break;
            }
        }
        if(flag){
            //发起注册操作
            //loading显示
            // var index = myLoading();
            $.ajax({
                type:'post',
                url:'/reg',
                data:$('#frmReg').serialize(),
                success:function (data) {
                    // layer.close(index);
                    layer.alert(data);
                    if(data=='注册成功'){
                        switchLogin();
                    }
                }
            })
        }
    })
});

function myLoading(){
    layer.load(2, {
        shade: [0.5, '#000'],
        content: '',
        success: function (layero) {
            layero.find('.layui-layer-content').css({
                'paddingTop': '40px',
                'textAlign': 'center',
                'backgroundPositionX': 'center',
                'color': '#fff',
                'fontSize': '16px',
                'fontWeight': '700',
                'letterSpacing': '2px'
            });
        }
    });
}
