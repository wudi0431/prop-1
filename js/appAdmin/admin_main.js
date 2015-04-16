require.config({
    paths: {
        admin_app: 'js/appAdmin/admin_app',
        admin_controller:'js/appAdmin/controller/controller',
        admin_servies:'js/appAdmin/admin_servies',
        admin_directives:'js/appAdmin/directives/wx_html'
    }
});

require([
        'domReady',
        'angular',
        'admin_app',
        'admin_servies',
        'admin_controller',
        'admin_directives',
        'page_controller',
        'btn_controller'
    ],
    function(domReady,angular) {
        domReady(function() {
            angular.bootstrap(document, ['wxApp']);
        });
    }
);