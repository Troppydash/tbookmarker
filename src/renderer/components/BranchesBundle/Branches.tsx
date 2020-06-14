import React, { Component, useState } from 'react';
import { BookmarkBranch } from '../../schemas/bookmarkSchemas';

import Styles from './Branches.module.scss';
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';

interface BranchesProps {
    branches: BookmarkBranch[];
    selectedBranch: string;
    selectBranch: ( branchID: string ) => void;
    addBranch: () => void;
}

interface BranchesState {

}

@ContextMenuTarget
class Branches extends Component<BranchesProps, BranchesState> {
    state = {};

    handleClick = ( uuid: string ) => {
        this.props.selectBranch( uuid );
    };

    renderContextMenu = () => {
        return (
            <Menu className={Styles.contextMenu}>
                <MenuItem className={Styles.contextMenuItems} text="Delete"/>
            </Menu>
        );
    };

    onContextMenuClose = () => {

    }

    render() {
        const { branches, selectedBranch, selectBranch } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.folderContainerTitle}>
                    <span>Branches</span>
                    <button onClick={this.props.addBranch}>Add</button>
                </div>
                <Menu className={Styles.folderContainer}>
                    {
                        branches.map( branch => {
                            return (
                                <MenuItem key={branch.uuid}
                                          className={
                                              `${Styles.folderItem} ${selectedBranch === branch.uuid && Styles.folderItemSelected}`
                                          }
                                          onClick={() => this.handleClick( branch.uuid )}
                                          text={branch.name} />
                            );
                        } )
                    }
                </Menu>
            </div>
        );
    }

}

export default Branches;
