define(['admin_app'], function(admin_app) {
    admin_app.controller('AdminController', ['$scope', 
        function($scope) {

            $scope.addPage = function(e){
                console.log('新增页面');
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