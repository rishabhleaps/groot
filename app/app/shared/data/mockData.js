function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var app = angular.module('DemoMock', ['ngTable', 'ngMockE2E'])
  .run(function ($httpBackend, $filter, $log, ngTableParams) {
    // emulation of api server
    $httpBackend.whenGET(/users.*/).respond(function (method, url, data, headers) {
      var query = url.split('?')[1],
        requestParams = {};

      $log.log('Ajax request: ', url);

      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        requestParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      // parse url params
      for (var key in requestParams) {
        if (key.indexOf('[') >= 0) {
          var params = key.split(/\[(.*)\]/), value = requestParams[key], lastKey = '';

          angular.forEach(params.reverse(), function (name) {
            if (name != '') {
              var v = value;
              value = {};
              value[lastKey = name] = isNumber(v) ? parseFloat(v) : v;
            }
          });
          requestParams[lastKey] = angular.extend(requestParams[lastKey] || {}, value[lastKey]);
        } else {
          requestParams[key] = isNumber(requestParams[key]) ? parseFloat(requestParams[key]) : requestParams[key];
        }
      }

      data = [{id: 1, name: "Moroni", email: 'moroni@gmail.com'},
        {id: 2,name: "Tiancum", email: 'Tiancum@gmail.com'},
        {id: 3,name: "Jacob", email: 'Jacob@gmail.com'},
        {id: 4,name: "Nephi", email: 'Nephi@gmail.com'},
        {id: 5,name: "Enos", email: 'Enos@gmail.com'},
        {id: 6,name: "Tiancum", email: 'Tiancum@gmail.com'},
        {id: 7,name: "Jacob", email: 'Jacob@gmail.com'},
        {id: 8,name: "Nephi", email: 'Nephi@gmail.com'},
        {id: 9,name: "Enos", email: 'Enos@gmail.com'},
        {id: 10,name: "Tiancum", email: 'Tiancum@gmail.com'},
        {id: 11,name: "Jacob", email: 'Jacob@gmail.com'},
        {id: 12,name: "Nephi", email: 'Nephi@gmail.com'},
        {id: 13,name: "Enos", email: 'Enos@gmail.com'},
        {id: 14,name: "Tiancum", email: 'Tiancum@gmail.com'},
        {id: 15,name: "Jacob", email: 'Jacob@gmail.com'},
        {id: 16,name: "Nephi", email: 'Nephi@gmail.com'},
        {id: 17,name: "Enos", email: 'Enos@gmail.com'}];

      var params = new ngTableParams(requestParams);
      data = params.filter() ? $filter('filter')(data, params.filter()) : data;
      data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

      var total = data.length;
      data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());

      return [200, {
          result: data,
          total: total
        }];
    });
    $httpBackend.whenGET(/.*/).passThrough();
  });