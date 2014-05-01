/* 
 * global parseFloat benchmark
 */

var log = console.log
    , util = require( 'util' )
    , s0 = '12.0001'
    , s1 = '1234.001'
    , s2 = '12345.678'
    , s3 = '1.234567890123456'
    , s4 = '12345.678901234567890123456789012'
    , b0 = new Buffer( s0 )
    , b1 = new Buffer( s1 )
    , b2 = new Buffer( s2 )
    , b3 = new Buffer( s3 )
    , b4 = new Buffer( s4 )
    , i = 0
    , l = 1024 * 1024
    , stime = 0
    , etime = 0
    , run = function ( b, n ) {
        var i = 0
            , s = new Buffer( b )
            , stime = Date.now()
            ;
        for( ; i < n; ++i ) {
            parseFloat( s );
        };
        etime = Date.now() - stime;
        log( '\n- test repeated %s times.', l );
        log( '- number: %s, parsed: %s', b, parseFloat( b ) );
        log( '- global parseFloat %d bytes.', b.length );
        log( '- elapsed: %d ms', etime );
    }
    ;

log( '- benchmark Abaco#parseFloat with Buffer.');

run( b0, l );
run( b1, l );
run( b2, l );
run( b3, l );
run( b4, l );