define(['admin_app'], function(admin_app) {
    admin_app.controller('AdminController', ['$scope', 'pubSubService',
        function($scope,pubSubService) {

            $scope.addPage = function(e){
                console.log('新增页面');
                pubSubService.publish('addPage', {'id': new Date().getTime()});
            };


            $scope.addImg = function(e){
                console.log('添加图片');
            };

            $scope.addText = function(e){
                console.log('添加文字');
            };


            $scope.addBtn = function(e){
                console.log('添加按钮');
            };

            $scope.save = function(e){
                console.log('保存');
            };


            $scope.addPreview = function(e){
                console.log('预览');
            };

        }
    ]);
});