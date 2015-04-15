require.config({
    paths: {
        admin_app: 'js/appAdmin/admin_app'
    }
});

require([
        'angular',
        'admin_app',
        'domReady'
    ],
    function(angular, admin_app, domReady) {
        domReady(function() {
            angular.bootstrap(document, ['wxApp']);
        });
    }
);