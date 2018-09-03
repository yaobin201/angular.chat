/**
 * Created by Administrator on 15-7-28.
 */

angular.module('services',[]).factory('utils',function(){
    return {
        getById:function(obj,id){
            for(var i = 0;i<obj.length;i++){
                if(obj[i].id == id ){
                    return obj[i];
                }
            }
            return null;
        },
        getByClass:function(obj,cid){
            var res = [];
            for(var i = 0;i<obj.length;i++){
                if(obj[i].classId == cid){
                    res.push(obj[i]);
                }
            }
            return res;
        },
        getByLenth:function(obj,len){
            return obj.slice(0,len);
        },
        getFirst:function(obj){
            return obj[0];
        },
        getTopId:function(obj){
            return obj[0].id;
        }
    }
}).factory('shares',['$http',function($http){
    var mshares = {};
    var url = 'data/shares.json';
    var s = $http.get(url).then(function(resq){
        return resq.data.default;
    });
    mshares.all = function(){
        return s;
    };
    return mshares;
}]).factory('abouts',["$http","utils",function($http,utils){
    var contacts = {};
    var url = 'data/contacts.json';
    var contact = $http.get(url).then(function(resq){
        return resq.data.contacts;
    });
    contacts.getById = function(id){
        return contact.then(function(){
            return utils.getById(contact,id);
        });
    };
    contacts.all = function(){
        return contact;
    };
    return contacts;
}]).factory('casesclass',['$http','utils',function($http,utils){
    var casesclass = {};
    var url = 'data/cases.class.json';
    var cases = $http.get(url).then(function(resq){
        return resq.data;
    });
    casesclass.getById = function(id){
        return cases.then(function(){
            return utils.getById(cases,id);
        });
    };
    casesclass.all = function(){
        return cases;
    };
    return casesclass;
}]).factory('cases',['$http','utils',function($http,utils){
    var cases = {};
    var url = 'data/cases.list.json';
    var c = $http.get(url).then(function(resq){
        return resq.data;
    });
    cases.all = function(){
        return c;
    };
    return cases;
}]);