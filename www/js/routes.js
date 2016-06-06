angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('tabsController.sumExchangeRates', {
        url: '/sum',
        views: {
          'tab1': {
            templateUrl: 'templates/sumExchangeRates.html',
            controller: 'sumExchangeRatesCtrl'
          }
        }
      })

      .state('tabsController.exchangeRates', {
        url: '/exchange',
        views: {
          'tab2': {
            templateUrl: 'templates/exchangeRates.html',
            controller: 'exchangeRatesCtrl'
          }
        }
      })

      .state('tabsController.addEditRates', {
        url: '/add',
        views: {
          'tab3': {
            templateUrl: 'templates/addEditRates.html',
            controller: 'addEditRatesCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/home',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

    $urlRouterProvider.otherwise('/home/sum')
  });
