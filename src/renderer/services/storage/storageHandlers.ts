import fs from 'fs';
import path from 'path';
import { ExternalState } from '../bookmarks/exports';
import { BookmarkMetadata } from '../../schemas/bookmarkSchemas';

const fsPromise = fs.promises;
const { dialog, app, shell } = require( 'electron' ).remote;

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
            console.error( e );
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
    const pt = path.join( home, 'Documents', 'Tbookmarker' );
    CreateFoldersIfNotExists( pt );
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


    const bookmarkPath = path.join( result, 'storage' );
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
export async function readFilesFromStorage<T>( onFile: ( absPath: string, filename: string, content: any ) => T ): Promise<T[]> {
    const dirname = GetApplicationBookmarkStoragePath();
    if ( dirname == null ) {
        return [];
    }

    const files: any[] = await fsPromise.readdir( dirname );
    if ( files === null ) {
        return [];
    }

    const result: T[] = [];
    for ( const filename of files ) {
        const content = await fsPromise.readFile( path.join( dirname, filename ), 'utf-8' );
        if ( content !== null ) {
            result.push( onFile( path.resolve(dirname, filename), filename, content ) );
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
export function writeFileToStorage( fileName: string, fileContent: any ): Promise<boolean> {

    if (ExternalState.state.isExternal) {
        return new Promise(resolve => resolve(true));
    }

    const storagePath = GetApplicationBookmarkStoragePath();
    if ( storagePath === null ) {
        return new Promise( ( resolve, reject ) => reject( false ) );
    }
    const filePath = path.join( storagePath, fileName );

    return fsPromise.writeFile( filePath, fileContent )
        .then( () => {
            return true;
        } )
        .catch( () => {
            return false;
        } );
}

/**
 * Writes a file to any location
 * @param path The location
 * @param fileContent The file content
 */
export function writeFileToStorageFromPath( path: string, fileContent: any ): Promise<boolean> {
    return fsPromise.writeFile( path, fileContent )
        .then( () => {
            return true;
        } )
        .catch( () => {
            return false;
        } );
}

/**
 * Read a file from storage, returns null if error occurs
 * @param path The location of the file
 */
export function readFileFromStorageFromPath(path: string): Promise<string | null> {
    return fsPromise.readFile(path)
        .then(res => {
            return res.toString();
        })
        .catch(err => {
            return null;
        })
}

/**
 * Show a custom save dialog
 */
async function showCustomSaveDialog() {
    return dialog.showSaveDialog( {
        properties: [ 'createDirectory' ],
        defaultPath: app.getPath( 'downloads' ),
        filters: [ {
            name: 'JSON',
            extensions: [ 'json' ]
        } ],
        title: 'Export Location'
    } );
}

/**
 * Export an object to storage, shows a user dialog
 * @param fileContent The file content
 */
export async function exportFileToStorage( fileContent: string ): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const path = await showCustomSaveDialog();
        if (!path) {
            return reject("User not selected a path");
        }
        const success = await writeFileToStorageFromPath(path, fileContent);
        if (success) {
            shell.showItemInFolder(path);
        }
        return resolve("File export successful");
    });

}

/**
 * Show a custom read dialog
 */
async function showCustomReadDialog() {
    return dialog.showOpenDialog( {
        properties: [ 'openFile' ],
        defaultPath: app.getPath( 'downloads' ),
        filters: [ {
            name: 'JSON',
            extensions: [ 'json' ]
        } ],
        title: 'Import Location'
    } );
}

/**
 * Import a file from the storage, resolves with the data if successful
 */
export async function importFileFromStorage<T extends BookmarkMetadata>(): Promise<T | string> {
    return new Promise(async (resolve, reject) => {

        const path = await showCustomReadDialog();
        if ( !path || path.length !== 1 ) {
            return reject("User not didn't select any path");
        }

        const result = await readFileFromStorageFromPath( path[0] );
        if ( !result ) {
            return reject("Cannot read the selected file");
        }

        try {
            const data = JSON.parse( result ) as T;
            if (!data) {
                return reject("Parsed type is not correct");
            }
            data.absolutePath = path;
            return resolve(data);
        } catch ( e ) {
            return reject("Cannot parse the selected file");
        }
    });
}
