import { BookmarkBlob } from '../../../schemas/bookmarkSchemas';
import { Reducer } from 'redux';
import { TSingleBlobActions } from '../../../actions/load/bookmarksLoadActionsTypes';
import {
    TBookmarkCreateActionTypes,
    TBookmarkCreateItemTypes
} from '../../../actions/create/bookmarksCreateActionsTypes';
import _ from 'lodash';

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

export const SingleBlobsReducer: Reducer<ISingleBlobsState, TSingleBlobActions | TBookmarkCreateItemTypes> = (
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

        // Creating Items here
        case 'CREATE_SCHEMA': {
            const { newSchema } = action.payload;
            return {
                ...state,
                item: { ...newSchema }
            };
        }

        case 'CREATE_GROUP': {
            // Do nothing if state is broken
            if ( !state.item ) {
                return state;
            }

            const { newGroup, options } = action.payload;
            const newSchema = _.cloneDeep( state.item );
            newSchema?.bookmarks?.data.push( { ...newGroup } );
            return {
                ...state,
                item: {
                    ...newSchema
                }
            };
        }

        case 'CREATE_BRANCH': {
            // Do nothing if state is broken
            if ( !state.item ) {
                return state;
            }

            const { newBranch, options } = action.payload;
            const newSchema = _.cloneDeep( state.item );
            const selectedGroup = newSchema.bookmarks?.data.find( g => g.uuid == options.groupID );
            // TODO: Fix things like this
            selectedGroup!.branches = [ ...selectedGroup!.branches, newBranch ];
            return {
                ...state,
                item: {
                    ...newSchema
                }
            };
        }

        case 'CREATE_COMMIT': {
            // Do nothing if state is broken
            if ( !state.item ) {
                return state;
            }

            const { newCommit, options } = action.payload;
            const newSchema = _.cloneDeep( state.item );
            const selectedGroup = newSchema.bookmarks?.data.find( g => g.uuid == options.groupID );
            const selectedBranch = selectedGroup?.branches.find( b => b.uuid === options.branchID );
            selectedBranch?.commits.push( newCommit );
            return {
                ...state,
                item: {
                    ...newSchema
                }
            };
        }

        case 'CREATE_BOOKMARK': {
            // Do nothing if state is broken
            if ( !state.item ) {
                return state;
            }

            const { newBookmark, options } = action.payload;
            const newSchema = _.cloneDeep( state.item );
            const selectedGroup = newSchema.bookmarks?.data.find( g => g.uuid == options.groupID );
            const selectedBranch = selectedGroup?.branches.find( b => b.uuid === options.branchID );
            const selectedCommit = selectedBranch?.commits.find( c => c.uuid === options.commitID );
            selectedCommit?.bookmarks.push( newBookmark );
            return {
                ...state,
                item: {
                    ...newSchema
                }
            };
        }

        // TODO: Implement this
        case 'CREATE_COMMIT_WITH_BOOKMARKS': {
            return state;
        }


        default:
            return state;
    }
};
