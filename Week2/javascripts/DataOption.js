/* 
 * @Author: Hal-Mac
 * @Date:   2015-07-30 21:56:40
 * @Last Modified by:   Hal1124
 * @Last Modified time: 2015-08-04 11:28:40
 */

'use strict';
var dataOptionModule = angular.module('dataOptionApp', []);

dataOptionModule.controller('dataOptionController', ['$scope', '$window',
    function($scope, $window) {
        //訂票人，人數，訂票金額，訂票日期，電話，Email，位置
        $scope.data = {
            name: '',
            haves: '',
            money: '',
            reserveDatetime: '',
            phone: '',
            email: '',
            point: '',
            isEdit: false,
            isDelete: false
        };

        $scope.dataListTemp = [];
        $scope.dataList = [];



        $scope.isAdd = false;
        $scope.isList = true;
        $scope.isname = false;
        $scope.ishaves = false;
        $scope.ismoney = false;
        $scope.isreserveDatetime = false;
        $scope.keyword = '';

        $scope.changePage = function(changeid) {
            if (changeid === 1) {
                $scope.isAdd = true;
                $scope.isList = false;
            } else if (changeid === 2) {
                $scope.isAdd = false;
                $scope.isList = true;
            }



            $(document).off('click', '.tabletitle');

            // $(document).on('click', '.tabletitle', function(event) {
            //     $window.reOn(this);
            // });
        }
        $scope.Add = function(dataitem) {
            console.log(dataitem);

            $scope.dataList.push({
                name: dataitem.name,
                haves: dataitem.haves,
                money: dataitem.money,
                reserveDatetime: dataitem.reserveDatetime,
                phone: dataitem.phone,
                email: dataitem.email,
                point: dataitem.point,
                isEdit: false
            });
            $scope.dataListTemp = $scope.dataList;
        };
        $scope.editData = function(item, isUpdate) {
            item.isEdit = isUpdate;
        };
        $scope.deleteData = function() {
            var datalist = $scope.dataList;
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].isDelete) {
                    datalist.splice(i, 1);
                }
            }
            $scope.dataList = datalist;
            $scope.dataListTemp = datalist;
        };
        //排序
        $scope.Sort = function(elm) {
            $('.tabletitle').children('span').removeAttr('class').addClass('glyphicon');
            switch (elm) {
                case 0:
                    if (!$scope.isname) {
                        $scope.isname = true;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderBy(function(x) {
                                return x.name
                            })
                            .ToArray();
                    } else {
                        $scope.isname = false;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderByDescending(function(x) {
                                return x.name
                            })
                            .ToArray();
                    }
                    break;
                case 1:
                    if (!$scope.ishaves) {
                        $scope.ishaves = true;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderBy(function(x) {
                                return parseInt(x.haves)
                            })
                            .ToArray();
                    } else {
                        $scope.ishaves = false;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderByDescending(function(x) {
                                return parseInt(x.haves)
                            })
                            .ToArray();
                    }
                    break;
                case 2:
                    if (!$scope.ismoney) {
                        $scope.ismoney = true;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderBy(function(x) {
                                return parseInt(x.money)
                            })
                            .ToArray();
                    } else {
                        $scope.ismoney = false;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderByDescending(function(x) {
                                return parseInt(x.money)
                            })
                            .ToArray();
                    }
                    break;
                case 3:
                    if (!$scope.isreserveDatetime) {
                        $scoepe.isreserveDatetime = true;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderBy(function(x) {
                                return x.reserveDatetime
                            })
                            .ToArray();
                    } else {
                        $scope.isreserveDatetime = false;
                        $scope.dataList = Enumerable.From($scope.dataList)
                            .OrderByDescending(function(x) {
                                return x.reserveDatetime
                            })
                            .ToArray();
                    }
                    break;
            }

        };

        $scope.serach = function() {
            
            if ($scope.keyword === '') {
                $scope.dataList = $scope.dataListTemp;
            } else {
                var sd = Enumerable.From($scope.dataList)
                    .Where(function(x) {
                        return parseInt(x.haves) == parseInt($scope.keyword)
                    }).ToArray();
                $scope.dataList = sd;
            }

        };
    }
]);
