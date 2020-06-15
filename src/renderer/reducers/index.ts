import { combineReducers } from 'redux';

import { AllBlobsReducer, IAllBlobsState } from './blobsReducers/load/AllBlobsReducer';
import { ISingleBlobsState, SingleBlobsReducer } from './blobsReducers/load/SingleBlobReducer';
import { ISaveBlobState, SaveBlobReducer } from './blobsReducers/save/SaveBlobReducer';
import { CreateBlobReducer, ICreateBlobState } from './blobsReducers/create/CreateBlobReducer';

export interface RootState {
    allBlobs: IAllBlobsState;
    singleBlob: ISingleBlobsState;
    saveBlob: ISaveBlobState;
    createBlob: ICreateBlobState;
}

/**
 * Root Reducer
 */
export const rootReducer = combineReducers<RootState | undefined>( {
    allBlobs: AllBlobsReducer,
    singleBlob: SingleBlobsReducer,
    saveBlob: SaveBlobReducer,
    createBlob: CreateBlobReducer,
} );
