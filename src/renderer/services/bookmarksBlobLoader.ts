/// Manages the loading and saving of bookmarks

import { BookmarkBlob, BookmarksSchema } from '../schemas/bookmarkSchemas';
import { readFilesFromStorage, writeFileToStorage } from './storageHandlers';

import { v4 as uuidv4 } from 'uuid';

/**
 * Async function to load all the bookmarks
 * @returns {Promise<any[] | null>}
 */
export async function loadAllBookmarksBlobs(): Promise<BookmarkBlob[] | null> {
    return await readFilesFromStorage<BookmarkBlob>(( filename, content ) => {
        try {
            const bookmark = JSON.parse( content );
            return {
                uuid: uuidv4(),
                title: filename.split( '.' )[0],
                bookmarks: bookmark
            };
        } catch ( e ) {
            return {
                uuid: uuidv4(),
                title: filename.split('.')[0],
                bookmarks: null
            };
        }
    } );
}

/**
 * Load a single bookmark by date
 * @param date
 * @returns {Promise<null | BookmarkBlob>}
 */
export async function loadBookmarkBlobByDate(date: number): Promise<BookmarkBlob | null> {
    let items = await readFilesFromStorage<BookmarkBlob>( ( filename, content ) => {
        try {
            const bookmark: BookmarksSchema = JSON.parse( content );
            return {
                uuid: uuidv4(),
                title: filename.split( '.' )[0],
                bookmarks: bookmark
            };
        } catch ( e ) {
            return {
                uuid: uuidv4(),
                title: filename.split('.')[0],
                bookmarks: null
            };
        }
    } );

    items = items.filter((blob: BookmarkBlob) => {
        return +blob.title === date;
    });

    return items.length < 1 ? null : items[0];
}

/**
 * Async function to load the most recent bookmarks
 * @returns {Promise<any>}
 */
export async function loadMostRecentBookmarkBlob(): Promise<BookmarkBlob | null> {
    const items = await readFilesFromStorage<BookmarkBlob>( ( filename, content ) => {
        try {
            const bookmark: BookmarksSchema = JSON.parse( content );
            return {
                uuid: uuidv4(),
                title: filename.split( '.' )[0],
                bookmarks: bookmark
            };
        } catch ( e ) {
            return {
                uuid: uuidv4(),
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
 * Save a blob to the storage named by its created field, replacing if exists
 * @param targetBookmark
 * @returns {Promise<boolean>}
 */
export async function saveBookmarkBlob( targetBookmark: BookmarksSchema ): Promise<boolean> {
    const filename = `bookmark_${targetBookmark.createdAt}.json`;

    try {
        const strContent = JSON.stringify(targetBookmark);
        return await writeFileToStorage(filename, strContent);
    } catch ( e ) {
        return false;
    }
}
