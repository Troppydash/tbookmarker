import { combineReducers } from 'redux';

import { AllBlobsReducer, IAllBlobsState } from './blobsReducers/load/AllBlobsReducer';
import { ISingleBlobsState, SingleBlobsReducer } from './blobsReducers/load/SingleBlobReducer';
import { ISaveBlobState, SaveBlobReducer } from './blobsReducers/save/SaveBlobReducer';
import { CreateBlobReducer, ICreateBlobState } from './blobsReducers/create/CreateBlobReducer';
import { IImportBlobState, ImportBlobReducer } from './blobsReducers/importBlob/ImportBlobReducer';

export interface RootState {
    allBlobs: IAllBlobsState;
    singleBlob: ISingleBlobsState;
    saveBlob: ISaveBlobState;
    createBlob: ICreateBlobState;
    importBlob: IImportBlobState;
}

// TODO: Import & Export & View actions
/**
 * Root Reducer
 */
export const rootReducer = combineReducers<RootState | undefined>( {
    allBlobs: AllBlobsReducer,
    singleBlob: SingleBlobsReducer,
    saveBlob: SaveBlobReducer,
    createBlob: CreateBlobReducer,
    importBlob: ImportBlobReducer
} );
