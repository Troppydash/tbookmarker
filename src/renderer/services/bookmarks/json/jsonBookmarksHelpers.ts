/// Manages the loading and saving of bookmarks

import { BookmarkBlob, BookmarksSchema } from '../../../schemas/bookmarkSchemas';
import { GetApplicationBookmarkStoragePath, readFilesFromStorage, writeFileToStorage } from '../../storage/storageHandlers';

import { v4 as uuidv4 } from 'uuid';
import { makeBookmarkBlob } from '../../../schemas/bookmarksEmpty';

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
            // TODO: Change this to use the new method
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
export async function saveBookmarkBlob( targetBookmark: BookmarksSchema ): Promise<BookmarkBlob | null> {
    const filename = `bookmark_${targetBookmark.createdAt}.json`;

    try {
        const strContent = JSON.stringify(targetBookmark);
        const success = await writeFileToStorage(filename, strContent);
        if (success) {
            let blob = makeBookmarkBlob();
            blob.bookmarks = targetBookmark;
            blob.title = filename.split('.')[0];
            return blob;
        } else {
            return null;
        }
    } catch ( e ) {
        return null;
    }
}

/**
 * Returns a promise that contains a boolean indicting whether any json valid bookmark files exist in default storage
 * @returns {Promise<boolean>}
 */
export async function doesAnyBookmarksExist(): Promise<boolean> {
    const allBookmarks = await loadAllBookmarksBlobs();
    if (!allBookmarks || allBookmarks.length == 0) {
        return false;
    }

    const length = allBookmarks.length;
    let times = 0;
    allBookmarks.forEach(bookmark => {
        if (bookmark.bookmarks == null) {
            times += 1;
        }
    })
    return times != length;
}

