#!/usr/bin/env node

/* 
 * Abaco#parseFloatArray test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Abaco = require( '../' )
    , n1 = '0123.4567'
    , n2 = '-987.654'
    , n3 = '.0000011'
    , n4 = '1.'
    , n5 = '12345678.901234567'
    , b1 = new Buffer( n1 )
    , b2 = new Buffer( n2 )
    , b3 = new Buffer( n3 )
    , b4 = new Buffer( n4 )
    , b5 = new Buffer( n5 )
    , arr = [ b1, b2, b3, b4, b5 ]
    , exp = [ 123.4567, -987.654, 0.0000011, 1, 12345678.901234567 ]
    ;

log( '- test #xparseIntArray.' );
assert.deepEqual( Abaco.parseFloatArray( arr ), exp );