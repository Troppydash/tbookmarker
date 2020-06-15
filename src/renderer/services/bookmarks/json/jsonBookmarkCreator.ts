import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup,
    BookmarksSchema
} from '../../../schemas/bookmarkSchemas';

import _ from 'lodash';
import { BookmarkCreator, JSONUpdaterOptions } from '../bookmarkCreator';
import { saveBookmarkBlob } from './jsonBookmarksHelpers';


/**
 * JSON implementation of the bookmarkCreator
 */
export class JSONCreator implements BookmarkCreator {
    createGroup( newGroup: BookmarkGroup, options?: JSONUpdaterOptions ): Promise<BookmarkGroup | null> {
        return new Promise( async ( resolve, reject ) => {
            if ( !options ) {
                return reject( 'No options specified' );
            }
            const newSchema = _.cloneDeep(options.data);
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
            const newSchema = _.cloneDeep(options.data);

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
            const newSchema = _.cloneDeep(options.data);

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

            const newSchema = _.cloneDeep(options.data);

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


    createSchema( newSchema: BookmarksSchema ): Promise<BookmarkBlob | null> {
        return new Promise( async ( resolve, reject ) => {
            const blob = await saveBookmarkBlob( newSchema );
            if ( blob == null ) {
                return reject( 'Something went wrong creating the schema' );
            } else {
                return resolve( blob );
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

