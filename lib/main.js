/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Mock for XMLHttpRequest that works both in Browser and Node.js and can override globals
 *
 * Copyright (c) 2016 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of xmlhttprequest-mock
 *
 * xmlhttprequest-mock is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 **/

/* istanbul ignore next */
(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['es6-polyfills/lib/polyfills/object'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('es6-polyfills/lib/polyfills/object'));
  }

}(this, factory));

function factory(Object)
{

  'use strict';

  var DEFAULT_OPTIONS = {
    body: '',
    status: 200,
    headers: {}
  };

  return function(override_globals)
  {

    var fn_orig_xhr;

    return {
      create: function(options)
      {

        var xhr = function() {},
        callbacks = {
          load: /* istanbul ignore next: Test cannot be confirmed */ function() {},
          error: /* istanbul ignore next: Test cannot be confirmed */ function() {}
        };

        options = Object.assign(JSON.parse(JSON.stringify(DEFAULT_OPTIONS)), typeof options === 'object' ? options : {});
        
        xhr.prototype.send = function() {

          this.status = options.status;
          this.statusText = String(options.status);
          this.responseText = options.body;

          if (options.fail) {
            callbacks.error();
          } else {
            callbacks.load();
          }

        };
        
        xhr.prototype.addEventListener = function(name, cb)
        {
          callbacks[name] = cb;
        };

        xhr.prototype.getResponseHeader = function(key) {
          return JSON.parse(JSON.stringify(options.headers[key]));
        };

        xhr.prototype.getAllResponseHeaders = function() {
          return Object.keys(options.headers).reduce(function(result, key) {

            result = typeof result === 'string' ? result : '';

            return result + key + '=' + options.headers[key] + '\r\n';

          }, null);
        };

        xhr.prototype.open = function() {          
          if (arguments.length < 2) {
            throw new Error('Not enough arguments to XMLHttpRequest.open');
          }
        };
        xhr.prototype.setRequestHeader = function() {};

        if (override_globals) {
          /* istanbul ignore else: We only support browsers and Node.js */
          if (typeof window === 'object') {

            fn_orig_xhr = window.XMLHttpRequest;
            window.XMLHttpRequest = xhr;

          } else if (typeof global === 'object') {
 
            fn_orig_xhr = global.XMLHttpRequest;
            global.XMLHttpRequest = xhr;

          }
        }

        return xhr;

      },
      restore: function()
      {
        if (override_globals) {
          /* istanbul ignore else: Restoration is only necessary when XMLHttpRequest exists */
          if (typeof window === 'object' && window.hasOwnProperty('XMLHttpRequest')) {
              window.XMLHttpRequest = fn_orig_xhr;
          } else if (typeof global === 'object' && global.hasOwnProperty('XMLHttpRequest')) {

            if (fn_orig_xhr === undefined) {
              delete global.XMLHttpRequest;
            } else {
              global.XMLHttpRequest = fn_orig_xhr;
            }

          }

        }

        return fn_orig_xhr;

      }
    };

  };

}
