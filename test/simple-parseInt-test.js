#!/usr/bin/env node

/* 
 * Abaco#parseInt test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Abaco = require( '../' )
    , n1 = '01234567'
    , n2 = '-987654'
    , n3 = '11110011'
    , n4 = '2a0bcde05'
    , n5 = '12345678901234567'
    , b1 = new Buffer( n1 )
    , b2 = new Buffer( n2 )
    , b3 = new Buffer( n3 )
    , b4 = new Buffer( n4 )
    , b5 = new Buffer( n5 )
    , r1 = parseInt( b1, 8 )
    , r2 = Abaco.parseInt( b1, 8 )
    , r3 = parseInt( b1, 10 )
    , r4 = Abaco.parseInt( b1, 10 )
    , r5 = parseInt( b2, 10 )
    , r6 = Abaco.parseInt( b2, 10 )
    , r7 = parseInt( b3, 2 )
    , r8 = Abaco.parseInt( b3, 2 )
    , r9 = parseInt( b4, 16 )
    , r10 = Abaco.parseInt( b4, 16 )
    , r11 = parseInt( b5, 10 )
    , r12 = Abaco.parseInt( b5, 10 )
    , r13 = parseInt( b1, 4 )
    , r14 = Abaco.parseInt( b1, 4 )
    ;

log( '- test message: String -> parseInt( Number ), Abaco#parseInt( Number ).' );

log( '- parse (radix 8) number with leading 0s: %s -> %s, %s', n1, r1, r2 );
assert.equal( r1, r2 );

log( '- parse (radix 10) number with leading 0s: %s -> %s, %s', n1, r3, r4 );
assert.equal( r3, r4 );

log( '- parse (radix 10) negative number with leading "-": %s -> %s, %s', n2, r5, r6 );
assert.equal( r5, r6 );

log( '- parse (radix 2) string: %s -> %s, %s', n3, r7, r8 );
assert.equal( r7, r8 );

log( '- parse (radix 16) string: %s -> %s, %s', n4, r9, r10 );
assert.equal( r9, r10 );

log( '- parse a (radix 10) integer out of range (>10^16) returns NaN: %s -> %s, %s', n5, r11, r12 );
assert.ok( isNaN( r12 ) );

log( '- parse number with wrong radix returns a wrong Number: %s -> %s, %s', n1, r13, r14 );
assert.ok( r13 !== r14 );