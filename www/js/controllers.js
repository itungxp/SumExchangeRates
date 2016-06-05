angular.module('app.controllers', [])

  .controller('sumExchangeRatesCtrl', function ($scope, ConfigService) {
    $scope.baseCurrency = ConfigService.getBaseCurrency();
    $scope.exchangeRates = ConfigService.getExchangeRates();

    $scope.calculate = function(){
      $scope.remains = this.total;
      angular.forEach($scope.exchangeRates, function(exchange, key){
        $scope.remains -= exchange.amount/exchange.rate;
      });
    };

    $scope.reset = function(){
      $scope.exchangeRates = ConfigService.getExchangeRates();
      this.total = '';
      $scope.remains = 0;
    };
  })

  .controller('addEditRatesCtrl', function ($scope, $http, $state, ConfigService) {
    $http.get('data/currencies.json').success(function (data) {
      $scope.currencies = data;
    });

    $scope.onBaseChanged = function () {
      ConfigService.setBaseCurrency(this.baseCurrency);
    };

    $scope.exchange = {amount: 0};
    $scope.addExchangeRate = function(){
      ConfigService.addExchangeRate(this.exchange);
      this.exchange = {};
      $state.go('tabsController.exchangeRates', {}, {reload: true});
    };

    $scope.baseCurrency = ConfigService.getBaseCurrency();
  })

  .controller('exchangeRatesCtrl', function ($scope, ConfigService) {
      $scope.exchangeRates = ConfigService.getExchangeRates();
  })
