import { ActionCreator, Dispatch } from 'redux';
import {
    CLEAR_SAVE_ERROR,
    HANDLE_SAVE_SINGLE_BLOB, IClearSaveErrorAction,
    IHandleSaveSingleBlobAction,
    ISavingSingleBlobAction,
    SAVING_SINGLE_BLOB, THandleSavingBlobActions
} from './bookmarksSaveActionsTypes';
import { ThunkAction } from 'redux-thunk';
import { BookmarksSchema } from '../../schemas/bookmarkSchemas';
import { Queryer } from '../../services/bookmarks/bookmarkQueryer';
import { DataOrNull } from '../../services/helpers';


/**
 * Save a single bookmark to storage, replace if two createdAt field matches
 * @param bookmark
 * @returns {(dispatch: Dispatch) => Promise<IHandleSaveSingleBlobAction>}
 * @constructor
 */
export const SaveSingleBookmarkBlob: ActionCreator<ThunkAction<Promise<THandleSavingBlobActions>, unknown, BookmarksSchema, THandleSavingBlobActions>>
    = ( bookmark: BookmarksSchema ) => async ( dispatch: Dispatch ) => {
    dispatch( SavingSingleBlobActionCreator() );
    const isSuccess = await DataOrNull( Queryer.saveOne( bookmark ));
    if ( !isSuccess ) {
        return dispatch( HandleSaveSingleBlobActionCreator( true, undefined, 'Failed to save bookmark blob' ) );
    }
    dispatch( ClearSaveErrorActionCreator() );
    return dispatch( HandleSaveSingleBlobActionCreator( false, 'Successfully saved bookmark blob', undefined ) );
};

export const SavingSingleBlobActionCreator: ActionCreator<ISavingSingleBlobAction> = () => ({
    type: SAVING_SINGLE_BLOB
});

export const HandleSaveSingleBlobActionCreator: ActionCreator<IHandleSaveSingleBlobAction> = (
    hasError: boolean, successMessage: string, reason?: string
) => ({
    type: HANDLE_SAVE_SINGLE_BLOB,
    payload: {
        successMessage,
        hasError,
        reason
    }
});

export const ClearSaveErrorActionCreator: ActionCreator<IClearSaveErrorAction> = () => ({
    type: CLEAR_SAVE_ERROR
});
