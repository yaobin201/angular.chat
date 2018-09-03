/**
 * Created by Administrator on 15-7-18.
 */
var bs = angular.module('bsApp', ['ui.router','ngAnimate', 'bsFilters', 'bsDirectives', 'bsControllers', 'services']);
bs.run(['$rootScope','$state','$stateParams',function($rootScope,$state,$stateParams){

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$locationChangeStart',locationChangeStart);
    $rootScope.$on('$locationChangeSuccess',locationChangeSuccess);

    $rootScope.$on('$stateChangeStart',$stateChangeStart);
    $rootScope.$on('$stateChangeSuccess',$stateChangeSuccess);

    function locationChangeStart(event){
        //console.log('locationChangeStart');
    }
    function locationChangeSuccess(event){
        //console.log('locationChangeSuccess');
    }
    function $stateChangeStart(event){
        //console.log('$stateChangeStart');
    }
    function $stateChangeSuccess(event){
        var currentState = $state.current.name;
//        console.log(currentState);
        if(currentState == 'index.about.detail' || currentState == 'index.cases.list'){
//            var vlidObj = angular.element(document.querySelector('.barbutton'));
//            var newObj = document.getElementById('barbutton');
//            newObj = $(angular.element(newObj));
//            console.log($(vlidObj).height());
//            console.log(newObj.height());
//            scrollbar.init(document.getElementById('barbutton'));
//            console.log('state change');
        }

    }

}]);
bs.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise = '/index';
    $stateProvider.state('index', {
        url: '/index',
        views: {
            'main': {templateUrl: 'tpls/main.html'},
            'top': {
                templateUrl: 'tpls/top.html',
                resolve:{
                    shares:['shares',function(shares){
                        return shares.all();
                    }]
                },
                controller:function($scope,shares){
                    $scope.shareslist  = shares;
                }
            },
            'chat':{
                templateUrl:'tpls/chat.html',
                controller:'initChat'
            }
        }
    }).state('index.about', {
        url: '/about',
        views: {
            'Panle': {
                templateUrl: 'tpls/window.about.html',
                resolve: {
                    iabout: ['abouts', function (abouts) {
                        return abouts.all();
                    }]
                },
                controller: function ($scope, $stateParams, $state, iabout) {
                    if ($stateParams.url == 'index') {
                        $state.go('index')
                    } else {
                        $scope.abouts = iabout;
                    }
                }
            }
        }
    }).state('index.about.detail', {
        url: '/:id',
        views: {
            '': {
                templateUrl: 'tpls/window.about.detail.html',
                controller: function ($scope,utils,$stateParams,$state) {
                    if(!$stateParams.id){
                        $scope.res = $state.go('index.about.detail',{id:utils.getTopId($scope.abouts)});
                    }
                    else{
                        $scope.details = utils.getById($scope.abouts,$stateParams.id);
                        var t = angular.element(document.getElementById('contextscroll'));
                        setTimeout(function(){
                            $(t).mCustomScrollbar({mouseWheel:true,advanced:{updateOnContentResize:true}});
                        },300);
                    }
                }
            }
        }
    }).state('index.cases', {
        url: "/cases",
        views:{
            'Panle': {
                templateUrl: "tpls/cases.html",
                resolve:{
                    cases:['casesclass',function(casesclass){
                        return casesclass.all();
                    }]
                },
                controller: function ($scope,cases) {
                    $scope.casesclasslist = cases;
                }
            }
        }
    }).state('index.cases.list',{
        url:'/:id',
        views:{
            '':{
                'templateUrl':'tpls/cases.list.html',
                resolve:{
                    allCases:['cases',function(cases){
                        return cases.all();
                    }]
                },
                controller:function($scope,utils,allCases,$stateParams,$state){
                    if(!$stateParams.id){
                        $scope.caseslist = utils.getByLenth(allCases,8);
                    }else if($stateParams.id == 0){
                        $state.go('index.cases.list');
                    }
                    else{
                        $scope.caseslist = utils.getByClass(allCases,$stateParams.id);
                    }
                    var t = angular.element(document.getElementById('listscroll'));
                    setTimeout(function(){
                        $(t).mCustomScrollbar({mouseWheel:true,advanced:{updateOnContentResize:true}});
                    },300);
                }
            }
        }
    });
});
