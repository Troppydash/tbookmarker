import { Action } from 'redux';
import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkCommit,
    BookmarkGroup,
} from '../../schemas/bookmarkSchemas';
import { JSONUpdaterOptions } from '../../services/bookmarks/bookmarkCreator';

export const CREATE_SCHEMA = 'CREATE_SCHEMA';
export const CREATE_GROUP = 'CREATE_GROUP';
export const CREATE_BRANCH = 'CREATE_BRANCH';
export const CREATE_COMMIT = 'CREATE_COMMIT';
export const CREATE_BOOKMARK = 'CREATE_BOOKMARK';
export const CREATE_COMMIT_WITH_BOOKMARKS = 'CREATE_COMMIT_WITH_BOOKMARKS';

export const HANDLE_CREATING = 'HANDLE_CREATING';
export const HANDLE_CREATE = 'HANDLE_CREATE';
export const CLEAR_CREATE_ERROR = 'CLEAR_CREATE_ERROR';

export interface IHandleCreating extends Action {
    type: 'HANDLE_CREATING'
}

export interface IClearCreateError extends Action {
    type: 'CLEAR_CREATE_ERROR'
}

export interface IHandleCreate extends Action {
    type: 'HANDLE_CREATE',
    payload: {
        hasError: boolean;
        reason?: string;
    }
}

export interface ICreateSchema extends Action {
    type: 'CREATE_SCHEMA',
    payload: {
        newSchema: BookmarkBlob
    }
}

export interface ICreateBranch extends Action {
    type: 'CREATE_BRANCH'
    payload: {
        newBranch: BookmarkBranch;
        options: JSONUpdaterOptions
    }
}

export interface ICreateGroup extends Action {
    type: 'CREATE_GROUP',
    payload: {
        newGroup: BookmarkGroup;
        options: JSONUpdaterOptions
    }
}

export interface ICreateCommit extends Action {
    type: 'CREATE_COMMIT',
    payload: {
        newCommit: BookmarkCommit,
        options: JSONUpdaterOptions
    }
}

export interface ICreateBookmark extends Action {
    type: 'CREATE_BOOKMARK',
    payload: {
        newBookmark: BookmarkBookmarks,
        options: JSONUpdaterOptions
    }
}

export interface ICreateCommitWithBookmarks extends Action {
    type: 'CREATE_COMMIT_WITH_BOOKMARKS',
    payload: {
        newCommit: BookmarkCommit,
        bookmarks: BookmarkBookmarks[],
        options: JSONUpdaterOptions
    }
}

export type TBookmarkCreateItemTypes =
    ICreateSchema
    | ICreateGroup
    | ICreateBookmark
    | ICreateCommit
    | ICreateBranch
    | ICreateCommitWithBookmarks;

export type TBookmarkCreateActionTypes = IHandleCreate | IClearCreateError | IHandleCreating;
