import { BookmarkQueryer } from './bookmarkQueryer';
import { BookmarkCreator } from './bookmarkCreator';
import { JSONQueryer } from './json/jsonBookmarkQueryer';
import { JSONCreator } from './json/jsonBookmarkCreator';
import { BlobImporter } from '../blobs/blobImporter';
import { JSONBlobImporter } from '../blobs/json/jsonBlobImporter';
import { StateManager } from '../stateManager/stateManager';


/**
 * Fake DI Queryer
 * @type {JSONQueryer}
 */
export const Queryer: BookmarkQueryer = new JSONQueryer();

/**
 * Fake DI Creator
 * @type {JSONCreator}
 */
export const Creator: BookmarkCreator = new JSONCreator();

/**
 * Fake DI Importer
 */
export const Importer: BlobImporter = new JSONBlobImporter();

interface State {
    isExternal: boolean
}

// TODO: Make this better
// TODO: Put the filename and others in the global reducer
export const ExternalState: StateManager<State> = new StateManager<State>( {
    isExternal: false
} );
