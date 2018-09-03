/**
 * Created by Administrator on 15-9-2.
 */

String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
window.onload = function(){
   // var hichat = new HiChat();
   // hichat.init();
};

var HiChat = function(){
    this.socket = null;
};

HiChat.prototype = {
    init:function(){
        var that = this;
        console.log('before io.connect');
        this.socket = io.connect();
        console.log(this.socket);
        console.log('after io.connect');
        this.socket.emit('foo','a user is connecting... ');

        this.socket.on('connect',function(){
            $('.loginPanle .p').css('color','orange');
            $('#uName').focus();
        });
        $('#loginBtn').bind('click',function(){
            var nickName = $('#uName').value;
            if(nickName.trim().length != 0){
                that.socket.emit('login',nickName);
                $('#errormsg').html('正在登陆，请稍等...');
            }
            else{
                $('#uName').focus();
            }
        });
        $('#sendBtn').bind('click',function(){
            var msgi = $('#msgInput'),
                mg = msgi.value;
            msgi.value = '';
            if(mg.trim().length != 0){
                that.socket.emit('postMsg',mg);
                that._displayNewMsg('我：','msg','#000');
            }
        },false);

        this.socket.on('loginFail',function(){
            $('#errormsg').html('昵称已存在，请重新设置。');
        });

        this.socket.on('loginSuccess',function(){
            $('#errormsg').html('登陆成功，开始聊天。');
            $('.loginPanle').removeClass('chatEnable');
            $('.chatPanle').addClass('chatEnable');
            $('#msgInput').focus();
            $('#unName').html($('#uName').value);
        });

        this.socket.on('system',function(nickName,userCount,type){
            var msg = nickName + (type == 'login' ? '加入聊天' : '离开聊天室');
            that._displayNewMsg('系统',msg,'#000',1);
            $('#chatCounts').html(userCount);
        });

        this.socket.on('newMsg',function(user,msg){
            that._displayNewMsg(user,msg,'#000',2);
        });
    },
    _displayNewMsg:function(user,msg,color,l){
        if(l == 1){
            var container = $('#notic'),
                msgs = $('<span></span>');
            msgs.css('color',color || '#fff');
            msgs.html(user + ':' + msg);
            msgs.addClass('noticShow');
            msgs.appendTo(container);
        }
        else{
            var container = $('#historyMsg'),
                msgs = $('<p></p>'),
                obj = new Date(),
                h = obj.getHours() < 10 ? '0' + obj.getHours() : obj.getHours(),
                m = obj.getMinutes() < 10 ? '0' + obj.getMinutes() : obj.getMinutes(),
                s = obj.getSeconds() < 10 ? '0' + obj.getSeconds() : obj.getSeconds();

            msgs.css('color',color || '#fff');
            msgs.html(user + '<i>'+ h + ':' + m+ ':' + s + '</i><br >' + msg);
            msgs.appendTo(container);
            container.scrollTop = container.scrollHeight;
        }
    }
};

