import { Action, ActionCreator, Dispatch } from 'redux';
import {
    CLEAR_CREATE_ERROR,
    CREATE_BOOKMARK,
    CREATE_BRANCH,
    CREATE_COMMIT,
    CREATE_COMMIT_WITH_BOOKMARKS,
    CREATE_GROUP,
    CREATE_SCHEMA,
    HANDLE_CREATE, HANDLE_CREATING,
    IClearCreateError,
    ICreateBookmark,
    ICreateBranch,
    ICreateCommit,
    ICreateCommitWithBookmarks,
    ICreateGroup,
    ICreateSchema,
    IHandleCreate, IHandleCreating
} from './bookmarksCreateActionsTypes';
import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup,
    BookmarksSchema
} from '../../schemas/bookmarkSchemas';
import { ThunkAction } from 'redux-thunk';
import { Creator, JSONUpdaterOptions } from '../../services/bookmarks/bookmarkCreator';
import { makeBookmarkGroup, makeBookmarksSchema } from '../../schemas/bookmarksEmpty';
import { DataOrError } from '../../services/helpers';

export const CreateSchema: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, null, IHandleCreate>>
    = () => async ( dispatch: Dispatch ) => {

    // Set Loading
    dispatch( HandleCreatingActionCreator() );

    // Create Schema
    const newSchema = makeBookmarksSchema();
    const { data, error } = await DataOrError( Creator.createSchema( newSchema ) );

    // Error Handling
    if ( error !== null ) {
        // Stop loading
        return dispatch( HandleCreateActionCreator( true, error ) );
    }
    // Clear Error
    dispatch( ClearCreateErrorActionCreator() );

    // Cross Reducer Sending
    dispatch( CreateSchemaActionCreator( data ) );

    // Stop loading
    return dispatch( HandleCreateActionCreator( false, undefined ) );
};

export const CreateBranch: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newBranch: BookmarkBranch, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    // Set Loading
    dispatch( HandleCreatingActionCreator() );

    // Create Schema
    const { data, error } = await DataOrError( Creator.createBranch( newBranch, options ) );
    // Error Handling
    if ( error !== null || data == null ) {
        // Stop loading
        return dispatch( HandleCreateActionCreator( true, error ) );
    }
    // Clear Error
    dispatch( ClearCreateErrorActionCreator() );

    // Cross Reducer Sending
    dispatch( CreateBranchActionCreator( data, options ) );

    // Stop loading
    return dispatch( HandleCreateActionCreator( false, undefined ) );
};

export const CreateGroup: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newGroup: BookmarkGroup, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    // Set Loading
    dispatch( HandleCreatingActionCreator() );

    // Create Schema
    const { data, error } = await DataOrError( Creator.createGroup( newGroup, options ) );

    // Error Handling
    if ( error !== null ) {
        // Stop loading
        return dispatch( HandleCreateActionCreator( true, error ) );
    }
    // Clear Error
    dispatch( ClearCreateErrorActionCreator() );

    // Cross Reducer Sending
    dispatch( CreateGroupActionCreator( data, options ) );

    // Stop loading
    return dispatch( HandleCreateActionCreator( false, undefined ) );
};

export const CreateCommit: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newCommit: BookmarkCommit, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    // Set Loading
    dispatch( HandleCreatingActionCreator() );

    // Create Schema
    const { data, error } = await DataOrError( Creator.createCommit( newCommit, options ) );

    // Error Handling
    if ( error !== null ) {
        // Stop loading
        return dispatch( HandleCreateActionCreator( true, error ) );
    }
    // Clear Error
    dispatch( ClearCreateErrorActionCreator() );

    // Cross Reducer Sending
    dispatch( CreateCommitActionCreator( data, options ) );

    // Stop loading
    return dispatch( HandleCreateActionCreator( false, undefined ) );
};
export const CreateBookmark: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newBookmark: BookmarkBookmarks, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    // Set Loading
    dispatch( HandleCreatingActionCreator() );

    // Create Schema
    const { data, error } = await DataOrError( Creator.createBookmark( newBookmark, options ) );

    // Error Handling
    if ( error !== null ) {
        // Stop loading
        return dispatch( HandleCreateActionCreator( true, error ) );
    }
    // Clear Error
    dispatch( ClearCreateErrorActionCreator() );

    // Cross Reducer Sending
    dispatch( CreateBookmarkActionCreator( data, options ) );

    // Stop loading
    return dispatch( HandleCreateActionCreator( false, undefined ) );
};

export const HandleCreatingActionCreator: ActionCreator<IHandleCreating> = () => ({
    type: HANDLE_CREATING
});


export const CreateSchemaActionCreator: ActionCreator<ICreateSchema> = (
    newSchema: BookmarkBlob
) => ({
    type: CREATE_SCHEMA,
    payload: {
        newSchema
    }
});

export const CreateBranchActionCreator: ActionCreator<ICreateBranch> = (
    newBranch: BookmarkBranch, options: JSONUpdaterOptions
) => ({
    type: CREATE_BRANCH,
    payload: {
        newBranch,
        options
    }
});

export const CreateCommitActionCreator: ActionCreator<ICreateCommit> = (
    newCommit: BookmarkCommit, options: JSONUpdaterOptions
) => ({
    type: CREATE_COMMIT,
    payload: {
        newCommit,
        options
    }
});

export const CreateBookmarkActionCreator: ActionCreator<ICreateBookmark> = (
    newBookmark: BookmarkBookmarks, options: JSONUpdaterOptions
) => ({
    type: CREATE_BOOKMARK,
    payload: {
        newBookmark,
        options
    }
});

export const CreateGroupActionCreator: ActionCreator<ICreateGroup> = (
    newGroup: BookmarkGroup, options: JSONUpdaterOptions
) => ({
    type: CREATE_GROUP,
    payload: {
        newGroup,
        options
    }
});

export const CreateCommitWithBookmarksActionCreator: ActionCreator<ICreateCommitWithBookmarks> = (
    newCommit: BookmarkCommit,
    bookmarks: BookmarkBookmarks[],
    options: JSONUpdaterOptions
) => ({
    type: CREATE_COMMIT_WITH_BOOKMARKS,
    payload: {
        newCommit,
        bookmarks,
        options
    }
});


export const HandleCreateActionCreator: ActionCreator<IHandleCreate> = (
    hasError: boolean, reason?: string
) => ({
    type: HANDLE_CREATE,
    payload: {
        hasError,
        reason
    }
});

export const ClearCreateErrorActionCreator: ActionCreator<IClearCreateError> = () => ({
    type: CLEAR_CREATE_ERROR
});
