require.config({
    paths: {
        admin_app: 'js/appAdmin/admin_app',
        admin_controller:'js/appAdmin/controller/controller'
    }
});

require([
        'angular',
        'admin_app',
        'admin_controller',
        'domReady'
    ],
    function(angular, admin_app, admin_controller,domReady) {
        domReady(function() {
            angular.bootstrap(document, ['wxApp']);
        });
    }
);