require.config({
    paths: {
        jquery:'lib/jquery',
        angular: 'lib/angular',
        domReady: 'lib/domReady',
        angularResource: 'lib/angular-resource'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        jquery:{
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        }
    }
});