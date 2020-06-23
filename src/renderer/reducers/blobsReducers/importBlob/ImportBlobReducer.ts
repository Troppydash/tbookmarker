import { Reducer } from 'redux';
import { TImportBlobActionTypes } from '../../../actions/importBlob/importBlobActionTypes';

export interface IImportBlobState {
    readonly hasError: boolean;
    readonly reason?: string;
    readonly isLoading: boolean;
}

const initialState: IImportBlobState = {
    hasError: false,
    reason: undefined,
    isLoading: false
};

export const ImportBlobReducer: Reducer<IImportBlobState, TImportBlobActionTypes> = (
    state = initialState,
    action
) => {

    switch ( action.type ) {

        case 'START_IMPORTING': {
            return {
                ...state,
                isLoading: true,
            }
        }
        case 'CLEAR_IMPORT_ERRORS': {
            return {
                ...state,
                isLoading: false,
                hasError: false,
                reason: undefined
            }
        }

        case 'HANDLE_ERROR': {
            return {
                ...state,
                isLoading: false,
                hasError: true,
                reason: action.payload.reason
            }
        }
        default:
            return state;
    }
};

