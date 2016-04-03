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

module.exports = (function() {
  
  'use strict';
  
  var chai = require('chai'),
  xhrMockFactory = require('../../lib/main'),
  expect = chai.expect;
  
  describe('nodejs', function() {

    describe('factory', function() {

      describe('object', function() {

        describe('#restore', function() {

          it('Should return and restore the original function which was available globally', function() {

            var xhr_mock,
            placeholder = function(){};

            global.XMLHttpRequest = placeholder;
            xhr_mock = xhrMockFactory(1);
            xhr_mock.create();
            
            expect(xhr_mock.restore()).to.equal(placeholder);

            delete global.XMLHttpRequest;

          });

        });

      });

    });

  });

}());
