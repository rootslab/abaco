/* 
 * global parseInt benchmark with String.
 */

var log = console.log
    , util = require( 'util' )
    , s0 = '12'
    , s1 = '1234'
    , s2 = '12345678'
    , s3 = '1234567890123456'
    , s4 = '12345678901234567890123456789012'
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
            parseInt( s );
        };
        etime = Date.now() - stime;
        log( '\n- number: %s, parsed: %s', b, parseInt( s ) );
        log( '- global parseInt %d bytes.', b.length );
        log( '- elapsed: %d ms', etime );
    }
    ;

log( '- benchmark global parseInt with Buffer.');

run( b0, l );
run( b1, l );
run( b2, l );
run( b3, l );
run( b4, l );