// Additional JSON implementation options
import {
    BookmarkBlob, BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup,
    BookmarksSchema
} from '../../schemas/bookmarkSchemas';

/**
 * Additional JSONUpdater Options
 */
export interface JSONUpdaterOptions {
    groupID: string;
    branchID: string;
    commitID: string;
    data: BookmarksSchema
}


// Create Service Layer
// UI => Actions => dispatch(creator) => Reducer => Store => UI
export interface BookmarkCreator {

    /**
     * Create a new Schema
     */
    createSchema( newSchema: BookmarksSchema ): Promise<BookmarkBlob | null>;

    /**
     * Create a new group
     * @param newGroup
     * @param options
     */
    createGroup( newGroup: BookmarkGroup, options?: JSONUpdaterOptions ): Promise<BookmarkGroup | null>;

    /**
     * Create a new branch
     * @param newBranch
     * @param options
     */
    createBranch( newBranch: BookmarkBranch, options?: JSONUpdaterOptions ): Promise<BookmarkBranch | null>;

    /**
     * Create a new commit
     * @param newCommit
     * @param options
     */
    createCommit( newCommit: BookmarkCommit, options?: JSONUpdaterOptions ): Promise<BookmarkCommit | null>;

    /**
     * Create new bookmarks
     * @param newBookmark
     * @param options
     */
    createBookmark( newBookmark: BookmarkBookmarks, options?: JSONUpdaterOptions ): Promise<BookmarkBookmarks | null>;

    /**
     * Create a commit with bookmarks
     * @param newCommit
     * @param bookmarks
     * @param options
     */
    createCommitWithBookmarks( newCommit: BookmarkCommit, bookmarks: BookmarkBookmarks[], options?: JSONUpdaterOptions ): Promise<BookmarkCommit | null>;
}
