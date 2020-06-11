import { combineReducers } from 'redux';

import { AllBlobsReducer, IAllBlobsState } from './blobsReducers/load/AllBlobsReducer';
import { ISingleBlobsState, SingleBlobsReducer } from './blobsReducers/load/SingleBlobReducer';
import { ISaveBlobState, SaveBlobReducer } from './blobsReducers/save/SaveBlobReducer';

export interface RootState {
    allBlobs: IAllBlobsState;
    singleBlob: ISingleBlobsState;
    saveBlob: ISaveBlobState;
}

export const rootReducer = combineReducers<RootState | undefined>( {
    allBlobs: AllBlobsReducer,
    singleBlob: SingleBlobsReducer,
    saveBlob: SaveBlobReducer
} );
