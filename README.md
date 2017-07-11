# XMLHttpRequest Mock [![NPM Version](https://img.shields.io/npm/v/@natlibfi/xmlhttprequest-mock.svg)](https://npmjs.org/package/@natlibfi/xmlhttprequest-mock) [![Build Status](https://travis-ci.org/NatLibFi/xmlhttprequest-mock.svg)](https://travis-ci.org/NatLibFi/xmlhttprequest-mock) [![Test Coverage](https://codeclimate.com/github/NatLibFi/xmlhttprequest-mock/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/xmlhttprequest-mock/coverage)

Mock for XMLHttpRequest that works both in Browser and Node.js and can override globals

## Usage

### Manual installation

Clone the sources and install the package (In the source directory) on command line using `npm`:

```sh
npm install
```

## Testing

Run the following NPM script to lint, test and check coverage of the code:

```javascript

npm run check

```

#### AMD

```javascript

define(['xmlhttprequest-mock'], function(xhrMockFactory) {

  var xhr_mock = xhrMockFactory(),
  XMLHttpRequestMock = xhr_mock.create({
    status: 400,
    body: 'foobar',
    headers: {
      'Content-Length': 5
    }
  });
  
  /**
  * @internal Do something with XMLHttpRequestMock
  **/
  ...

  /**
   * @internal Override global XMLHttpRequestMock
   **/
  xhr_mock = xhrMockFactory(1);
  
  xhr_mock.create({
    status: 400,
    body: 'foobar',
    headers: {
      'Content-Length': 5
    }
  });

  
  /**
  * @internal Run external tests that use XMLHttpRequest
  **/
  ...

  xhr_mock.restore();

});

```

#### Node.js

```javascript

  var xhrMockFactory = require('xmlhttprequest-mock');
  xhr_mock = xhrMockFactory(),
  XMLHttpRequestMock = xhr_mock.create({
    status: 400,
    body: 'foobar',
    headers: {
      'Content-Length': 5
    }
  });
  
  /**
  * @internal Do something with XMLHttpRequestMock
  **/
  ...

  /**
   * @internal Override global XMLHttpRequestMock
   **/
  xhr_mock = xhrMockFactory(1);
  
  xhr_mock.create({
    status: 400,
    body: 'foobar',
    headers: {
      'Content-Length': 5
    }
  });

  
  /**
  * @internal Run external tests that use XMLHttpRequest
  **/
  ...

  xhr_mock.restore();

});

```

### Configuration

The factory function takes a single argument which (If not undefined) will override the global XMLHttpRequest constructor. The object produced by the factory has the following methods available:

- **create**: Creates a mock of XMLHttpRequest constructor and returns it. Also overrides the global constructor if override was requested when creating the mock object. Optional parameters object can be passed as an argument:
  - *status* [Number]: HTTP response status code
  - *body* [String]: Response body (Will be set to the responseText-property in the xhr instance)
  - *headers* [Object]: Headers to set
- **restore**: Returns the original XMLHttpRequest constructor or undefined if not available. Also restore the global constructor if override was requested when creating the mock object.

## License and copyright

Copyright (c) 2016 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **GNU Lesser General Public License Version 3**, or any later version.
