import React, { Component, useState } from 'react';
import { BookmarkBookmarks, BookmarkBranch, BookmarkCommit } from '../../../schemas/bookmarkSchemas';

import Styles from './Bookmarks.module.scss';
import ContextMenuStyles from '../../../styles/components/ContextMenu.module.scss';
import SelectableListStyles from '../../../styles/components/SelectableList.module.scss';
import MakeContextMenu from '../../MakeContextMenuBundle/MakeContextMenu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/all';

interface BookmarksProps {
    bookmarks: BookmarkBookmarks[];
    selectedBookmark: string;
    selectBookmark: ( branchID: string ) => void;
}

interface BookmarksState {
}

class Bookmarks extends Component<BookmarksProps, BookmarksState> {
    state = {};

    handleClick = ( uuid: string ) => {
        this.props.selectBookmark( uuid );
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
        // TODO: Update website titles
    };

    componentDidUpdate( prevProps: Readonly<BookmarksProps>, prevState: Readonly<BookmarksState>, snapshot?: any ): void {
        if ( prevProps.bookmarks !== this.props.bookmarks && this.props.bookmarks.length > 0 ) {
            this.fetchWebsites();
        }
    }

    createContextMenu = (branchID: string) => {
        return (
            <ul className={ContextMenuStyles.contextMenu}>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <span>{branchID}</span>
                </li>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <AiOutlineEdit />
                    <span>Rename</span>
                </li>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <AiOutlineDelete />
                    <span>Delete</span>
                </li>
            </ul>
        );
    };

    render() {
        const { bookmarks, selectedBookmark } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.folderTitle}>
                    <span>Bookmarks</span>
                </div>

                <ul className={SelectableListStyles.selectableListContainer}>
                    {
                        bookmarks.map( bookmark => {
                            return (
                                <MakeContextMenu id={bookmark.uuid}
                                                 key={bookmark.uuid}
                                                 contextMenu={this.createContextMenu(bookmark.uuid)}>
                                    <li className={
                                        `${SelectableListStyles.selectableListItem} ${selectedBookmark === bookmark.uuid && SelectableListStyles.selectableListItem__selected}`
                                    }
                                        onClick={() => this.handleClick( bookmark.uuid )}>
                                        <img alt='Icon'
                                             src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}`} />
                                        {bookmark.url}
                                    </li>
                                </MakeContextMenu>
                            );
                        } )
                    }
                </ul>
            </div>
        );
    }

}

export default Bookmarks;
