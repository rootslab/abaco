###Abaco

[![NPM VERSION](http://img.shields.io/npm/v/abaco.svg?style=flat)](https://www.npmjs.org/package/abaco)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/abaco)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/abaco.svg?style=flat)](https://codeclimate.com/github/rootslab/abaco)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/abaco.svg?style=flat)](https://codeclimate.com/github/rootslab/abaco)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/abaco#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/abaco.svg?style=flat)](http://travis-ci.org/rootslab/abaco)
[![BUILD STATUS](http://img.shields.io/david/rootslab/abaco.svg?style=flat)](https://david-dm.org/rootslab/abaco)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/abaco.svg?style=flat)](https://david-dm.org/rootslab/abaco#info=devDependencies)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/abaco.svg?style=flat)](http://npm-stat.com/charts.html?package=abaco)

[![NPM GRAPH1](https://nodei.co/npm-dl/abaco.png)](https://nodei.co/npm/abaco/)

[![NPM GRAPH2](https://nodei.co/npm/abaco.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/abaco/)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/abaco/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/abaco)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/abaco/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/abaco)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/abaco/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/abaco)

> **_Abaco_**, an ultra fast number parser for Buffers. It parses a Buffer, or a portion of it, to get the Number value stored as (ASCII) String.

> It is faster than __parseInt()__, __parseFloat()__ and __Number()__ constructor to convert a String
> or a Buffer to a usable Number.

> __NOTE__: It adds the ability to parse a float with a radix argument, as for #parseInt.

###Install

```bash
$ npm install abaco [-g]
// clone repo
$ git clone git@github.com:rootslab/abaco.git
```

> __require__ returns an helper hash/obj.

```javascript
var Abaco  = require( 'abaco' );
```

###Run Tests

```bash
$ cd abaco/
$ npm test
```

###Run Benchmarks

```bash
$ cd abaco/
$ npm run-script bench
```

###Sample Usage

> See [examples](example/).


###Methods

> Arguments within [ ] are optional.

```javascript
/*
 * Parse a Buffer that contains string representation of an integer Number.
 * If radix is not specified, it defaults to 10; possible radix value range
 * is between 2 and 16.
 * If begin or end are not specified, it parses the entire Buffer.
 *
 * NOTE: js number precision is limited to ~ 2^53 or 10^16, it means, for example,
 * that the limit for decimal numbers is 16 bytes/chars; so it returns NaN for
 * values out of this range. NaN also signals that is better to use raw String,
 * because number representation is not accurate. See 'bl' table in the code to
 * check bytes limit for every radix.
 *
 * NOTE: Only '-' prefix is supported, no 0x' or '0' prefix, for hex or octal
 * digits; just use the begin offset for skipping some bytes.
 *
 */
Abaco#parseInt( Buffer b [, Number radix [, Number begin [, Number end ] ] ] ) : Number

/*
 * A strict parse, it returns NaN if the number parsed, contains some symbols
 * that are not allowed for the current radix alphabet.
 *
 * Example: #xparseInt( '012', 2 ) returns NaN, 2 is not in binary alphabet.
 */
Abaco#xparseInt( Buffer b [, Number radix [, Number begin [, Number end ] ] ] ) : Number

/*
 * Parse a Buffer that contains a string representation of an integer or float Number.
 * If radix is not specified, it defaults to 10; possible radix value range
 * is between 2 and 16.
 * If begin or end are not specified, it parses the entire Buffer.
 */
Abaco#parseFloat( Buffer b [, Number radix [, Number begin [, Number end ] ] ] ) : Number

/*
 * A strict parseFloat, it returns NaN if the number parsed, contains some symbols
 * that are not allowed for the current radix alphabet.
 */
Abaco#xparseFloat( Buffer b [, Number radix [, Number begin [, Number end ] ] ] ) : Number

/*
 * Parse a list of Buffer as integers.
 */
Abaco#parseIntArray( Array buffers [, Number radix ] ) : Array

/*
 * Parse a list of Buffer as floats.
 */
Abaco#parseFloatArray( Array buffers [, Number radix ] ) : Array

```

------------------------------------------------------------------------


### MIT License

> Copyright (c) 2015 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.