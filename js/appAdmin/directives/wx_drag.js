define(['admin_app', 'angular', 'jquery'], function(admin_app, angular, $) {

    admin_app.directive('ngDrag', ['$rootScope',
        function($rootScope) {
            return function(scope, el, attrs) {

                angular.element(el).attr("draggable", "true");


                var pos = {
                    top: 0,
                    left: 0,
                    clickTop: 0,
                    clickLeft: 0
                };

                el.bind("dragstart", function(e) {
                    var elPos = $(el).offset();

                    pos.clickTop = e.pageY - elPos.top;
                    pos.clickLeft = e.pageX - elPos.left;

                    e.dataTransfer.setData('dargPos', angular.toJson(pos));

                    $rootScope.$emit("LVL-DRAG-START", el);
                });

                el.bind("dragend", function(e) {

                    $rootScope.$emit("LVL-DRAG-END");
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

                    var dargPos = e.dataTransfer.getData('dargPos');
                    dargPos = angular.fromJson(dargPos);

                    dargPos.top = e.pageY;
                    dargPos.left = e.pageX;



                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    if (e.stopPropagation) {
                        e.stopPropagation(); // Necessary. Allows us to drop.
                    }


                    scope.dargPos = dargPos;
                    scope.dropped(scope.dargEl,el);


                });

                $rootScope.$on("LVL-DRAG-START", function(e, obj) {
                    scope.dargEl = obj;
                });

                $rootScope.$on("LVL-DRAG-END", function(e, pos) {});

            };
        }
    ]);




});