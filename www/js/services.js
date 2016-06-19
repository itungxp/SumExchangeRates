angular.module('app.services', [])

  .factory('BlankFactory', [function () {

  }])

  .service('ConfigService', [function () {
    var baseCurrency = '', exchangeRates = [];
    return {
      getBaseCurrency: function () {
        if (typeof(Storage) != "undefined") {
          baseCurrency = localStorage.getItem("baseCurrency");
        }
        return baseCurrency;
      },
      setBaseCurrency: function (base) {
        if (typeof(Storage) != "undefined") {
          localStorage.setItem("baseCurrency", base);
        }
      },
      getExchangeRate: function (code) {
        exchangeRates = this.getExchangeRates();
        if (exchangeRates === null) return false;
        for (var i = 0; i < exchangeRates.length; i++) {
          if (exchangeRates[i].code == code) {
            return exchangeRates[i];
          }
        }
      },
      getExchangeRates: function () {
        if (typeof(Storage) != "undefined") {
          exchangeRates = angular.fromJson(localStorage.getItem("exchangeRates"));
        }
        return exchangeRates;
      },
      addOrEdit: function (exchange) {
        exchangeRates = this.getExchangeRates();
        if (exchangeRates === null) exchangeRates = [];
        var existing = false;
        for (var i = 0; i < exchangeRates.length; i++) {
          if (exchangeRates[i].code == exchange.code) {
            exchangeRates[i] = exchange;
            existing = true;
            break;
          }
        }
        if (!existing) {
          exchangeRates.push(exchange);
        }
        if (typeof(Storage) != "undefined") {
          localStorage.setItem("exchangeRates", angular.toJson(exchangeRates));
        }
      },
      delete: function (code) {
        exchangeRates = this.getExchangeRates();
        if (exchangeRates === null) return false;
        for (var i = 0; i < exchangeRates.length; i++) {
          if (exchangeRates[i].code == code) {
            exchangeRates.splice(i, 1);
            break;
          }
        }
        if (typeof(Storage) != "undefined") {
          localStorage.setItem("exchangeRates", angular.toJson(exchangeRates));
        }
      },
      deleteAll: function () {
        if (typeof(Storage) != "undefined") {
          localStorage.removeItem("exchangeRates");
        }
      }
    }
  }]);

