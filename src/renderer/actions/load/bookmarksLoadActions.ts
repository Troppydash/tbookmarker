import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    CLEAR_LOAD_ALL_ERROR,
    CLEAR_LOAD_SINGLE_ERROR,
    HANDLE_LOAD_ALL_BLOBS,
    HANDLE_LOAD_SINGLE_BLOB, THandleLoadBlobActions, IClearLoadAllErrorAction, IClearLoadSingleErrorAction,
    IHandleLoadAllBlobsAction,
    IHandleLoadSingleBlobAction,
    ILoadingAllBlobsAction,
    ILoadingSingleBlobAction,
    LOADING_ALL_BLOBS,
    LOADING_SINGLE_BLOB
} from './bookmarksLoadActionsTypes';
import { BookmarkBlob } from '../../schemas/bookmarkSchemas';
import { loadAllBookmarksBlobs, loadMostRecentBookmarkBlob } from '../../services/bookmarksBlobLoader';

export const LoadAllBlobsActionCreator: ActionCreator<ThunkAction<Promise<THandleLoadBlobActions>, unknown, null, THandleLoadBlobActions>>
    = () => async ( dispatch: Dispatch ) => {

    dispatch( LoadingAllBlobsActionCreator() );
    const bookmarks: BookmarkBlob[] | null = await loadAllBookmarksBlobs();
    if ( bookmarks == null ) {
        return dispatch( HandleLoadAllBlobsActionCreator( true, null, 'Unable to get the bookmarks.' ) );
    }
    dispatch( ClearLoadAllErrorActionCreator() );
    return dispatch( HandleLoadAllBlobsActionCreator( false, bookmarks, undefined ) );
};

export const LoadSingleBlobActionCreator: ActionCreator<ThunkAction<Promise<THandleLoadBlobActions>, unknown, null, THandleLoadBlobActions>>
    = () => async ( dispatch: Dispatch ) => {

    dispatch( LoadingSingleBlobActionCreator() );
    const bookmark: BookmarkBlob | null = await loadMostRecentBookmarkBlob();
    if ( bookmark == null ) {
        return dispatch( HandleLoadSingleBlobActionCreator( true, null, 'Unable to get one bookmarks.' ) );
    }
    dispatch( ClearLoadSingleErrorActionCreator() );
    return dispatch( HandleLoadSingleBlobActionCreator( false, bookmark, undefined ) );

};

export const LoadingAllBlobsActionCreator: ActionCreator<ILoadingAllBlobsAction> = () => ({
    type: LOADING_ALL_BLOBS
});

export const LoadingSingleBlobActionCreator: ActionCreator<ILoadingSingleBlobAction> = () => ({
    type: LOADING_SINGLE_BLOB
});

export const HandleLoadAllBlobsActionCreator: ActionCreator<IHandleLoadAllBlobsAction> = (
    hasError: boolean, items: BookmarkBlob[] | null, reason?: string
) => ({
    type: HANDLE_LOAD_ALL_BLOBS,
    payload: {
        hasError,
        items,
        reason
    }
});

export const HandleLoadSingleBlobActionCreator: ActionCreator<IHandleLoadSingleBlobAction> = (
    hasError: boolean, item: BookmarkBlob | null, reason?: string
) => ({
    type: HANDLE_LOAD_SINGLE_BLOB,
    payload: {
        hasError,
        item,
        reason
    }
});

export const ClearLoadAllErrorActionCreator: ActionCreator<IClearLoadAllErrorAction> = () => ({
    type: CLEAR_LOAD_ALL_ERROR
});

export const ClearLoadSingleErrorActionCreator: ActionCreator<IClearLoadSingleErrorAction> = () => ({
    type: CLEAR_LOAD_SINGLE_ERROR
});
