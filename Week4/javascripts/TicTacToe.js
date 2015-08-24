/* 
 * @Author: Hal1124
 * @Date:   2015-08-22 14:41:36
 * @Last Modified by:   Hal1124
 * @Last Modified time: 2015-08-22 23:00:54
 */

'use strict';
var tictactoeModule = angular.module('tictactoeApp', []);
tictactoeModule.controller('tictactoeController', ['$scope', '$window', function($scope, $window) {
    //game win grop
    $scope.wingroup = {
        0: [0, 1, 2],
        1: [3, 4, 5],
        2: [6, 7, 8],
        3: [0, 3, 6],
        4: [1, 4, 7],
        5: [2, 5, 8],
        6: [0, 4, 8],
        7: [2, 4, 6]
    };
    $scope.Frames = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    //o or x check 
    $scope.checkedo = [];
    $scope.checkedx = [];
    $scope.isgofirst = true;
    $scope.winnerplay = null;
    //儲存o x 選取結果
    $scope.savecheck = function(item) {
        if ($scope.Frames[item] == 0 && $scope.winnerplay === null) {
            if ($scope.isgofirst) {
                $scope.Frames[item] = 1;
                $scope.checkedo.push(item);
                if (checkline($scope.checkedo))
                    $scope.winnerplay = 'o';
            } else {
                $scope.Frames[item] = 2;
                $scope.checkedx.push(item);
                if (checkline($scope.checkedx))
                    $scope.winnerplay = 'x';
            }
            $scope.isgofirst = !$scope.isgofirst;
            setTimeout(function() {
                if ($scope.winnerplay !== null) {
                    if ($window.confirm($scope.winnerplay + ' 贏得此局，是否重啟新局?')) {
                        $window.location.reload();
                    }
                }
            }, 200);
            setTimeout(function() {
                if ($scope.Frames.every(function(value, index, array) {
                        return value !== 0;
                    })) {
                    if ($window.confirm('和局，是否重啟新局?')) {
                        $window.location.reload();
                    }
                }
            }, 200);
        }
    };
    //判斷是否有人贏
    function checkline(arr) {
        //先判斷是不是已經選了3格以上
        if (arr.length >= 3) {
            var winline = $scope.wingroup;
            var result = false;
            //將選取的格子陣列合併成連續字串
            var arrstring = arr.sort().join('');
            //跑8組連線迴圈找尋是否已經連線成功
            for (var i = 0; i < 8; i++) {
                //標記選取成功格
                var checklattice = [false, false, false];

                for (var j = 0; j < winline[i].length; j++) {
                    //判斷是不是有match 格子
                    if (arrstring.match(winline[i][j]) !== null) {
                        checklattice[j] = true;
                    }
                }
                //判斷連線標記狀態
                result = checklattice.every(function(value, index, array) {
                    return value === true;
                })
                if (result) {
                    break;
                }
            }
        }
        return result;
    }
}]);
