import { BookmarkBlob } from '../../../schemas/bookmarkSchemas';
import { Reducer } from 'redux';
import { TAllBlobsActions } from '../../../actions/load/bookmarksLoadActionsTypes';

export interface IAllBlobsState {
    readonly hasError: boolean;
    readonly items: BookmarkBlob[] | null;
    readonly reason?: string;
    readonly isLoading: boolean;
}

const initialState: IAllBlobsState = {
    hasError: false,
    items: null,
    reason: undefined,
    isLoading: false
};

export const AllBlobsReducer: Reducer<IAllBlobsState, TAllBlobsActions> = (
    state = initialState,
    action
) => {
    switch ( action.type ) {
        case 'CLEAR_LOAD_ALL_ERROR': {
            return {
                ...state,
                hasError: false,
                reason: undefined
            };
        }
        case 'LOADING_ALL_BLOBS': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'HANDLE_LOAD_ALL_BLOBS': {
            const { hasError, items, reason } = action.payload;
            return {
                ...state,
                isLoading: false,
                hasError,
                items: items == null ? null : [...items],
                reason
            };
        }
        default:
            return state;
    }
};
