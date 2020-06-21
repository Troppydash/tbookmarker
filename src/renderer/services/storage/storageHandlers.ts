import fs from "fs";
import path from 'path';

const fsPromise = fs.promises;

/**
 * Create the folders given a folder path, returns if the action succeeded
 * @param path
 * @returns {boolean}
 * @constructor
 */
export function CreateFoldersIfNotExists( path: string ): boolean {
    if ( !fs.existsSync( path ) ) {
        try {
            fs.mkdirSync( path, { recursive: true } );
            return true;
        } catch ( e ) {
            console.error(e);
            return false;
        }
    }
    return true;
}

/**
 * Get the root storage path of Tbookmarker
 * @returns {string | null}
 * @constructor
 */
export function GetApplicationStoragePath(): string | null {
    const home = require( 'os' ).homedir();
    const pt = path.join(home, 'Documents', 'Tbookmarker');
    CreateFoldersIfNotExists(pt);
    return pt;
}

/**
 * Get the bookmark json files storage path
 * @returns {string | null}
 * @constructor
 */
export function GetApplicationBookmarkStoragePath() {
    const result = GetApplicationStoragePath();
    if ( result === null ) {
        return null;
    }


    const bookmarkPath = path.join(result, 'storage');
    if ( !CreateFoldersIfNotExists( bookmarkPath ) ) {
        return null;
    }
    return bookmarkPath;
}


/**
 * Async function to read all the files from storage
 * @param onFile
 * @returns {Promise<any[] | T[]>}
 */
export async function readFilesFromStorage<T>( onFile: ( filename: string, content: any ) => T ): Promise<T[]> {
    const dirname = GetApplicationBookmarkStoragePath();
    if (dirname == null) {
        return [];
    }

    const files: any[] = await fsPromise.readdir( dirname );
    if ( files === null ) {
        return [];
    }

    const result: T[] = [];
    for ( const filename of files ) {
        const content = await fsPromise.readFile( dirname + filename, 'utf-8' );
        if ( content !== null ) {
            result.push( onFile( filename, content ) );
        }
    }
    return result;
}

/**
 * Write a file to the storage
 * @param fileName
 * @param fileContent
 * @returns {Promise<boolean>}
 */
export function writeFileToStorage(fileName: string, fileContent: any): Promise<boolean> {
    const storagePath = GetApplicationBookmarkStoragePath();
    if (storagePath === null) {
        return new Promise((resolve, reject) => reject(false));
    }
    const filePath = path.join(storagePath, fileName);

    return fsPromise.writeFile(filePath, fileContent)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}
