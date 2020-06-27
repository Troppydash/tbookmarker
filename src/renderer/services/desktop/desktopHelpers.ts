import { remote } from 'electron';

/**
 * Write a piece of text to the clipboard
 * @param text
 * @constructor
 */
export const WriteToClipboard = ( text: string ) => {
    remote.clipboard.writeText(text);
};
