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
 * record-loader-melinda is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *  
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 **/

(function() {

  'use strict';

  function formatPath(path) {
    return path.replace(new RegExp('^/base/'), '').replace(/\.js$/, '');
  }

  var spec_list = [];
  
  Object.keys(window.__karma__.files).forEach(function(file) {
    if (new RegExp('^/base/test/').test(file) === true && new RegExp('/nodejs/').test(file) === false && new RegExp('spec\.js$', 'i').test(file) === true) {
      spec_list.push(formatPath(file));
    }
  });
  
  require.config({
    baseUrl: '/base',
    paths: {
      'chai': 'node_modules/chai/chai',
      'es6-polyfills': 'node_modules/es6-polyfills',
      'es6-object-assign': 'node_modules/es6-polyfills/node_modules/es6-object-assign',
      'xmlhttprequest-mock': 'node_modules/xmlhttprequest-mock/main',
    },
    deps: spec_list,
    callback: window.__karma__.start
  });
  
})();
