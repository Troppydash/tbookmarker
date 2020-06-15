import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup, BookmarksSchema
} from '../../../schemas/bookmarkSchemas';
import {
    loadAllBookmarksBlobs,
    loadBookmarkBlobByDate,
    loadMostRecentBookmarkBlob,
    saveBookmarkBlob
} from './jsonBookmarksHelpers';
import { BookmarkQueryer, JSONQueryerOptions } from '../bookmarkQueryer';

/**
 * JSON Implementation of bookmarkQueryer
 */
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



