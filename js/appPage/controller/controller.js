define(['admin_app', 'angular'], function(admin_app, angular) {
    admin_app.controller('PageController', ['$scope', '$sce', '$compile', 'pubSubService',
        function($scope, $sce, $compile, pubSubService) {
            $scope.pageList = [];
            $scope.pageSelected = '';

            pubSubService.subscribe(function(event, data) {
                if (angular.equals(data, {})) {
                    data = '';
                }
                $scope.pageList.push(data);
            }, null, 'addPage');



            pubSubService.subscribe(function(event, data) {
                $scope.pageSelected = $scope.pageSelected 
                + '<div class="wx_btn_warp" ng-controller="BtnController">' 
                + '<button type="button">{{defaultText}}</button>' 
                + '</div>';


                $scope.pageList[$scope.selectedRow] = $scope.pageSelected;

            }, null, 'addBtn');


            $scope.selectPage = function(row, e) {
                $scope.selectedRow = row;
                $scope.pageSelected = $scope.pageList[row];
            };


        }
    ]);
});