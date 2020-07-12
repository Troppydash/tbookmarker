import { BookmarkBlob } from '../../schemas/bookmarkSchemas';

/**
 * Interface to import a blob
 */
export interface BlobImporter {
    import(isReadonly: boolean): Promise<BookmarkBlob | string>;
}
