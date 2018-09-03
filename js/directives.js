/**
 * Created by Administrator on 15-7-18.
 */
angular.module('bsDirectives',[]).directive('content',function($window){
    return {
        restrict:'EA',
        transclude:true,
        replace:true,
        scope:{},
        template:'<div id="content"><div ng-transclude></div></div>',
        link:function(scope,element,attr){
            var win = angular.element($window);
            var con = element;
            var getWinSize = function(){
                return {
                    'w':$(win).width(),
                    'h':$(win).height()
                };
            };
            scope.$watch(getWinSize,function(newValue,oldValue){
                $(con).css({'width':newValue.w,'height':newValue.h});
            },true);
            $(win).bind('resize',function(){
                scope.$apply();
            });
        }
    };
}).directive('time',function($interval){
    return {
        restrict:'E',
        replace:true,
        transclude:true,
        scope:{},
        template:'<span id="barTime">{{time | timeFilter}}</span>',
        link:function(scope,element,attr){
            scope.time=new Date();
            $interval(function(){ scope.time=new Date();},1000);
        }
    };
}).directive('empopbtn',function(){
   return {
       restrict:'E',
       replace:true,
       transclude:true,
       scope:{
           ngModel:"="
       },
       template:'<em  id="{{ngModel.id}}" >{{ngModel.name}}</em>',
       link:function(scope,element,attr){
               mtopPop = new forTopPop();
               mtopPop.clickActive(element);
       }
   };
}).directive('shares',function(){
    return {
        restrict:'E',
        replace:true,
        transclude:true,
        scope:{
            data:'='
        },
        controller:function($scope){},
        template:'<a class="{{data.class}}" ng-click="goShear()"></a>',
        link:function(scope,element,attr){
            scope.goShear = function(){
                switch (scope.data.class){
                    case 'qq':
                        var params = [
                            'url=' + scope.data.url,
                            'desc='+scope.data.desc,
                            'summary=' + scope.data.summary,
                            'site=' + scope.data.site,
                            'title=' + scope.data.title,
                            'pics='+scope.data.pic
                        ];
                        params = params.join('&amp;');
                        window.open(scope.data.http + params);
                        break;
                    case 'kj':
                        var params = [
                            'url=' + scope.data.url,
                            'summary=' + scope.data.summary,
                            'site=' + scope.data.site,
                            'title=' + scope.data.title,
                            'pics='+scope.data.pic
                        ];
                        params = params.join('&amp;');
                        window.open(scope.data.http + params, "_blank", "width=680,height=430,scrollbars=no,location=no");
                        break;
                    case 'weibo':
                        var params = [
                            'url=' + scope.data.url,
                            'appkey= '+ scope.data.appkey,
                            'title=' + scope.data.title + scope.data.summary,
                            'pics=' + scope.data.pic
                        ];
                        params = params.join('&amp;');
                        window.open(scope.data.http + params, "_blank", "width=680,height=430,scrollbars=no,location=no");
                        break;
                    case 'tx':
                        var params = [
                            'c=share',
                            'a=index',
                            'url=' + scope.data.url,
                            'appkey= '+ scope.data.appkey,
                            'title=' + scope.data.title + scope.data.summary,
                            'pics=' + scope.data.pic
                        ];
                        params = params.join('&amp;');
                        window.open(scope.data.http + params, "_blank", "width=680,height=430,scrollbars=no,location=no");
                        break;
                }

            };
        }
    }
});
