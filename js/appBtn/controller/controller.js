define(['admin_app'], function(admin_app) {
    admin_app.controller('BtnController', ['$scope', 'pubSubService',
        function($scope, pubSubService) {

            $scope.defaultText = '按钮';

        }
    ]);
});