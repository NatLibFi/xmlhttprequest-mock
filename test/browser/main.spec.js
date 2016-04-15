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

define(['chai', '../../lib/main'], function(chai, xhrMockFactory) {  

  'use strict';
  
  var expect = chai.expect;
  
  describe('browser', function() {
    
    describe('factory', function() {

      describe('object', function() {

        describe('#restore', function() {
          
          it('Should return and restore the original function which was globally overridden', function() {

            var orig_xhr = XMLHttpRequest,
            xhr_mock = xhrMockFactory(1);

            xhr_mock.create();

            expect(xhr_mock.restore()).to.equal(orig_xhr);

          });
        });
        
      });
      
    });

  });

});
