/*
 * Abaco,  an ultra fast number parser for Buffers.
 * It parses a Buffer, or a portion of it, to get the
 * Number value stored as (ASCII) String.
 *
 * Copyright(c) 2015 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Abaco = ( function () {
    var isArray = Array.isArray
        , min = Math.min
        , pow = Math.pow
        /* 
         * radix power tables
         * precision limits
         * radix : bytes length 
         */
         , bl = {
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
        // table for powers, values >= 1
        , tpow = ( function () {
            var i = 16
                , p = bl[ i ]
                , j = p
                , tpow = {}
                , t = null
                ;
            // build
            for ( ; i > 1; p = bl[ --i ], j = p ) {
                t = new Array( p );
                for ( ; ~j; --j ) {
                    t[ j ] = pow( i, j );
                }
                tpow[ i ] = t;
            }
            return tpow;
        } )()

        // table for powers, values < 1
        , npow = ( function () {
            var i = 16
                , p = bl[ i ]
                , j = p
                , npow = {}
                , n = null
                ;
            // build
            for ( ; i > 1; p = bl[ --i ], j = p ) {
                n = new Array( p );
                for ( ; j; --j ) n[ j - 1 ] = pow( i, - j );
                npow[ i ] = n;
            }
            return npow;
        } )()

        , parseIntArray = function ( arr, base ) {
            var a = isArray( arr ) ? arr : [ arr ]
                , alen = a.length
                , bs = base || 10
                , v = null
                , i = 0
                ;
            for ( ; i < alen; ++i ) {
                v = a[ i ];
                a[ i ] = parseInt( v, bs );
            }
            return a;
        }

        , parseFloatArray = function ( arr, base ) {
            var a = isArray( arr ) ? arr : [ arr ]
                , alen = a.length
                , bs = base || 10
                , v = null
                , i = 0
                ;
            for ( ; i < alen; ++i ) {
                v = a[ i ];
                a[ i ] = parseFloat( v, bs );
            }
            return a;
        }

        // parse
        , parseInt = function ( buff, base, start, end ) {
            var b = buff
                , blen = b.length
                , bs = base || 10
                , t = tpow[ bs ]
                , s = start || 0
                , e = end ? min( end, blen ) : blen
                , p = e - s - 1
                , sign = 1
                , sum = 0
                , n = 0
                ;

            if ( ( blen === 0 ) || ( p < 0 ) ) return NaN;

            if ( b[ s ] === 0x2d ) {
                if ( --p < 0 ) return NaN;
                ++s;
                sign = -1;
            }

            if ( p > bl[ bs ] + 2 ) return NaN;

            if ( bs > 10 ) {
                // 10 < base <= 16
                for ( ; ~ p; ) {
                    n = b[ s++ ] - 48;
                    n -= ( n < 10 ) ? 0 : 39;
                    sum += n * t[ p-- ];
                }
                return sum * sign;
            }

            // base <= 10
            for ( ; ~ p; ) sum += ( b[ s++ ] - 48 ) * t[ p-- ];

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
                , e = end ? min( end, blen ) : blen
                , p = e - s - 1
                , sign = 1
                , sum = 0
                , n = 0
                ;

            if ( ( blen === 0 ) || ( p < 0 ) ) return NaN;

            if ( b[ s ] === 0x2d ) {
                if ( --p < 0 ) return NaN;
                ++s;
                sign = -1;
            }

            if ( p > bl[ bs ] + 2 ) return NaN;

            if ( bs > 10 ) {
                // 10 < base <= 16
                for ( ; ~ p; ) {
                    n = b[ s++ ] - 48;
                    n -= ( n < 10 ) ? 0 : 39;
                    if ( n >= bs ) { return NaN; }
                    sum += n * t[ p-- ];
                }
                return sum * sign;
            } 

            // base <= 10
            for ( ; ~ p; ) {
                n = b[ s++ ] - 48;
                if ( n >= bs ) return NaN;
                sum += n * t[ p-- ];
            }

            return sum * sign;
        }

        // parse float
        , parseFloat = function ( buff, base, start, end ) {
            var b = buff
                , blen = b.length
                , bs = base || 10
                , t = npow[ bs ]
                , s = start || 0
                , e = end ? min( end, blen ) : blen
                , p = e - s - 1
                , sign = 1
                , n = 0
                // '.' char point position
                , cut = s
                , ipart = 0
                , fpart = 0
                ;

            if ( ( blen === 0 ) || ( p < 0 ) ) return NaN;

            if ( b[ s ] === 0x2d ) {
                if ( --p < 0 ) return NaN;
                ++s;
                sign = -1;
            }

            // search '.' char, 0x2e
            for ( ; cut < e; ++cut ) {
                if ( b[ cut ] === 0x2e ) {
                    --p;
                    break;
                }
            }

            if ( p > bl[ bs ] + 2 ) return NaN;

            // parse integer part
            ipart = cut === s ? 0 : parseInt( b, bs, s, cut );

            // ignore decimal part
            if ( cut >= e - 1 ) return sign * ipart;

            // parse decimal part
            s = cut + 1;
            p = 0;

            // check radix  
            if ( bs > 10 ) {
                // 10 < base <= 16
                for ( ; s < e; ) {
                    n = b[ s++ ] - 48;
                    n -= ( n < 10 ) ? 0 : 39;
                    fpart += n * t[ p++ ];
                }
                return sign * ( ipart + fpart );
            }
 
            // base <= 10
            for ( ; s < e; ) fpart += ( b[ s++ ] - 48 ) * t[ p++ ];

            return sign * ( ipart + fpart );
        }

        // strict parse float
        , xparseFloat =function ( buff, base, start, end ) {
            var b = buff
                , blen = b.length
                , bs = base || 10
                , t = npow[ bs ]
                , s = start || 0
                , e = end ? min( end, blen ) : blen
                , p = e - s - 1
                , sign = 1
                , n = 0
                // '.' char point position
                , cut = s
                , ipart = 0
                , fpart = 0
                ;

            if ( ( blen === 0 ) || ( p < 0 ) ) return NaN;

            if ( b[ s ] === 0x2d ) {
                if ( --p < 0 ) return NaN;
                ++s;
                sign = -1;
            }

            // search '.' char, 0x2e
            for ( ; cut < e; ++cut ) {
                if ( b[ cut ] === 0x2e ) {
                    --p;
                    break;
                }
            }

            if ( p > bl[ bs ] + 2 ) return NaN;

            // parse integer part
            ipart =  cut === s ? 0 : xparseInt( b, bs, s, cut );

            // ignore decimal part
            if ( cut >= e - 1 ) return sign * ipart;

            // parse decimal part
            s = cut + 1;
            p = 0;

            // check radix
            if ( bs > 10 ) {
                // 10 < base <= 16
                for ( ; s < e; ) {
                    n = b[ s++ ] - 48;
                    n -= ( n < 10 ) ? 0 : 39;
                    if ( n >= bs ) return NaN;
                    fpart += n * t[ p++ ];
                }
                return sign * ( ipart + fpart );
            }

            // base <= 10
            for ( ; s < e; ) {
                n = b[ s++ ] - 48;
                if ( n >= bs ) return NaN;
                fpart += n * t[ p++ ];
            }
            return sign * ( ipart + fpart );
        }
        ;

    return {
       parseInt : parseInt
       , parseFloat : parseFloat
       , parseFloatArray : parseFloatArray
       , parseIntArray : parseIntArray
       , xparseInt : xparseInt
       , xparseFloat : xparseFloat
    };

} )();
