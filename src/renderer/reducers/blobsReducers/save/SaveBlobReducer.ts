import { Reducer } from 'redux';
import { TSaveBlobActions } from '../../../actions/save/bookmarksSaveActionsTypes';

export interface ISaveBlobState {
    readonly hasError: boolean;
    readonly successMessage?: string;
    readonly reason?: string;
    readonly isLoading: boolean;
}

const initialState: ISaveBlobState = {
    hasError: false,
    successMessage: undefined,
    reason: undefined,
    isLoading: false
};

export const SaveBlobReducer: Reducer<ISaveBlobState, TSaveBlobActions> = (
    state = initialState,
    action
) => {
    switch ( action.type ) {
        case 'CLEAR_SAVE_ERROR': {
            return {
                ...state,
                hasError: false,
                reason: undefined
            };
        }
        case 'SAVING_SINGLE_BLOB': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'HANDLE_SAVE_SINGLE_BLOB': {
            const { hasError, successMessage, reason } = action.payload;
            return {
                ...state,
                isLoading: false,
                hasError,
                successMessage,
                reason
            };
        }
        default:
            return state;
    }
};
