/*
 * Abaco, an ultra fast number parser for Buffers.
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Abaco = ( function () {
    var log = console.log
        // radix powers table
        , tpow = ( function () {
            /* 
             * precision limits
             * radix : byte length 
             */
            var bl = {
                2 : 53
                , 3 : 33
                , 4 : 26
                , 5 : 22
                , 6 : 20
                , 7 : 18
                , 8 : 17
                , 9 : 16
                , 10 : 15
                , 11 : 15
                , 12 : 14
                , 13 : 14
                , 14 : 13
                , 15 : 13
                , 16 : 13
            }
            , i = 16
            , p = bl[ i ]
            , j = p
            , tpow = {}
            , t = null
            ;
            // build
            for ( ; i > 1; p = bl[ --i ], j = p ) {
                t = new Array( p );
                for ( ; ~j; --j ) {
                    t[ j ] = Math.pow( i, j );
                };
                tpow[ i ] = t;
            };
            return tpow;
        } )()
        // parse
        , parseInt = function ( buff, base, start, end ) {
            var b = buff
                , blen = b.length
                , bs = base || 10
                , t = tpow[ bs ]
                , s = start || 0
                , e = end ? Math.min( end, blen ) : blen
                , p = e - s - 1
                , sign = 1
                , sum = 0
                , n = 0
                ;

            if ( ( blen === 0 ) || ( p < 0 ) ) {
                return NaN;
            }
            if ( b[ s ] === 0x2d ) {
                if ( --p < 0 ) {
                    return NaN;
                }
                ++s;
                sign = -1;
            }
            if ( bs > 10 ) {
                // base 16
                for ( ; ~ p; ) {
                    n = b[ s++ ] - 48;
                    n -= ( n < 10 ) ? 0 : 39
                    sum += n * t[ p-- ];
                };
                return sum * sign;
            } 
            // base <= 10
            for ( ; ~ p; ) {
                sum += ( b[ s++ ] - 48 ) * t[ p-- ];
            };
            return sum * sign;
        }
        /*
         * strict parse, it returns NaN if the number parsed,
         * contains some symbols out of current radix.
         * Example: #parseInt( '012', 2 ) returns NaN.
         */
        , xparseInt = function ( buff, base, start, end ) {
            var b = buff
                , blen = b.length
                , bs = base || 10
                , t = tpow[ bs ]
                , s = start || 0
                , e = end ? Math.min( end, blen ) : blen
                , p = e - s - 1
                , sign = 1
                , sum = 0
                , n = 0
                ;

            if ( ( blen === 0 ) || ( p < 0 ) ) {
                return NaN;
            }
            if ( b[ s ] === 0x2d ) {
                if ( --p < 0 ) {
                    return NaN;
                }
                ++s;
                sign = -1;
            }
            if ( bs > 10 ) {
                // base 16
                for ( ; ~ p; ) {
                    n = b[ s++ ] - 48;
                    n -= ( n < 10 ) ? 0 : 39
                    if ( n >= bs ) return NaN;
                    sum += n * t[ p-- ];
                };
                return sum * sign;
            } 
            // base <= 10
            for ( ; ~ p; ) {
                n = b[ s++ ] - 48;
                if ( n >= bs ) return NaN;
                sum += n * t[ p-- ];
            };
            return sum * sign;
        }
        ;
    return {
       parseInt : parseInt
       , xparseInt : xparseInt
    };

} )();
