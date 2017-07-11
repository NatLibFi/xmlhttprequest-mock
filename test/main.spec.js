/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Mock for XMLHttpRequest that works both in Browser and Node.js and can override globals
 *
 * Copyright (c) 2016-2016 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of xmlhttprequest-mock
 *
 * xmlhttprequest-mock is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 **/

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['chai/chai', '../lib/main'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('chai'), require('../lib/main'));
  }

}(this, factory));

/**
* @internal Needed because we use expect(...).to.be.empty & expect(...).to.be.undefined
**/
/* jshint -W030 */
function factory(chai, xhrMockFactory)
{

  'use strict';

  var expect = chai.expect;
  
  describe('main', function() {

    describe('factory', function() {

      it('Should be a function', function() {
        expect(xhrMockFactory).to.be.a('function');
      });

      it('Should create the expected object', function() {         
        expect(xhrMockFactory()).to.be.an('object').and
          .respondTo('create').and
          .respondTo('restore');
      });

      describe('object', function() {

        describe('#create', function() {

          it('Should create a new constructor', function() {
            expect(xhrMockFactory().create()).to.be.a('function');
          });

          describe('constructor', function() {

            it('Should create the expected instance', function() {
              
              var XMLHttpRequestMock = xhrMockFactory().create(),
              instance = new XMLHttpRequestMock();
              
              expect(instance).to.be.instanceof(XMLHttpRequestMock);         
              expect(instance).to
                .respondTo('send').and
                .respondTo('open').and
                .respondTo('addEventListener').and
                .respondTo('setRequestHeader').and
                .respondTo('getResponseHeader').and
                .respondTo('getAllResponseHeaders');
              
            });

            describe('instance', function() {

              it('Should throw because #open is called with invalid arguments', function() {

                var Constructor = xhrMockFactory().create(),

                instance = new Constructor();

                expect(instance.open).to.throw(Error, /^Not enough arguments to XMLHttpRequest.open$/);

              });

              it('Should invoke the load callback and build the response with default options', function(done) {

                var Constructor = xhrMockFactory().create(),
                instance = new Constructor();

                instance.setRequestHeader('X-Test', 'foobar');
                instance.addEventListener('load', function() {
                  try {
                    
                    expect(instance.status).to.equal(200);
                    expect(instance.body).to.be.empty;
                    expect(instance.getAllResponseHeaders()).to.be.null;
                    
                    done();
                    
                  } catch (e) {
                    done(e);
                  }
                });

                instance.open('foo', 'bar');
                instance.send();

              });

              it('Should invoke the load callback and build the response with custom options', function(done) {

                var Constructor = xhrMockFactory().create({
                  headers: {
                    'X-Foo': 'bar',
                    'X-Bar': 'foo'
                  }
                }),
                instance = new Constructor();

                instance.addEventListener('load', function() {
                  try {

                    expect(instance.status).to.equal(200);
                    expect(instance.body).to.be.empty;
                    expect(instance.getResponseHeader('X-Foo')).to.equal('bar');
                    expect(instance.getAllResponseHeaders()).to.eql('X-Foo=bar\r\nX-Bar=foo\r\n');

                    done();

                  } catch (e) {
                    done(e);
                  }
                });

                instance.open('foo', 'bar');
                instance.send();

              });

              it('Should invoke the error callback', function(done) {

                var Constructor = xhrMockFactory().create({
                  fail: 1
                }),
                instance = new Constructor();

                instance.addEventListener('error', function() {
                  try {
                    
                    expect(instance.status).to.equal(200);
                    expect(instance.getAllResponseHeaders()).to.be.null;
                    expect(instance.body).to.be.empty;
                    
                    done();
                    
                  } catch (e) {
                    done(e);
                  }
                });

                instance.open('foo', 'bar');
                instance.send();

              });

            });

            describe('#restore', function() {
              
              it('Should return undefined because global function was not overridden', function() {
                
                var xhr_mock = xhrMockFactory();
                
                xhr_mock.create();                

                expect(xhr_mock.restore()).to.be.undefined;
                
              });

            });

          });

        });

      });

    });

  });

}
