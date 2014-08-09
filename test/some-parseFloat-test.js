#!/usr/bin/env node

/* 
 * Abaco#parseFloat some tests on floating point numbers.
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
    , r1 = parseFloat( b1 )
    , r2 = Abaco.parseFloat( b1 )
    , r3 = parseFloat( b1)
    , r4 = Abaco.parseFloat( b1 )
    , r5 = parseFloat( b2 )
    , r6 = Abaco.parseFloat( b2 )
    , r7 = parseFloat( b3 )
    , r8 = Abaco.parseFloat( b3 )
    , r9 = parseFloat( b4 )
    , r10 = Abaco.parseFloat( b4 )
    , r11 = parseFloat( b5 )
    , r12 = Abaco.parseFloat( b5 )
    ;

log( '- test message: String -> parseFloat( Number ), Abaco#parseFloat( Number ).' );

log( '- parseFloat (radix 10) integer number with leading 0s: %s -> %s, %s', n1, r1, r2 );
assert.equal( r1, r2 );

log( '- parseFloat (radix 10) integer negative number with leading "-": %s -> %s, %s', n2, r5, r6 );
assert.equal( r5, r6 );

log( '- parseFloat (radix 10) float number: %s -> %s, %s', n3, r7, r8 );
assert.equal( r7, r8 );

log( '- parseFloat (radix 10) float number with trailing "." : %s -> %s, %s', n4, r9, r10 );
assert.equal( r9, r10 );

log( '- parseFloat  big (radix 10) number: %s -> %s, %s', n5, r11, r12 );
assert.equal( r11, r12 );