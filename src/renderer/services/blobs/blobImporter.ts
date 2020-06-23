import { BookmarkBlob } from '../../schemas/bookmarkSchemas';

/**
 * Interface to import a blob
 */
export interface BlobImporter {
    import(): Promise<BookmarkBlob | string>;
}
