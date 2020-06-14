import { Reducer } from 'redux';
import { TBookmarkCreateActionTypes } from '../../../actions/create/bookmarksCreateActionsTypes';

export interface ICreateBlobState {
    readonly hasError: boolean;
    readonly reason?: string;
    readonly isLoading: boolean;
}

const initialState: ICreateBlobState = {
    hasError: false,
    reason: undefined,
    isLoading: false
};

export const CreateBlobReducer: Reducer<ICreateBlobState, TBookmarkCreateActionTypes> = (
    state = initialState,
    action
) => {
    switch (action.type ) {
        case 'CLEAR_CREATE_ERROR': {
            return {
                ...state,
                hasError: false,
                reason: undefined,
            }
        }
        case 'HANDLE_CREATING': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'HANDLE_CREATE': {
            return {
                ...state,
                isLoading: false,
                hasError: action.payload.hasError,
                reason: action.payload.reason
            }
        }
        default:
            return state;
    }
};
