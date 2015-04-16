define(['admin_app', 'angular'], function(admin_app, angular) {
    admin_app.controller('PageController', ['$scope', '$sce','pubSubService',
        function($scope,$sce, pubSubService) {
            $scope.pageList = [];
            $scope.pageSelected = '';

            pubSubService.subscribe(function(event, data) {
                if (angular.equals(data, {})) {
                    data = '';
                }
                $scope.pageList.push(data);
            }, null, 'addPage');



            pubSubService.subscribe(function(event, data) {
                $scope.pageSelected = $scope.pageSelected + '<div class="wx_admin" ng-controller="AdminController">' + '<button type="button" ng-click="addPage($event)">新增页面</button>' + '</div>';

                $scope.pageSelected = $sce.trustAsHtml($scope.pageSelected);


            }, null, 'addBtn');


            $scope.selectPage = function(row, e) {
                $scope.selectedRow = row;
                $scope.pageSelected = $sce.trustAsHtml($scope.pageList[row]);
            };


        }
    ]);
});