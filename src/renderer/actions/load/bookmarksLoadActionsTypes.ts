import { Action } from 'redux';
import { BookmarkBlob } from '../../schemas/bookmarkSchemas';

export const LOADING_ALL_BLOBS = 'LOADING_ALL_BLOBS';
export const LOADING_SINGLE_BLOB = 'LOADING_SINGLE_BLOB';

export const HANDLE_LOAD_ALL_BLOBS = 'HANDLE_LOAD_ALL_BLOBS';
export const HANDLE_LOAD_SINGLE_BLOB = 'HANDLE_LOAD_SINGLE_BLOB';

export const CLEAR_LOAD_ALL_ERROR = 'CLEAR_LOAD_ALL_ERROR';
export const CLEAR_LOAD_SINGLE_ERROR = 'CLEAR_LOAD_SINGLE_ERROR';

export interface ILoadingAllBlobsAction extends Action {
    type: 'LOADING_ALL_BLOBS';
}

export interface ILoadingSingleBlobAction extends Action {
    type: 'LOADING_SINGLE_BLOB';
}


export interface IHandleLoadSingleBlobAction extends Action {
    type: 'HANDLE_LOAD_SINGLE_BLOB',
    payload: {
        hasError: boolean;
        item: BookmarkBlob | null;
        reason?: string;
    }
}

export interface IHandleLoadAllBlobsAction extends Action {
    type: 'HANDLE_LOAD_ALL_BLOBS',
    payload: {
        hasError: boolean;
        items: BookmarkBlob[] | null;
        reason?: string;
    }
}

export interface IClearLoadAllErrorAction extends Action {
    type: 'CLEAR_LOAD_ALL_ERROR'
}

export interface IClearLoadSingleErrorAction extends Action {
    type: 'CLEAR_LOAD_SINGLE_ERROR'
}

export type TLoadingBlobActions = ILoadingAllBlobsAction | ILoadingSingleBlobAction;

export type THandleLoadBlobActions = IHandleLoadAllBlobsAction | IHandleLoadSingleBlobAction;


export type TClearLoadErrorActions = IClearLoadAllErrorAction | IClearLoadSingleErrorAction;

export type TAllBlobsActions = ILoadingAllBlobsAction | IHandleLoadAllBlobsAction | IClearLoadAllErrorAction;

export type TSingleBlobActions = ILoadingSingleBlobAction | IHandleLoadSingleBlobAction | IClearLoadSingleErrorAction;

