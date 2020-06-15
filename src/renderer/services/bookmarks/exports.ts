import { BookmarkQueryer } from './bookmarkQueryer';
import { BookmarkCreator } from './bookmarkCreator';
import { JSONQueryer } from './json/jsonBookmarkQueryer';
import { JSONCreator } from './json/jsonBookmarkCreator';


/**
 * Fake DI Queryer
 * @type {JSONQueryer}
 */
export const Queryer: BookmarkQueryer = new JSONQueryer();

/**
 * Fake DI Creator
 * @type {JSONCreator}
 */
export const Creator: BookmarkCreator = new JSONCreator();
