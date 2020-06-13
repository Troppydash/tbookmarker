import React, { Component, useState } from 'react';
import { BookmarkBookmarks, BookmarkBranch, BookmarkCommit } from '../../schemas/bookmarkSchemas';

import Styles from './Bookmarks.module.scss';
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';

interface BookmarksProps {
    bookmarks: BookmarkBookmarks[];
    selectedBookmark: string;
    selectBookmark: ( branchID: string ) => void;
}

interface BookmarksState {
}

@ContextMenuTarget
class Bookmarks extends Component<BookmarksProps, BookmarksState> {
    state = {};

    handleClick = ( uuid: string ) => {
        this.props.selectBookmark( uuid );
    };

    renderContextMenu = () => {
        return (
            <Menu className={Styles.contextMenu}>
                <MenuItem className={Styles.contextMenuItems} text="Delete" />
            </Menu>
        );
    };

    getFavicon = ( document: any ) => {
        let favicon: string = '';
        let nodeList = document.getElementsByTagName( 'link' );
        for ( let i = 0; i < nodeList.length; i++ ) {
            if ( (nodeList[i].getAttribute( 'rel' ) == 'icon') || (nodeList[i].getAttribute( 'rel' ) == 'shortcut icon') ) {
                favicon = nodeList[i].getAttribute( 'href' );
            }
        }
        return favicon;
    };

    fetchWebsites = () => {
        this.props.bookmarks.forEach( bookmark => {
            if (bookmark.title) {
                return;
            }
            fetch( `https://cors-anywhere.herokuapp.com/${bookmark.url}` )
                .then( res => {
                    return res.text();
                } )
                .then( text => {
                    const parser = new DOMParser();
                    const html = parser.parseFromString( text, 'text/html' );
                    const title = (html.getElementsByTagName( 'title' ) as any)[0].innerText;
                } );
        } );
    };

    componentDidUpdate( prevProps: Readonly<BookmarksProps>, prevState: Readonly<BookmarksState>, snapshot?: any ): void {
        if ( prevProps.bookmarks !== this.props.bookmarks && this.props.bookmarks.length > 0 ) {
            this.fetchWebsites();
        }

    }

    render() {
        const { bookmarks, selectedBookmark } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.folderContainerTitle}>
                    <span>Bookmarks</span>
                </div>
                <Menu className={Styles.folderContainer}>
                    {
                        bookmarks.map( bookmark => {
                            return (
                                <MenuItem key={bookmark.uuid}
                                          className={
                                              `${Styles.folderItem} ${selectedBookmark === bookmark.uuid && Styles.folderItemSelected}`
                                          }
                                          onClick={() => this.handleClick( bookmark.uuid )}
                                          icon={<img alt='Icon'
                                                     src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}`} />}
                                          text={bookmark.url} />
                            );
                        } )
                    }
                </Menu>
            </div>
        );
    }

}

export default Bookmarks;
