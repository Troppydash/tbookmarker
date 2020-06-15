import React, { Component, useState } from 'react';
import { BookmarkBranch, BookmarkCommit } from '../../../schemas/bookmarkSchemas';

import Styles from './Commits.module.scss';
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';

interface CommitsProps {
    commits: BookmarkCommit[];
    selectedCommit: string;
    selectCommit: ( branchID: string ) => void;
}

interface CommitsState {

}

@ContextMenuTarget
class Commits extends Component<CommitsProps, CommitsState> {
    state = {};

    handleClick = ( uuid: string ) => {
        this.props.selectCommit( uuid );
    };

    renderContextMenu = () => {
        return (
            <Menu className={Styles.contextMenu}>
                <MenuItem className={Styles.contextMenuItems} text="Delete" />
            </Menu>
        );
    };

    render() {
        const { commits, selectedCommit } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.folderContainerTitle}>
                    <span>Commits</span>
                </div>
                <Menu className={Styles.folderContainer}>
                    {
                        commits.map( commit => {
                            return (
                                <MenuItem key={commit.uuid}
                                          className={
                                              `${Styles.folderItem} ${selectedCommit === commit.uuid && Styles.folderItemSelected}`
                                          }
                                          onClick={() => this.handleClick( commit.uuid )}
                                          text={commit.title} />
                            );
                        } )
                    }
                </Menu>
            </div>
        );
    }

}

export default Commits;
