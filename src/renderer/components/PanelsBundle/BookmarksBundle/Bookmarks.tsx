import React, { Component, useState } from 'react';
import { BookmarkBookmarks, BookmarkBranch, BookmarkCommit } from '../../../schemas/bookmarkSchemas';

import Styles from './Bookmarks.module.scss';
import ContextMenuStyles from '../../../styles/components/ContextMenu.module.scss';
import SelectableListStyles from '../../../styles/components/SelectableList.module.scss';
import MakeContextMenu from '../../MakeContextMenuBundle/MakeContextMenu';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFolderAdd, GrFormClose, IoIosClose } from 'react-icons/all';
import FormModel from '../../MakeModelBundle/FormModel';
import { ModelSize } from '../../MakeModelBundle/MakeModel';
import { Form, Formik } from 'formik';
import { BookmarkBookmarksBuilder, BookmarkBranchBuilder } from '../../../schemas/bookmarksBuilders';
import FormStyles from '../../../styles/components/Form.module.scss';
import ButtonStyles from '../../../styles/components/Button.module.scss';
import _ from 'lodash';

interface BookmarksProps {
    bookmarks: BookmarkBookmarks[];
    selectedBookmark: string;
    selectBookmark: ( branchID: string ) => void;

    addBookmarks: ( bookmarks: BookmarkBookmarks[] ) => Promise<void>;
    isEnabled: boolean;
}

interface BookmarksState {
    isShowing: boolean;
    bookmarks: BookmarkBookmarks[];
    currentUrl: string;
}

class Bookmarks extends Component<BookmarksProps, BookmarksState> {
    state = {
        isShowing: false,
        bookmarks: [] as BookmarkBookmarks[],
        currentUrl: ''
    };

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

    createContextMenu = ( branchID: string ) => {
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

    closeModel = () => {
        this.setState( {
            isShowing: false,
            currentUrl: '',
            bookmarks: [] as BookmarkBookmarks[]
        } );
    };

    openModel = () => {
        this.setState( {
            isShowing: true
        } );
    };

    handleSubmit = async () => {
        await this.props.addBookmarks( this.state.bookmarks );
        this.closeModel();
    };

    addBookmark = ( e: any ) => {
        e.preventDefault();
        const newBookmark = new BookmarkBookmarksBuilder().url( this.state.currentUrl ).build();
        this.setState( {
            bookmarks: [ ...this.state.bookmarks, newBookmark ],
            currentUrl: ''
        } );
    };

    modifyBookmark = ( e: any, index: number ) => {
        const oldState = _.cloneDeep( this.state.bookmarks );
        oldState[index].url = e.currentTarget.value;
        this.setState( {
            bookmarks: oldState
        } );
    };

    removeBookmark = ( uuid: string ) => {
        const filteredBookmarks = this.state.bookmarks.filter( b => b.uuid !== uuid );

        this.setState( {
            bookmarks: filteredBookmarks
        } );
    };

    handleUrl = ( e: any, uuid: string ) => {
        const index = this.state.bookmarks.indexOf( this.state.bookmarks.find( b => b.uuid === uuid )! );
        const tempBookmarks = _.cloneDeep( this.state.bookmarks );
        tempBookmarks[index] = e.currentTarget.value;
        this.setState( {
            bookmarks: tempBookmarks
        }, () => {

        } );
    };


    render() {
        const { bookmarks, selectedBookmark } = this.props;

        return (
            <>
                {/*Model*/}
                <FormModel handleClose={this.closeModel}
                           isShowing={this.state.isShowing}
                           size={ModelSize.sm}
                           mainTitle="Add commits"
                           subTitle="New Commits">
                    <div className={FormStyles.form}>
                        <form onSubmit={this.addBookmark} className={FormStyles.inputGroup}>
                            <label className={FormStyles.inputLabel}>Add Url</label>
                            <input type="text"
                                   onChange={( e ) => this.setState( {
                                       currentUrl: e.currentTarget.value
                                   } )}
                                   value={this.state.currentUrl}
                                   className={FormStyles.input} />
                            <button type="submit" hidden>Submit</button>
                        </form>
                        {
                            this.state.bookmarks.map( ( bookmark, index ) => (
                                <div className={`${FormStyles.inputGroup} ${FormStyles.inputGroupInline}`}
                                     key={bookmark.uuid}>
                                    <input type="text"
                                           name={`url${index + 1}`}
                                           value={bookmark.url}
                                           className={FormStyles.input}
                                           onChange={( e ) => this.modifyBookmark( e, index )} />
                                    <div
                                        className={`${ButtonStyles.iconButton} ${ButtonStyles.iconButtonDark} ${ButtonStyles.iconButtonSmall}`}
                                        onClick={() => this.removeBookmark( bookmark.uuid )}>
                                        <IoIosClose />
                                    </div>
                                </div>
                            ) )
                        }

                        <div className={FormStyles.inputGroupSubmit}>
                            <button onClick={this.handleSubmit}
                                    className={`${ButtonStyles.normalButton} ${FormStyles.formSubmit}`}>
                                Submit
                            </button>
                        </div>
                    </div>
                </FormModel>
                {/*Model*/}

                <div className={Styles.container}>
                    <div className={Styles.folderTitle}>
                        <span className={Styles.folderTitleText}>Bookmarks</span>
                        <button className={ButtonStyles.iconButton} onClick={() => this.openModel()}
                                disabled={!this.props.isEnabled}>
                            <AiOutlineFolderAdd />
                        </button>
                    </div>

                    <ul className={SelectableListStyles.selectableListContainer}>
                        {
                            bookmarks.map( bookmark => {
                                return (
                                    <MakeContextMenu id={bookmark.uuid}
                                                     key={bookmark.uuid}
                                                     contextMenu={this.createContextMenu( bookmark.uuid )}>
                                        <li className={
                                            `${SelectableListStyles.selectableListItem} ${selectedBookmark === bookmark.uuid && SelectableListStyles.selectableListItem__selected}`
                                        }
                                            onClick={() => this.handleClick( bookmark.uuid )}>
                                            <img alt='Icon'
                                                 src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}`} />
                                            <span>
                                                {bookmark.url}
                                            </span>
                                        </li>
                                    </MakeContextMenu>
                                );
                            } )
                        }
                    </ul>
                </div>
            </>
        );
    }

}

export default Bookmarks;
