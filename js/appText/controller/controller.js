define(['admin_app'], function(admin_app) {
    admin_app.controller('PageController', ['$scope', 'pubSubService',
        function($scope, pubSubService) {
            $scope.pageList = [];
            $scope.pageSelected = '';

            pubSubService.subscribe(function(event, data) {
                $scope.pageList.push(data);
            }, null, 'addPage');



            $scope.selectPage = function(row,e) {
                $scope.selectedRow = row;
                $scope.pageSelected = $scope.pageList[row];
            };


        }
    ]);
});