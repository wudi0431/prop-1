define(['admin_app'], function(admin_app) {
    admin_app.controller('PageController', ['$scope','pubSubService',
        function($scope,pubSubService) {
            $scope.pageList = [];
              pubSubService.subscribe(function(event, data) {
                $scope.pageList.push(data);
             },  null, 'addPage');
        }
    ]);
});