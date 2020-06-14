import { v4 as uuidv4 } from 'uuid';
import { GetCurrentDate } from '../services/helpers';
import {
    BookmarkBlob,
    BookmarkBookmarks,
    BookmarkBranch,
    BookmarkBranchFrom,
    BookmarkCommit, BookmarkGroup,
    BookmarkMergedWith, BookmarksSchema
} from './bookmarkSchemas';

/**
 * Create an empty bookmark
 * @returns {{uuid: string ; url: string}}
 */
export function makeBookmarkBookmarks(): BookmarkBookmarks {
    return {
        uuid: uuidv4(),
        url: ''
    };
}

/**
 * Create an empty commit
 * @returns {{bookmarks: any[]; createdAt: number; title: string; uuid: string}}
 */
export function makeBookmarkCommit(): BookmarkCommit {
    return {
        uuid: uuidv4(),
        title: '',
        createdAt: GetCurrentDate(),
        bookmarks: []
    };
}

/**
 * Create an empty branch from property
 * @returns {{createdAt: number ; branchName: string ; commitId: string}}
 */
export function makeBookmarkBranchFrom(): BookmarkBranchFrom {
    return {
        commitId: '',
        branchName: '',
        createdAt: GetCurrentDate()
    };
}


/**
 * Create an empty merged with property
 * @returns {{createdAt: number ; branchName: string ; commitId: string}}
 */
export function makeBookmarkMergedWith(): BookmarkMergedWith {
    return {
        commitId: '',
        branchName: '',
        createdAt: GetCurrentDate()
    };
}

/**
 * Create an empty branch
 * @returns {{createdAt: number; mergedWith: null; branchedFrom: null; name: string; commits: any[]; uuid: string}}
 */
export function makeBookmarkBranch(): BookmarkBranch {
    return {
        uuid: uuidv4(),
        name: '',
        createdAt: GetCurrentDate(),
        branchedFrom: null,
        mergedWith: null,
        commits: []
    };
}

/**
 * Create an empty group
 * @returns {{createdAt: number; name: string; branches: any[]; uuid: string}}
 */
export function makeBookmarkGroup(): BookmarkGroup {
    return {
        uuid: uuidv4(),
        name: '',
        createdAt: GetCurrentDate(),
        branches: []
    };
}

/**
 * Create an empty schema
 * @returns {{createdAt: number; lastModifiedAt: number; data: any[]; uuid: string}}
 */
export function makeBookmarksSchema(): BookmarksSchema {
    return {
        uuid: uuidv4(),
        createdAt: GetCurrentDate(),
        lastModifiedAt: GetCurrentDate(),

        data: []
    };
}

/**
 * Create an empty blob
 * @returns {{bookmarks: null ; title: string ; uuid: string}}
 */
export function makeBookmarkBlob(): BookmarkBlob {
    return {
        title: '',
        uuid: uuidv4(),
        bookmarks: null
    };
}
