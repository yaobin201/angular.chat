/**
 * Created by Administrator on 15-7-18.
 */
angular.module('bsControllers',[]).controller('menuController',function($scope,$http){
    $scope.navs = [];
    $http({
        method:'GET',
        url:'data/mainMenu.json'
    }).success(function(data,status,headers,config){
        $scope.navs = data;
    }).error(function(data,status,headers,config){
        console.log('mainMenu error!')
    });
}).controller('topPopController',function($scope,$http){
    $scope.conn = [];
    $http({
        method:'GET',
        url:'data/connection.json'
    }).success(function(data,status,headers,config){
        $scope.conn = data;
    }).error(function(data,status,headers,config){

        }
    );
}).controller('contentviewController',function($scope){
    $scope.ischange = function(){
        console.log('view is change!');
    }
}).controller('initChat',function($scope){

    var socket = io.connect('http://ipvlink.eicp.net:8000');

    socket.on('connect',function(){
        $('.loginPanle .p').css('color','orange');
        $('#uName').focus();
    });

    $('#loginBtn').bind('click',function(){
        var nickName = $('#uName').val();
        if(nickName.trim().length != 0){
            socket.emit('login',nickName);
            $('#errormsg').html('正在登陆，请稍等...');
        }
        else{
            $('#uName').focus();
        }
    });

    $('#sendBtn').bind('click',function(){sendMsg();});
    $('#msgInput').keydown(function(event){
        if(event.ctrlKey && event.keyCode == 13){
            sendMsg();
        }
    });

    function sendMsg(){
        var msgi = $('#msgInput'),
            mg = msgi.val();
        if(mg.trim().length != 0){
            socket.emit('postMsg',mg);
            _displayNewMsg('我：',mg,'#000');
        }
        msgi.val('');
    }

    socket.on('loginFail',function(){
        $('#errormsg').html('昵称已存在，请重新设置。');
    });

   socket.on('loginSuccess',function(){
        $('#errormsg').html('登陆成功，开始聊天。');
        $('.loginPanle').removeClass('chatEnable');
        $('.chatPanle').addClass('chatEnable');
        $('#msgInput').focus();
        $('#unName').html($('#uName').val());
        $('#historyMsg').mCustomScrollbar({mouseWheel:true,advanced:{updateOnContentResize:true}});
    });

    socket.on('system',function(nickName,userCount,type){
        var msg = nickName + (type == 'login' ? '加入聊天' : '离开聊天室');
        _displayNewMsg('系统',msg,'#000',1);
        $('#chatCounts').html(userCount);
    });

    socket.on('newMsg',function(user,msg){
        _displayNewMsg(user,msg,'#000',2);
    });

    function ge(id){
        return  angular.element(document.getElementById(id));
    }
    function _displayNewMsg(user,msg,color,l){
        if(l == 1){
            var container = $('#notic'),
                msgs = $('<span></span>');
            msgs.css('color',color || '#fff');
            msgs.html(user + ':' + msg);
            msgs.addClass('noticShow');
            msgs.appendTo(container);
        }
        else{
            var container = $('#historyMsg .mCSB_container'),
                msgs = $('<div class="chat_pop"></div>'),
                obj = new Date(),
                h = obj.getHours() < 10 ? '0' + obj.getHours() : obj.getHours(),
                m = obj.getMinutes() < 10 ? '0' + obj.getMinutes() : obj.getMinutes(),
                s = obj.getSeconds() < 10 ? '0' + obj.getSeconds() : obj.getSeconds();

            msgs.css('color',color || '#fff');
            msgs.html('<span class="chat_name" >' + user + '<i class="chat_tim">'+ h + ':' + m+ ':' + s + '</i></span>' + '<p class="chat_mgs">' + msg + '</p>');
            msgs.appendTo(container);
            container.scrollTop = container.scrollHeight;
        }
    }

});