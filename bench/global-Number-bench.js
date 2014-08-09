/* 
 * global Number constructor benchmark with Buffer to String conversion.
 */

var log = console.log
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
    , l = 1024 * 1024
    , run = function ( b, n ) {
        var i = 0
            , stime = 0
            , etime = 0
            , s = new Buffer( b )
            ;
        stime = Date.now();
        for ( ; i < n; ++i ) Number( s );
        etime = Date.now() - stime;
        log( '\n- test repeated %s times.', l );
        log( '- number: %s, parsed: %s', b, Number( s ) );
        log( '- Number constructor with %d bytes.', b.length );
        log( '- elapsed: %d ms', etime );
    }
    ;

log( '- benchmark Number constructor with Buffer.');

run( b0, l );
run( b1, l );
run( b2, l );
run( b3, l );
run( b4, l );