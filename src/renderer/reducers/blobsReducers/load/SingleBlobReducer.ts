import { BookmarkBlob } from '../../../schemas/bookmarkSchemas';
import { Reducer } from 'redux';
import { TSingleBlobActions } from '../../../actions/load/bookmarksLoadActionsTypes';

export interface ISingleBlobsState {
    readonly hasError: boolean;
    readonly item: BookmarkBlob | null;
    readonly reason?: string;
    readonly isLoading: boolean;
}

const initialState: ISingleBlobsState = {
    hasError: false,
    item: null,
    reason: undefined,
    isLoading: false
};

export const SingleBlobsReducer: Reducer<ISingleBlobsState, TSingleBlobActions> = (
    state = initialState,
    action
) => {
    switch ( action.type ) {
        case 'CLEAR_LOAD_SINGLE_ERROR': {
            return {
                ...state,
                hasError: false,
                reason: undefined
            };
        }
        case 'LOADING_SINGLE_BLOB': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'HANDLE_LOAD_SINGLE_BLOB': {
            const { hasError, item, reason } = action.payload;
            return {
                ...state,
                isLoading: false,
                hasError,
                item,
                reason
            };
        }
        default:
            return state;
    }
};
