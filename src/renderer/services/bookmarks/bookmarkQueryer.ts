// Additional JSON implementation options
import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit, BookmarkGroup,
    BookmarksSchema
} from '../../schemas/bookmarkSchemas';

/**
 * Additional JSONQueryer options
 */
export interface JSONQueryerOptions {
    groupID: string;
    branchID: string;
    commitID: string;
    data: BookmarksSchema
}

// Query Service Layer
// UI => dispatch(queryer) => UI
// UI => Actions => dispatch(queryer) => Reducer => Store => UI
export interface BookmarkQueryer {
    /**
     * Select all the bookmark blobs
     */
    selectAll(): Promise<BookmarkBlob[] | null>;

    /**
     * Select the bookmark blob by date
     * @param date
     */
    selectOneByDate( date: number ): Promise<BookmarkBlob | null>;

    /**
     * Select the bookmark blob by most recent
     */
    selectMostRecent(): Promise<BookmarkBlob | null>;

    // Move this
    // saveOne( bookmark: BookmarksSchema ): Promise<boolean>;


    /**
     * Select all branches from groupID
     * @param groupID
     * @param options
     */
    selectBranches( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch[] | null>;

    /**
     * Select all commits from branchID
     * @param branchID
     * @param options
     */
    selectCommits( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit[] | null>;

    /**
     * Select all bookmarks from commitID
     * @param commitID
     * @param options
     */
    selectBookmarks( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks[] | null>;

    /**
     * Select group by its groupID
     * @param groupID
     * @param options
     */
    selectGroupFromGroupID( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkGroup | null>;

    /**
     * Select branch by its branchID
     * @param branchID
     * @param options
     */
    selectBranchFromBranchID( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch | null>;

    /**
     * Select commit by its commitID
     * @param commitID
     * @param options
     */
    selectCommitFromCommitID( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit | null>;

    /**
     * Select bookmark by its bookmarkID
     * @param bookmarkID
     * @param options
     */
    selectBookmarkFromBookmarkID( bookmarkID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks | null>;
}


