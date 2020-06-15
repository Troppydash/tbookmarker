import moment from 'moment';

/**
 * Return a promise where error is indicted by null
 * @param promise
 * @returns {Promise<T>}
 * @constructor
 */
export function DataOrNull<T>( promise: Promise<T> ) {
    return promise.then( data => data ).catch( () => null );
}

/**
 * Return a promise with data and error
 * @param promise
 * @returns {Promise<{data: T; error: null} | {data: null; error: any}>}
 * @constructor
 */
export function DataOrError<T>( promise: Promise<T> ) {
    return promise
        .then( data => ({
            data,
            error: null
        }) )
        .catch( err => ({
            data: null,
            error: err
        }) );
}

/**
 * Get current date in a db format
 * @returns {string}
 * @constructor
 */
export function GetCurrentDate(): number {
    return +moment().format( 'YYYYMMDDHHmmss' );
}
