import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup, BookmarksSchema
} from '../schemas/bookmarkSchemas';
import {
    loadAllBookmarksBlobs,
    loadBookmarkBlobByDate,
    loadMostRecentBookmarkBlob,
    saveBookmarkBlob
} from './bookmarksBlobLoader';

interface JSONQueryerOptions {
    groupID?: string;
    branchID?: string;
    commitID?: string;
    data: BookmarksSchema
}

export interface BookmarkQueryer {
    selectAll(): Promise<BookmarkBlob[] | null>;

    selectOneByDate( date: number ): Promise<BookmarkBlob | null>;

    selectMostRecent(): Promise<BookmarkBlob | null>;

    saveOne( bookmark: BookmarksSchema ): Promise<boolean>;

    selectBranches( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch[] | null>;

    selectCommits( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit[] | null>;

    selectBookmarks( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks[] | null>;

    selectGroupFromGroupID( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkGroup | null>;

    selectBranchFromBranchID( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch | null>;

    selectCommitFromCommitID( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit | null>;

    selectBookmarkFromBookmarkID( bookmarkID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks | null>;
}

export class JSONQueryer implements BookmarkQueryer {
    selectAll(): Promise<BookmarkBlob[] | null> {
        return loadAllBookmarksBlobs();
    }

    selectBookmarks( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks[] | null> {
        return new Promise( (async ( resolve ) => {
            if ( !options ) {
                resolve( null );
            }
            const commits = await this.selectCommits( options?.commitID as string, options );
            return resolve( commits?.find( c => c.uuid === options?.commitID )?.bookmarks );
        }) );
    }

    selectBranches( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch[] | null> {
        return new Promise( (( resolve ) => {
            if ( !options ) {
                resolve( null );
            }
            return resolve( options?.data.data.find( g => g.uuid === options?.groupID )?.branches );
        }) );
    }

    selectCommits( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit[] | null> {
        return new Promise( (async ( resolve ) => {
            if ( !options ) {
                resolve( null );
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

    saveOne( bookmark: BookmarksSchema ): Promise<boolean> {
        return saveBookmarkBlob( bookmark );
    }

    selectBookmarkFromBookmarkID( bookmarkID: string, options?: JSONQueryerOptions ): Promise<BookmarkBookmarks | null> {
        return new Promise( async ( resolve ) => {
            if ( !options ) {
                resolve( null );
            }

            const bookmarks = await this.selectBookmarks( options?.commitID as string, options );
            if ( bookmarks == null ) {
                resolve( null );
            }

            resolve( bookmarks?.find( b => b.uuid === bookmarkID ) || null );
        } );
    }

    selectBranchFromBranchID( branchID: string, options?: JSONQueryerOptions ): Promise<BookmarkBranch | null> {
        return new Promise( async ( resolve ) => {
            if ( !options ) {
                resolve( null );
            }

            const branches = await this.selectBranches( options?.groupID as string, options );
            if ( branches == null ) {
                resolve( null );
            }

            resolve( branches?.find( b => b.uuid === branchID ) || null );
        } );
    }

    selectCommitFromCommitID( commitID: string, options?: JSONQueryerOptions ): Promise<BookmarkCommit | null> {
        return new Promise( async ( resolve ) => {
            if ( !options ) {
                resolve( null );
            }

            const commits = await this.selectCommits( options?.branchID as string, options );
            if ( commits == null ) {
                resolve( null );
            }

            resolve( commits?.find( c => c.uuid === commitID ) || null );
        } );
    }

    selectGroupFromGroupID( groupID: string, options?: JSONQueryerOptions ): Promise<BookmarkGroup | null> {
        return new Promise( async ( resolve ) => {
            if ( !options ) {
                resolve( null );
            }

            resolve(options?.data.data.find( g => g.uuid === options?.groupID ));
        } );
    }

}


export const Queryer: BookmarkQueryer = new JSONQueryer();
