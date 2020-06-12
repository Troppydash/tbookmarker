import React, { Component } from 'react';

import Styles from './Explorer.module.scss';

import { RootState } from '../reducers';
import { LoadAllBlobsActionCreator, LoadSingleBlobActionCreator } from '../actions/load/bookmarksLoadActions';
import { SaveSingleBookmarkBlobActionCreator } from '../actions/save/bookmarksSaveActions';
import { connect, ConnectedProps } from 'react-redux';

// Redux connector
const mapStateToProps = ( state: RootState ) => ({
    ...state
});

const mapDispatchToProps = {
    LoadAllBlobs: LoadAllBlobsActionCreator,
    LoadSingleBlob: LoadSingleBlobActionCreator,
    SaveBlob: SaveSingleBookmarkBlobActionCreator
};

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>

interface ExplorerState {

}

// Container to handle the explorer elements
class Explorer extends Component<PropsFromRedux, ExplorerState> {
    state = {};

    render() {
        return (
            <div className={Styles.explorerBody}>


            </div>
        );
    }
}

export default connector( Explorer );
