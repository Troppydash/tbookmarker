/// Manages the loading and saving of bookmarks

import { BookmarkBlob, BookmarksSchema } from '../schemas/bookmarkSchemas';
import fs from 'fs';

const fsPromise = fs.promises;

/**
 * Create the folders given a folder path, returns if the action succeeded
 * @param path
 * @returns {boolean}
 * @constructor
 */
function CreateFoldersIfNotExists( path: string ): boolean {
    if ( !fs.existsSync( path ) ) {
        try {
            fs.mkdirSync( path, { recursive: true } );
            return true;
        } catch ( e ) {
            return false;
        }
    }
    return true;
}

/**
 * Get the root storage path of Tbookmarker
 * @returns {string | null}
 * @constructor
 */
function GetApplicationStoragePath(): string | null {
    const home = require( 'os' ).homedir();
    const rootURL = `${home}/Documents/tbookmarker`;
    if ( !CreateFoldersIfNotExists( rootURL ) ) {
        return null;
    }
    return `${home}/Documents/tbookmarker`;
}

/**
 * Get the bookmark json files storage path
 * @returns {string | null}
 * @constructor
 */
function GetApplicationBookmarkStoragePath() {
    const result = GetApplicationStoragePath();
    if ( result === null ) {
        return null;
    }

    const bookmarkPath = `${result}/storage/`;
    if ( !CreateFoldersIfNotExists( bookmarkPath ) ) {
        return null;
    }
    return bookmarkPath;
}


/**
 * Async function to read all the files in a directory
 * @param dirname
 * @param onFile
 * @returns {Promise<any[]>}
 */
async function readFiles( dirname: string, onFile: ( filename: string, content: any ) => any ): Promise<any[]> {
    const files: any[] = await fsPromise.readdir( dirname );
    if ( files === null ) {
        return [];
    }

    const result = [];
    for ( const filename of files ) {
        const content = await fsPromise.readFile( dirname + filename, 'utf-8' );
        if ( content !== null ) {
            result.push( onFile( filename, content ) );
        }
    }
    return result;
}


/**
 * Async function to load all the bookmarks
 * @returns {Promise<any[] | null>}
 */
export async function loadAllBookmarksBlobs(): Promise<BookmarkBlob[] | null> {
    const folderPath = GetApplicationBookmarkStoragePath();
    if ( folderPath === null ) {
        return null;
    }

    return await readFiles( folderPath, ( filename, content ) => {
        try {
            const bookmark = JSON.parse( content );
            return {
                title: filename.split( '.' )[0],
                bookmarks: bookmark
            };
        } catch ( e ) {
            return {
                title: filename.split('.')[0],
                bookmarks: null
            };
        }
    } );
}

/**
 * Async function to load the most recent bookmarks
 * @returns {Promise<any>}
 */
export async function loadMostRecentBookmarkBlob(): Promise<BookmarkBlob | null> {
    const folderPath = GetApplicationBookmarkStoragePath();
    if ( folderPath === null ) {
        return null;
    }

    const items = await readFiles( folderPath, ( filename, content ) => {
        try {
            const bookmark = JSON.parse( content );
            return {
                title: filename.split( '.' )[0],
                bookmarks: bookmark
            };
        } catch ( e ) {
            return {
                title: filename.split('.')[0],
                bookmarks: null
            };
        }
    } );

    // Thx stackoverflow
    return items.reduce(function(prev: BookmarkBlob, current: BookmarkBlob) {
        if (!prev.bookmarks) {
            return current;
        }
        if (!current.bookmarks) {
            return current;
        }
        return (prev.bookmarks.createdAt > current.bookmarks.createdAt) ? prev : current
    })
}


/**
 * Save a blob to the storage named by its created field
 * @param targetBookmark
 * @returns {Promise<boolean>}
 */
export async function saveBookmarkBlob( targetBookmark: BookmarksSchema ): Promise<boolean> {
    const filename = `bookmark_${targetBookmark.createdAt}.json`;
    const storagePath = GetApplicationBookmarkStoragePath();

    try {
        const strContent = JSON.stringify(targetBookmark);
        return await fsPromise.writeFile(storagePath + filename, strContent)
            .then(() => {
                return true;
            })
            .catch(err => {
                return false;
            })
    } catch ( e ) {
        return false;
    }
}
