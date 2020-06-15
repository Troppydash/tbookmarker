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
import { DataOrNull } from '../../helpers/promiseHelpers';
import { Queryer } from '../../services/bookmarks/exports';


/**
 * Load all bookmarks it can find
 * @returns {(dispatch: Dispatch) => Promise<IHandleLoadAllBlobsAction>}
 * @constructor
 */
export const LoadAllBlobs: ActionCreator<ThunkAction<Promise<THandleLoadBlobActions>, unknown, null, THandleLoadBlobActions>>
    = () => async ( dispatch: Dispatch ) => {

    dispatch( LoadingAllBlobsActionCreator() );
    const bookmarks: BookmarkBlob[] | null = await DataOrNull( Queryer.selectAll());
    if ( bookmarks == null ) {
        return dispatch( HandleLoadAllBlobsActionCreator( true, null, 'Unable to get the bookmarks.' ) );
    }
    dispatch( ClearLoadAllErrorActionCreator() );
    return dispatch( HandleLoadAllBlobsActionCreator( false, bookmarks, undefined ) );
};

/**
 * Load a single bookmark from storage, Default to most recent if date not specified
 * @returns {(dispatch: Dispatch) => Promise<IHandleLoadSingleBlobAction>}
 * @constructor
 */
export const LoadSingleBlob: ActionCreator<ThunkAction<Promise<THandleLoadBlobActions>, unknown, number, THandleLoadBlobActions>>
    = ( date?: number ) => async ( dispatch: Dispatch ) => {

    dispatch( LoadingSingleBlobActionCreator() );

    const bookmark: BookmarkBlob | null =
        date
            ? await DataOrNull( Queryer.selectOneByDate( date ) )
            : await DataOrNull( Queryer.selectMostRecent() );
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
