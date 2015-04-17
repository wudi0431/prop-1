define(['admin_app', 'angular', 'jquery'], function(admin_app, angular, $) {

    admin_app.directive('ngDrag', ['$rootScope',
        function($rootScope) {
            return function(scope, el, attrs) {

                angular.element(el).attr("draggable", "true");


                var pos = {
                    top: 0,
                    left: 0
                };

                el.bind("dragstart", function(e) {
                    $rootScope.$emit("LVL-DRAG-START", el);
                });

                el.bind("dragend", function(e) {

                    //TODO 莫名问题，待修复
                    pos.top = e.pageY - $(el).height();
                    pos.left = e.pageX;


                    $rootScope.$emit("LVL-DRAG-END", pos);
                });
            };
        }
    ]);

    admin_app.directive('ngDropTarget', ['$rootScope',
        function($rootScope) {
            return function(scope, el, attrs) {


                el.bind("dragover", function(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
                    return false;
                });


                el.bind("drop", function(e) {

                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    if (e.stopPropagation) {
                        e.stopPropagation(); // Necessary. Allows us to drop.
                    }

                    setTimeout(function() {

                        scope.dropped(scope.dargEl,el);

                    }, 10);


                });

                $rootScope.$on("LVL-DRAG-START", function(e, obj) {
                    scope.dargEl = obj;
                });

                $rootScope.$on("LVL-DRAG-END", function(e, pos) {
                    scope.dargPos = pos;
                });

            };
        }
    ]);




});