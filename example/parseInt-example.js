var log = console.log
    , Abaco = require( '../' )
    , n1 = '01234567'
    , n2 = '-987654'
    , n3 = '11110011'
    , n4 = '2a0bcde05'
    , b1 = new Buffer( n1 )
    , b2 = new Buffer( n2 )
    , b3 = new Buffer( n3 )
    , b4 = new Buffer( n4 )
    , r1 = parseInt( b1, 8 )
    , r2 = Abaco.parseInt( b1, 8 )
    , r3 = parseInt( b2, 10 )
    , r4 = Abaco.parseInt( b2, 10 )
    , r5 = parseInt( b3, 4 )
    , r6 = Abaco.parseInt( b3, 4 )
    , r7 = parseInt( b4, 16 )
    , r8 = Abaco.parseInt( b4, 16 )
    ;

log( '\n- parseInt( %s, %s ): %d', n1, 8, r1 );
log( '- #parseInt( %s,%s ):', n1, 8, r2 );

log( '\n- parseInt( %s, %s ): %d', n2, 10, r3 );
log( '- #parseInt( %s, %s ):', n2, 10, r4 );

log( '\n- parseInt( %s, %s ): %d', n3, 4, r5 );
log( '- #parseInt( %s, %s ):', n3, 4, r6 );

log( '\n- parseInt( %s, %s ): %d', n4, 16, r7 );
log( '- #parseInt( %s, %s ):', n4, 16, r8 );
log();