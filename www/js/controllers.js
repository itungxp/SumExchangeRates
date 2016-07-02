angular.module('app.controllers', ['ngCordova'])

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
      angular.forEach($scope.exchangeRates, function(exchange){
        exchange.amount = 0;
      });
      $scope.remains='';
    };

    $scope.$on('ExchangeRatesChanged', function () {
      $scope.reload();
    });
  })

  .controller('exchangeRatesCtrl', function ($scope, $rootScope, $location, $ionicPopup, ConfigService) {
    $scope.init = function() {
      $scope.exchangeRates = ConfigService.getExchangeRates();
    };

    $scope.$on('ExchangeRatesChanged', function () {
      $scope.init();
    });

    $scope.deleteAll = function(){
      $ionicPopup.confirm({
        title: 'Delete all',
        template: 'Are you sure you want to delete all Exchange rates?'
      }).then(function(agreed) {
        if(agreed) {
          $scope.exchangeRates = null;
          ConfigService.deleteAll();
          $rootScope.$broadcast('ExchangeRatesChanged');
        }
      });
    };

    $scope.delete = function(exchange){
      ConfigService.delete(exchange.code);
      $rootScope.$broadcast('ExchangeRatesChanged');
    };

    $scope.edit = function(exchange){
      $location.path('/home/edit/' + exchange.code);
    };
  })

  .controller('addEditRatesCtrl', function ($scope, $rootScope, $stateParams, $http, $cordovaToast, ConfigService) {
    $scope.exchange = $stateParams.code ? ConfigService.getExchangeRate($stateParams.code) : {amount: 0};
    $scope.tabTitle = angular.isDefined($stateParams.code) ? 'Edit' : 'Add';

    $scope.onBaseChanged = function () {
      if(angular.isDefined(this.baseCurrency)) this.baseCurrency = this.baseCurrency.toUpperCase();
      ConfigService.setBaseCurrency(this.baseCurrency);
      $rootScope.$broadcast('ExchangeRatesChanged');
    };

    $scope.addOrEdit = function () {
      this.exchange.code = this.exchange.code.toUpperCase();
      ConfigService.addOrEdit(this.exchange);
      this.exchange = {amount: 0};
      $rootScope.$broadcast('ExchangeRatesChanged');
      $cordovaToast.showShortBottom('Saved!');
    };

    $scope.baseCurrency = ConfigService.getBaseCurrency();
  });
