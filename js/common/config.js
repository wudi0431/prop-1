require.config({
    paths: {
        angular: 'lib/angular',
        domReady: 'lib/domReady',
        angularResource: 'lib/angular-resource'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularResource: {
            deps: ['angular']
        }
    }
});