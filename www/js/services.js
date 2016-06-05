angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('ConfigService', [function(){
  var baseCurrency = '', exchangeRates = [];
  return {
    getBaseCurrency : function () {
      if(typeof(Storage) != "undefined") {
        baseCurrency = localStorage.getItem("baseCurrency");
      }
      return baseCurrency;
    },
    setBaseCurrency : function(base){
      if(typeof(Storage) != "undefined") {
        localStorage.setItem("baseCurrency", base);
      }
    },
    getExchangeRates : function(){
      if(typeof(Storage) != "undefined") {
        exchangeRates = angular.fromJson(localStorage.getItem("exchangeRates"));
      }
      return exchangeRates;
    },
    addExchangeRate : function(exchange){
      exchangeRates = this.getExchangeRates();
      if(exchangeRates === null) exchangeRates = [];
      exchangeRates.push(exchange);
      if(typeof(Storage) != "undefined") {
        localStorage.setItem("exchangeRates", angular.toJson(exchangeRates));
      }
    }
  }
}]);

