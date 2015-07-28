/* 
 * @Author: Hal-Mac
 * @Date:   2015-07-26 13:24:45
 * @Last Modified by:   Hal-Mac
 * @Last Modified time: 2015-07-27 23:30:24
 */

'use strict';
var albumsModule = angular.module('albumsApp', []);
var api = 'https://api.pinterest.com/v3/pidgets/boards/highquality/travel/pins';

albumsModule.service(
    'albumsService', ['$http', function($http) {

        this.GetalbumsData = function() {
            return $http.jsonp(api + '?callback=JSON_CALLBACK')
                .success(function(response) {


                })
                .error(function(data, status, headers, config) {

                });
        }
    }]);

albumsModule.controller('albumsController', ['$scope', 'albumsService', function($scope, albumsService) {

    $scope.isinline = true;
    $scope.init2 = false;
    //$scope.apidata = {};
    albumsService.GetalbumsData().then(function(response) {
        console.log(response.data.data.pins[0].images['237x'].url);
        $scope.apidata = response;
    });

    $scope.changeview = function(isinline) {
        $scope.isinline = isinline;
        if(!isinline && !$scope.init2)
        {
        	$scope.init2 = true;
        	initalbums2();
        }


    };

    function initalbums2() {
        // 先取得相關元素、區塊的寬及單一圖片的寬
        // 並算出一行能放置幾個元素
        var $block = $('.abgne-block'),
            $ul = $block.find('ul'),
            $li = $ul.find('li'),
            $img = $li.find('img'),
            _width = $block.width(),
            _imgWidth = $img.width(),
            _imgHeight = $img.height(),
            _rows = _width / _imgWidth;
        console.log($li);
        // 有幾個 li 就產生幾個新的 a.control 元素加到 $block 中
        $li.each(function(i) {
            var $this = $(this)
            $this.css({
                position: 'absolute',
                top: Math.floor(i / _rows) % _rows * _imgHeight,
                left: i % _rows * _imgWidth
            });

            var _control = $('<a href="' + $this.find('a').attr('href') + '" class="control" target="_blank"></a>').css({
                top: Math.floor(i / _rows) % _rows * _imgHeight,
                left: i % _rows * _imgWidth,
                opacity: 0
            });

            $block.append(_control);
        });
        $block.append('<div style="position: absolute; left: 0px; top: 0px; height: 721px; width: 801px; z-index: 1; opacity: 0.7; background-color: rgb(0, 0, 0);"></div>');

        // 當滑鼠移入及移出 a.control 時
        var $control = $block.find('.control').hover(function() {
            // 找到目前在 a.control 中排行
            var _index = $control.index($(this));

            // 取得相對排行的 li
            // 接著控制其座標移動及子元素 img 的寬高
            $li.eq(_index).css({
                zIndex: 99,
                top: Math.floor((Math.floor(_index / _rows) == _rows - 1 ? _index - _rows : _index) / _rows) % _rows * _imgHeight,
                left: (_index % _rows == _rows - 1 ? _index - 1 : _index) % _rows * _imgWidth
            }).find('img').css({
                width: _imgWidth * 2,
                height: _imgHeight * 2
            });
        }, function() {
            // 找到目前在 a.control 中排行
            var _index = $control.index($(this));

            // 取得相對排行的 li
            // 接著控制其座標移動及子元素 img 的寬高
            $li.eq(_index).css({
                zIndex: 9,
                top: Math.floor(_index / _rows) % _rows * _imgHeight,
                left: _index % _rows * _imgWidth
            }).find('img').css({
                width: _imgWidth,
                height: _imgHeight
            });
        });
    }
}]);
