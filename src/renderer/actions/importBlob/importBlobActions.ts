import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    CLEAR_IMPORT_ERRORS, HANDLE_ERROR, HANDLE_IMPORT,
    IClearImportErrors, IHandleError,
    IHandleImport,
    IStartImporting,
    START_IMPORTING
} from './importBlobActionTypes';
import { BookmarkBlob } from '../../schemas/bookmarkSchemas';
import { DataOrError } from '../../helpers/promiseHelpers';
import { Importer } from '../../services/bookmarks/exports';

/**
 * Action Creator to import a blob from storage
 * @constructor
 */
export const ImportBlob: ActionCreator<ThunkAction<Promise<IHandleImport | IHandleError>, unknown, null, IHandleImport | IHandleError>>
    = () => async ( dispatch: Dispatch ) => {

    dispatch( StartImportingActionCreator() );

    const { data, error } = await DataOrError( Importer.import() );

    if ( error ) {
        return dispatch( HandleErrorActionCreator(error) );
    }

    dispatch( ClearImportErrorsActionCreator() );

    return dispatch( HandleImportActionCreator( data ) );
};

export const HandleImportActionCreator: ActionCreator<IHandleImport>
    = ( newBlob: BookmarkBlob ) => ({
    type: HANDLE_IMPORT,
    payload: {
        newBlob
    }
});

export const HandleErrorActionCreator: ActionCreator<IHandleError>
 = (reason: string) => ({
    type: HANDLE_ERROR,
    payload: {
        reason
    }
})
export const StartImportingActionCreator: ActionCreator<IStartImporting>
    = () => ({
    type: START_IMPORTING
});

export const ClearImportErrorsActionCreator: ActionCreator<IClearImportErrors>
    = () => ({
    type: CLEAR_IMPORT_ERRORS
});
