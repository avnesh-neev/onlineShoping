'use strict';

angular.module('onlineShopingApp')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('entity', {
                abstract: true,
                parent: 'site'
              })
            .state('admin', {
                parent: 'entity',
                url: '/admin',
                abstract: true,
            })

}]);