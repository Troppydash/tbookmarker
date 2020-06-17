import React, { Component, useState } from 'react';
import { BookmarkBranch, BookmarkCommit } from '../../../schemas/bookmarkSchemas';

import Styles from './Commits.module.scss';
import ContextMenuStyles from '../../../styles/components/ContextMenu.module.scss';
import SelectableListStyles from '../../../styles/components/SelectableList.module.scss';
import MakeContextMenu from '../../MakeContextMenuBundle/MakeContextMenu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/all';

interface CommitsProps {
    commits: BookmarkCommit[];
    selectedCommit: string;
    selectCommit: ( branchID: string ) => void;
}

interface CommitsState {

}

class Commits extends Component<CommitsProps, CommitsState> {
    state = {};

    handleClick = ( uuid: string ) => {
        this.props.selectCommit( uuid );
    };

    createContextMenu = (commitID: string) => {
        return (
            <ul className={ContextMenuStyles.contextMenu}>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <span>{commitID}</span>
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
        const { commits, selectedCommit } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.folderTitle}>
                    <span>Commits</span>
                </div>
                <ul className={SelectableListStyles.selectableListContainer}>
                    {
                        commits.map( commit => {
                            return (
                                <MakeContextMenu id={commit.uuid}
                                                 key={commit.uuid}
                                                 contextMenu={this.createContextMenu(commit.uuid)}>
                                    <li className={
                                        `${SelectableListStyles.selectableListItem} ${selectedCommit === commit.uuid && SelectableListStyles.selectableListItem__selected}`
                                    }
                                        onClick={() => this.handleClick( commit.uuid )}>
                                        {commit.title}
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

export default Commits;
