angular.module('app.controllers', [])

  .controller('sumExchangeRatesCtrl', function ($scope, ConfigService) {

    $scope.calculate = function () {
      $scope.remains = this.total;
      angular.forEach($scope.exchangeRates, function (exchange, key) {
        $scope.remains -= exchange.amount / exchange.rate;
      });
    };

    $scope.reload = function(){
      $scope.baseCurrency = ConfigService.getBaseCurrency();
      $scope.exchangeRates = ConfigService.getExchangeRates();
    };
    $scope.reload();

    $scope.reset = function () {
      $scope.total = '';
      $scope.remains = 0;
    };

    $scope.$on('ExchangeRatesChanged', function () {
      $scope.reload();
    });
  })

  .controller('exchangeRatesCtrl', function ($scope, $rootScope, ConfigService) {
    $scope.init = function() {
      $scope.exchangeRates = ConfigService.getExchangeRates();
    };

    $scope.$on('ExchangeRatesChanged', function () {
      $scope.init();
    });

    $scope.deleteAll = function(){
      $scope.exchangeRates = null;
      ConfigService.deleteAll();
      $rootScope.$broadcast('ExchangeRatesChanged');
    };
  })

  .controller('addEditRatesCtrl', function ($scope, $rootScope, $http, $state, ConfigService) {
    $http.get('data/currencies.json').success(function (data) {
      $scope.currencies = data;
    });

    $scope.onBaseChanged = function () {
      ConfigService.setBaseCurrency(this.baseCurrency);
    };

    $scope.exchange = {amount: 0};
    $scope.addExchangeRate = function () {
      ConfigService.addExchangeRate(this.exchange);
      this.exchange = {amount: 0};
      $rootScope.$broadcast('ExchangeRatesChanged');
    };

    $scope.baseCurrency = ConfigService.getBaseCurrency();
  });
