#!/usr/bin/env node

/* 
 * Abaco#parseIntArray test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Abaco = require( '../' )
    , n1 = '01234567'
    , n2 = '-987654'
    , n3 = '11110011'
    , n4 = '34'
    , n5 = '1234567'
    , b1 = new Buffer( n1 )
    , b2 = new Buffer( n2 )
    , b3 = new Buffer( n3 )
    , b4 = new Buffer( n4 )
    , b5 = new Buffer( n5 )
    , arr = [ b1, b2, b3, b4, b5 ]
    , exp = [ + n1, + n2, + n3, + n4, + n5 ]
    ;

log( '- test #xparseIntArray.' );
assert.deepEqual( Abaco.parseIntArray( arr ), exp );