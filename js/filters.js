/**
 * Created by Administrator on 15-7-18.
 */
var fils = angular.module('bsFilters', []);

fils.filter('timeFilter', function () {
    return function (obj) {
        var Y = obj.getFullYear();
        var Mon = obj.getMonth() + 1;
        var Day = obj.getDate();
        Mon = Mon < 10 ? '0' + Mon : Mon;
        var h = obj.getHours() < 10 ? '0' + obj.getHours() : obj.getHours();
        var m = obj.getMinutes() < 10 ? '0' + obj.getMinutes() : obj.getMinutes();
        var s = obj.getSeconds() < 10 ? '0' + obj.getSeconds() : obj.getSeconds();
        var w = obj.getDay();
        switch (w) {
            case 0:
                w = '周日';
                break;
            case 1:
                w = '周一';
                break;
            case 2:
                w = '周二';
                break;
            case 3:
                w = '周三';
                break;
            case 4:
                w = '周四';
                break;
            case 5:
                w = '周五';
                break;
            case 6:
                w = '周六';
                break;
        }
        return Y + '/' + Mon + '/' + Day + ' ' + h + ':' + m + ':' + s + ' ' + w;
    };
});