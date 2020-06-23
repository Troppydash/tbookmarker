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
import { ImportBlob } from '../../actions/importBlob/importBlobActions';

// Redux connector
const mapStateToProps = ( state: RootState ) => ({
    ...state
});

const mapDispatchToProps = {
    ImportBlob: ImportBlob
};

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>

interface TopbarState {

}

class Topbar extends Component<PropsFromRedux, TopbarState> {

    GetTrailing = () => {
        if (this.props.singleBlob.isExternal) {
            return " - External";
        }
        return "";
    }

    render(): React.ReactNode {
        return (
            <div className={Styles.icon}>
                <TitleBar
                    iconSrc={icon}
                    currentWindow={currentWindow}
                    platform={process.platform as any}
                    theme={{}}
                    title={`TBookmarker${this.GetTrailing()}`}
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

export default connector(Topbar);
