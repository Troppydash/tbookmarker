import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup, BookmarksSchema
} from '../../schemas/bookmarkSchemas';
import {
    loadAllBookmarksBlobs,
    loadBookmarkBlobByDate,
    loadMostRecentBookmarkBlob,
    saveBookmarkBlob
} from '../jsonBookmarksHandler';

// Additional JSON implementation options
interface JSONQueryerOptions {
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

export class JSONQueryer implements BookmarkQueryer {
    selectAll(): Promise<BookmarkBlob[] | null> {
        return loadAllBookmarksBlobs();
    }

    selectBookmarks( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks[] | null> {
        return new Promise( (async ( resolve, reject ) => {
            if ( !options ) {
                return reject( "No options specified" );
            }
            const commits = await this.selectCommits( options?.commitID as string, options );
            return resolve( commits?.find( c => c.uuid === options?.commitID )?.bookmarks );
        }) );
    }

    selectBranches( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch[] | null> {
        return new Promise( (( resolve, reject ) => {
            if ( !options ) {
                return reject( "No options specified" );
            }
            return resolve( options?.data.data.find( g => g.uuid === options?.groupID )?.branches );
        }) );
    }

    selectCommits( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit[] | null> {
        return new Promise( (async ( resolve, reject ) => {
            if ( !options ) {
                return reject( "No options specified" );
            }

            const branches = await this.selectBranches( options?.branchID as string, options );
            return resolve( branches?.find( b => b.uuid === options?.branchID )?.commits || null );
        }) );
    }

    selectMostRecent(): Promise<BookmarkBlob | null> {
        return loadMostRecentBookmarkBlob();
    }

    selectOneByDate( date: number ): Promise<BookmarkBlob | null> {
        return loadBookmarkBlobByDate( date );
    }

    // saveOne( bookmark: BookmarksSchema ): Promise<boolean> {
    //     return saveBookmarkBlob( bookmark );
    // }

    selectBookmarkFromBookmarkID( bookmarkID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( "No options specified" );
            }

            const bookmarks = await this.selectBookmarks( options?.commitID as string, options );
            if ( bookmarks == null ) {
                return reject( "Something went wrong fetching bookmarks" );
            }

            resolve( bookmarks?.find( b => b.uuid === bookmarkID ) || null );
        } );
    }

    selectBranchFromBranchID( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( "No options specified" );
            }

            const branches = await this.selectBranches( options?.groupID as string, options );
            if ( branches == null ) {
                return reject( "Something went wrong fetching branches" );
            }

            resolve( branches?.find( b => b.uuid === branchID ) || null );
        } );
    }

    selectCommitFromCommitID( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( "No options specified" );
            }

            const commits = await this.selectCommits( options?.branchID as string, options );
            if ( commits == null ) {
                return reject( "Something went wrong fetching commits" );
            }

            resolve( commits?.find( c => c.uuid === commitID ) || null );
        } );
    }

    selectGroupFromGroupID( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkGroup | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( "No options specified" );
            }

            resolve(options?.data.data.find( g => g.uuid === options?.groupID ));
        } );
    }

}


export const Queryer: BookmarkQueryer = new JSONQueryer();
