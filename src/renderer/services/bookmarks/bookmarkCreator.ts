import {
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup,
    BookmarksSchema
} from '../../schemas/bookmarkSchemas';
import { saveBookmarkBlob } from '../jsonBookmarksHandler';

// Additional JSON implementation options
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
    createSchema( newSchema: BookmarksSchema ): Promise<BookmarksSchema | null>;

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

export class JSONCreator implements BookmarkCreator {
    createGroup( newGroup: BookmarkGroup, options?: JSONUpdaterOptions ): Promise<BookmarkGroup | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( 'No options specified' );
            }
            const newSchema = options.data;
            newSchema.data.push( newGroup );
            const success = await saveBookmarkBlob( newSchema );

            if ( success ) {
                return resolve( newGroup );
            } else {
                return reject( 'Something went wrong saving the group' );
            }
        } );
    }

    createCommit( newCommit: BookmarkCommit, options?: JSONUpdaterOptions ): Promise<BookmarkCommit | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( 'No options specified' );
            }
            const newSchema = options.data;

            const selectedGroup = newSchema.data.find( g => g.uuid === options.groupID );
            if ( !selectedGroup ) {
                return reject( 'Cannot find the selected group' );
            }

            const selectedBranch = selectedGroup.branches.find( b => b.uuid === options.branchID );
            if ( !selectedBranch ) {
                return reject( 'Cannot find the selected branch' );
            }

            selectedBranch.commits.push( newCommit );

            const success = await saveBookmarkBlob( newSchema );

            if ( success ) {
                return resolve( newCommit );
            } else {
                return reject( 'Something went wrong saving the branch' );
            }
        } );
    }

    createBookmark( newBookmark: BookmarkBookmarks, options?: JSONUpdaterOptions ): Promise<BookmarkBookmarks | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( 'No options specified' );
            }
            const newSchema = options.data;

            const selectedGroup = newSchema.data.find( g => g.uuid === options.groupID );
            if ( !selectedGroup ) {
                return reject( 'Cannot find the selected group' );
            }

            const selectedBranch = selectedGroup.branches.find( b => b.uuid === options.branchID );
            if ( !selectedBranch ) {
                return reject( 'Cannot find the selected branch' );
            }

            const selectedCommit = selectedBranch.commits.find( c => c.uuid === options.commitID );
            if ( !selectedCommit ) {
                return reject( 'Cannot find the selected branch' );
            }

            selectedCommit.bookmarks.push( newBookmark );

            const success = await saveBookmarkBlob( newSchema );

            if ( success ) {
                return resolve( newBookmark );
            } else {
                return reject(
                    'Something went wrong saving the branch' );
            }
        } );
    }

    createBranch( newBranch: BookmarkBranch, options?: JSONUpdaterOptions ): Promise<BookmarkBranch | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( 'No options specified' );
            }
            const newSchema = options.data;

            const selectedGroup = newSchema.data.find( g => g.uuid === options.groupID );
            if ( !selectedGroup ) {
                return reject( 'Cannot find the selected group' );
            }

            selectedGroup.branches.push( newBranch );

            const success = await saveBookmarkBlob( newSchema );

            if ( success ) {
                return resolve( newBranch );
            } else {
                return reject( 'Something went wrong saving the branch' );
            }
        } );
    }


    createSchema( newSchema: BookmarksSchema ): Promise<BookmarksSchema | null> {
        return new Promise( async ( resolve, reject ) => {
            const success = await saveBookmarkBlob( newSchema );
            if ( !success ) {
                reject( 'Something went wrong creating the schema' );
            } else {
                resolve( newSchema );
            }
        } );
    }

    createCommitWithBookmarks( newCommit: BookmarkCommit, bookmarks: BookmarkBookmarks[], options?: JSONUpdaterOptions ): Promise<BookmarkCommit | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( 'No options specified' );
            }
            newCommit.bookmarks = bookmarks;
            return this.createCommit(newCommit, options);
        });
    }

}

export const Creator: BookmarkCreator = new JSONCreator();
