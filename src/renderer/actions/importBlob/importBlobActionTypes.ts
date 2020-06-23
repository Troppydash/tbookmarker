import { Action } from 'redux';
import { BookmarkBlob } from '../../schemas/bookmarkSchemas';

// Set loading
export const START_IMPORTING = 'START_IMPORTING';

// Set New Value and Error
export const HANDLE_IMPORT = 'HANDLE_IMPORT';

export const HANDLE_ERROR = 'HANDLE_ERROR';

// Clear Errors
export const CLEAR_IMPORT_ERRORS = 'CLEAR_IMPORT_ERRORS';

export interface IStartImporting extends Action {
    type: 'START_IMPORTING'
}

export interface IHandleImport extends Action {
    type: 'HANDLE_IMPORT',
    payload: {
        newBlob: BookmarkBlob
    }
}

export interface IHandleError extends Action {
    type: 'HANDLE_ERROR',
    payload: {
        reason: string,
    }
}

export interface IClearImportErrors extends Action {
    type: 'CLEAR_IMPORT_ERRORS'
}

export type THandleImportActionType = IHandleImport;

// Excluding Handle Import
export type TImportBlobActionTypes = IStartImporting | IClearImportErrors | IHandleError;
