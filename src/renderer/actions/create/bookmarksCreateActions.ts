import { ActionCreator, Dispatch } from 'redux';
import {
    CLEAR_CREATE_ERROR,
    CREATE_BOOKMARK,
    CREATE_BRANCH,
    CREATE_COMMIT,
    CREATE_COMMIT_WITH_BOOKMARKS,
    CREATE_GROUP,
    CREATE_SCHEMA,
    HANDLE_CREATE,
    IClearCreateError,
    ICreateBookmark,
    ICreateBranch,
    ICreateCommit,
    ICreateCommitWithBookmarks,
    ICreateGroup,
    ICreateSchema,
    IHandleCreate
} from './bookmarksCreateActionsTypes';
import {
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup,
    BookmarksSchema
} from '../../schemas/bookmarkSchemas';
import { ThunkAction } from 'redux-thunk';
import { THandleLoadBlobActions } from '../load/bookmarksLoadActionsTypes';
import { JSONUpdaterOptions } from '../../services/bookmarks/bookmarkCreator';

// TODO: Implement this
export const CreateSchema: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newSchema: BookmarksSchema
) => async ( dispatch: Dispatch ) => {
    return dispatch( HandleCreateActionCreator( false, 'Success', undefined ) );
};

export const CreateBranch: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newBranch: BookmarkBranch, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    return dispatch( HandleCreateActionCreator( false, 'Success', undefined ) );
};

export const CreateGroup: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newBranch: BookmarkBranch, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    return dispatch( HandleCreateActionCreator( false, 'Success', undefined ) );
};

export const CreateCommit: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newCommit: BookmarkCommit, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    return dispatch( HandleCreateActionCreator( false, 'Success', undefined ) );
};
export const CreateBookmark: ActionCreator<ThunkAction<Promise<IHandleCreate>, unknown, any, IHandleCreate>> = (
    newBranch: BookmarkBranch, options: JSONUpdaterOptions
) => async ( dispatch: Dispatch ) => {
    return dispatch( HandleCreateActionCreator( false, 'Success', undefined ) );
};


export const CreateSchemaActionCreator: ActionCreator<ICreateSchema> = (
    newSchema: BookmarksSchema
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
        options,
    }
});


export const HandleCreateActionCreator: ActionCreator<IHandleCreate> = (
    hasError: boolean, successMessage?: string, reason?: string
) => ({
    type: HANDLE_CREATE,
    payload: {
        hasError,
        successMessage,
        reason
    }
});

export const ClearCreateErrorActionCreator: ActionCreator<IClearCreateError> = () => ({
    type: CLEAR_CREATE_ERROR
});
