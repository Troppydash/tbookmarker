import { Action } from 'redux';

export const SAVING_SINGLE_BLOB = 'SAVING_SINGLE_BLOB';
export const HANDLE_SAVE_SINGLE_BLOB = 'HANDLE_SAVE_SINGLE_BLOB';

export const CLEAR_SAVE_ERROR = 'CLEAR_SAVE_ERROR';

export interface ISavingSingleBlobAction extends Action {
    type: 'SAVING_SINGLE_BLOB',
}

export interface IHandleSaveSingleBlobAction extends Action {
    type: 'HANDLE_SAVE_SINGLE_BLOB',
    payload: {
        successMessage?: string;
        hasError: boolean;
        reason?: string;
    }
}

export interface IClearSaveErrorAction extends Action {
    type: 'CLEAR_SAVE_ERROR'
}

export type TSavingBlobActions = ISavingSingleBlobAction;

export type THandleSavingBlobActions = IHandleSaveSingleBlobAction;

export type TClearSaveErrorActions = IClearSaveErrorAction;

export type TSaveBlobActions = TSavingBlobActions | THandleSavingBlobActions | TClearSaveErrorActions;
