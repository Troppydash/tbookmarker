import React, { Component, useState, Fragment } from 'react';
import { BookmarkBranch } from '../../../schemas/bookmarkSchemas';

import Styles from './Branches.module.scss';
import SelectableListStyles from '../../../styles/components/SelectableList.module.scss';
import ContextMenuStyles from '../../../styles/components/ContextMenu.module.scss';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MakeContextMenu from '../../MakeContextMenuBundle/MakeContextMenu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/all';

interface BranchesProps {
    branches: BookmarkBranch[];
    selectedBranch: string;
    selectBranch: ( branchID: string ) => void;
    addBranch: () => void;
}

interface BranchesState {

}

//TODO: Do the context menu and list on the rest

class Branches extends Component<BranchesProps, BranchesState> {
    state = {};

    handleClick = ( uuid: string ) => {
        this.props.selectBranch( uuid );
    };

    createContextMenu = ( branchID: string ) => {
        return (
            <ul className={ContextMenuStyles.contextMenu}>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <span>{branchID}</span>
                </li>
                <div className={ContextMenuStyles.contextMenuDivider}/>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <div className={ContextMenuStyles.contextMenuItemsIcon}>
                        <AiOutlineEdit />
                    </div>
                    <div className={ContextMenuStyles.contextMenuItemsText}>
                        <span>Rename</span>
                    </div>
                </li>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <div className={ContextMenuStyles.contextMenuItemsIcon}>
                        <AiOutlineDelete />
                    </div>
                    <div className={ContextMenuStyles.contextMenuItemsText}>
                        <span>Delete</span>
                    </div>
                </li>
            </ul>
        );
    };

    render() {
        const { branches, selectedBranch, selectBranch } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.folderTitle}>
                    <span>Branches</span>
                    <button onClick={this.props.addBranch}>Add</button>
                </div>

                <ul className={SelectableListStyles.selectableListContainer}>
                    {
                        branches.map( branch => {
                            return (
                                <MakeContextMenu id={branch.uuid}
                                                 key={branch.uuid}
                                                 contextMenu={this.createContextMenu( branch.uuid )}>
                                    <li className={
                                        `${SelectableListStyles.selectableListItem} ${selectedBranch === branch.uuid && SelectableListStyles.selectableListItem__selected}`
                                    }
                                        onClick={() => this.handleClick( branch.uuid )}>
                                        {branch.name}
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

export default Branches;
