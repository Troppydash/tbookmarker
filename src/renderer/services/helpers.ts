import moment from 'moment';

/**
 * Return a promise where error is indicted by null
 * @param promise
 * @returns {Promise<T>}
 * @constructor
 */
export function DataOrNull<T>(promise: Promise<T>) {
    return promise.then(data => data).catch(() => null);
}

/**
 * Get current date in a db format
 * @returns {string}
 * @constructor
 */
export function GetCurrentDate(): number {
    return +moment().format('YYYYMMDDHHmmss');
}
