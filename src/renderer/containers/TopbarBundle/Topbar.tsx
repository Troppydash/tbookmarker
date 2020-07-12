import React, { Component } from 'react';

import TitleBar from 'frameless-titlebar';

const icon = require( './icon.png' );

import * as Menus from './Menu/customMenu';
import { remote } from 'electron';

const currentWindow = remote.getCurrentWindow();
import Styles from './Topbar.scss';
import { RootState } from '../../reducers';
import { LoadAllBlobs, LoadSingleBlob } from '../../actions/load/bookmarksLoadActions';
import { SaveSingleBookmarkBlob } from '../../actions/save/bookmarksSaveActions';
import {
    CreateBookmark,
    CreateBranch,
    CreateCommit,
    CreateGroup,
    CreateSchema
} from '../../actions/create/bookmarksCreateActions';
import { connect, ConnectedProps } from 'react-redux';
import { ImportBlob, ViewBlob } from '../../actions/importBlob/importBlobActions';

// Redux connector
const mapStateToProps = ( state: RootState ) => ({
    ...state
});

const mapDispatchToProps = {
    ImportBlob: ImportBlob,
    ViewBlob: ViewBlob,
};

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>

interface TopbarState {

}

const characterLimit = 19;

// TODO: Make readonly a context prop
class Topbar extends Component<PropsFromRedux, TopbarState> {

    GetTrailing = () => {
        let trailing = '';

        if ( this.props.singleBlob.item?.isReadOnly ) {
            trailing += ' >' + ', ReadOnly';
        }

        if ( this.props.singleBlob.isExternal ) {
            trailing += ' >' + ', External';
        }
        if ( this.props.singleBlob.item ) {
            const fullPath = this.props.singleBlob.item?.absolutePath;
            trailing += ' >' + (fullPath.length > characterLimit
                ? `...${fullPath.substring( fullPath.length - characterLimit )}`
                : fullPath);
        }

        return trailing;
    };

    render(): React.ReactNode {
        return (
            <div className={Styles.icon}>
                <TitleBar
                    iconSrc={icon}
                    currentWindow={currentWindow}
                    platform={process.platform as any}
                    theme={{}}
                    title={`TBookmarker ${this.GetTrailing()}`}
                    menu={[
                        {
                            label: 'File',
                            submenu: [
                                {
                                    label: 'View',
                                    click: () => {
                                        this.props.ImportBlob();
                                    }
                                },
                                {
                                    label: 'Import',
                                    click: () => {
                                        this.props.ViewBlob();
                                    }
                                },
                                {
                                    label: 'Export',
                                    click: () => {
                                        // TODO: Export
                                        this.props.ImportBlob();
                                    }
                                }
                            ]
                        }
                    ]
                    }
                    onClose={() => currentWindow.close()}
                    onMinimize={() => currentWindow.minimize()}
                    onMaximize={() => {
                        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
                    }}
                    onDoubleClick={() => currentWindow.maximize()}>

                </TitleBar>
            </div>
        );
    }
}

export default connector( Topbar );
