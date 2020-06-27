import { BlobImporter } from '../blobImporter';
import { BookmarkBlob, BookmarksSchema } from '../../../schemas/bookmarkSchemas';
import { importFileFromStorage } from '../../storage/storageHandlers';
import { BookmarkBlobBuilder } from '../../../schemas/bookmarksBuilders';

/**
 * JSON Implementation of importing a blob
 */
export class JSONBlobImporter implements BlobImporter {
    // TODO: Should be view instead
    import(): Promise<BookmarkBlob | string> {
        return new Promise<BookmarkBlob|string>(async (resolve, reject) =>  {
            const schema = await importFileFromStorage<BookmarksSchema>();
            if (typeof schema === "string" ) {
                return reject(schema);
            }
            const bookmarkBlob = new BookmarkBlobBuilder()
                .bookmarks(schema)
                .title("External")
                .build();
            return resolve(bookmarkBlob);
        })


    }
}
