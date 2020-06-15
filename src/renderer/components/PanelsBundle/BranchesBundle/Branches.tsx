import React, { Component, useState, Fragment } from 'react';
import { BookmarkBranch } from '../../../schemas/bookmarkSchemas';

import Styles from './Branches.module.scss';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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

    render() {
        const { branches, selectedBranch, selectBranch } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.folderContainerTitle}>
                    <span>Branches</span>
                    <button onClick={this.props.addBranch}>Add</button>
                </div>

                <ul className={Styles.folderContainer}>
                    {
                        branches.map( branch => {
                            return (
                                <Fragment key={branch.uuid}>
                                    <ContextMenuTrigger id={branch.uuid}>
                                        <li className={
                                            `${Styles.folderItem} ${selectedBranch === branch.uuid && Styles.folderItemSelected}`
                                        }
                                            onClick={() => this.handleClick( branch.uuid )}>
                                            {branch.name}
                                        </li>
                                    </ContextMenuTrigger>

                                    <ContextMenu id={branch.uuid}>
                                        <MenuItem>
                                            <ul className={Styles.contextMenu}>
                                                <li className={Styles.contextMenuItems}>
                                                    <EditOutlined />
                                                    <span>Rename</span>
                                                </li>
                                                <li className={Styles.contextMenuItems}>
                                                    <DeleteOutlined />
                                                    <span>Delete</span>
                                                </li>
                                            </ul>
                                        </MenuItem>
                                    </ContextMenu>
                                </Fragment>
                            );
                        } )
                    }
                </ul>

                {/*<Menu className={Styles.folderContainer}>*/}
                {/*    {*/}
                {/*        branches.map( branch => {*/}
                {/*            return (*/}
                {/*                <MenuItem key={branch.uuid}*/}
                {/*                          className={*/}
                {/*                              `${Styles.folderItem} ${selectedBranch === branch.uuid && Styles.folderItemSelected}`*/}
                {/*                          }*/}
                {/*                          onClick={() => this.handleClick( branch.uuid )}*/}
                {/*                          text={branch.name} />*/}
                {/*            );*/}
                {/*        } )*/}
                {/*    }*/}
                {/*</Menu>*/}
            </div>
        );
    }

}

export default Branches;
