'use strict';

/**
 * @ngdoc service
 * @name apifyApp.apiService
 * @description
 * # apiService
 * Service in the apifyApp.
 */
angular.module('apifyApp')
  .service('apiService', function () {
    var me  = this;
    var map = new Map();

    var handleEmptyString = function(str){
      return ( (str !== undefined && str !== null) ? str : '' ).toLowerCase();
    };

    Array.prototype.checkAndAdd = function (obj) {
      if( !this.contains(obj) ){
        this.push(obj);
      }
    };

    Array.prototype.contains = function (obj) {
      var contains = false;
      for(var i=0; i<this.length; i++){
        if( this[i].lang === obj.lang && this[i].platform === obj.platform){
          contains = true;
          break;
        }
      }
      return contains;
    };

    Map.prototype.checkAndAdd = function(name,obj){
      // name is required
      if( name === null || name === undefined ){
        return console.log('Name undefined!');
      }

      // format for file
      name = name.toLowerCase();

      // add to map
      if( !this.has(name) ){
        this.set(name,{
          name: name,
          apis: [],
          str: name,
          providerURL: (obj!==undefined?obj.url:'#'),
          url: '/api/' + name + '.html'
        });
      }

      // return from map
      return this.get(name);
    };

    this.getAll = function() {
    };

    this.get = function(name,create){
      var service = map.get(name);
      if( service === undefined && create ){
        service = me.add(name);
      }
      return service;
    };

    this.add = function(arg){
      // check and add if a service with arg.name is not map
      var service = map.checkAndAdd(arg.name,{ url: arg.url });
      // check if lang and/or platform is defined
      var lang     = handleEmptyString(arg.lang);
      var platform = handleEmptyString(arg.platform);
      // check if lang or platform is defined
      if( (     lang === null ||     lang === undefined ||     lang.length === 0 ) &&
          ( platform === null || platform === undefined || platform.length === 0 ) ){
        return console.log('Lang and platform undefined!');
      }

      // object to insert
      var obj = {
        name: service.name,
        lang: lang,
        platform: platform,
        str: service.name
      };

      if( lang.length > 0 ){
        obj.str = [obj.str,lang].join(' ');
      }

      if( platform.length > 0 ){
        obj.str = [obj.str,platform].join(' ');
      }

      // check if lang/platform exists, if not add
      service.apis.checkAndAdd(obj);
    };

    this.find = function(keyword,_limit_,AND_OR){
      // limit
      var limit = _limit_ !== undefined ? _limit_ : 10;
      // results
      var results = [];
      // Split on single or multi space
      var splitext = keyword.toLowerCase().split(/\s+/);
      // Build Regexp with Logical AND using 'look ahead assertions'
      var regexpAnd = '(?=.*' + splitext.join(')(?=.*') + ')';
      // Build Regexp with logicial OR
      var regexpOr = keyword.toLowerCase().replace(/\s+/g, '|');
      // Compile the regular expression
      var re = new RegExp((AND_OR === 'AND') ? regexpAnd : regexpOr, 'i');
      //
      var mapIter = map.entries();
      //
      var iter;
      while( !(iter = mapIter.next()).done ){
        var entry = iter.value[1];
        if ( re.test( entry.str ) ) {
          results.push(entry);
        }
        if( results.length === limit ){
          break;
        }
      }
      // return results
      return results;
    };

});
