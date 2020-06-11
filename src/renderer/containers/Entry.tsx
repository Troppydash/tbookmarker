import React from 'react';
import { hot } from 'react-hot-loader/root';
import Topbar from './Topbar/Topbar';

require( './Entry.scss' );
import 'normalize.css';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllBlobsActionCreator } from '../actions/load/bookmarksLoadActions';
import { IAllBlobsState } from '../reducers/blobsReducers/load/AllBlobsReducer';
import { RootState } from '../reducers';

const mapStateToProps = ( {allBlobs}: RootState ) => ({
    ...allBlobs
});

const mapDispatchToProps = {
    LoadAllBlobs: LoadAllBlobsActionCreator
};

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>

class Entry extends React.Component<PropsFromRedux> {
    render() {
        const { hasError, isLoading, items, reason } = this.props;
        return (
            <>
                {/* Custom Topbar */}
                <Topbar />

                {
                    isLoading ? <p>Loading</p>
                        : (
                            hasError ? <p>{reason}</p>
                                : (
                                    <p>{JSON.stringify(items)}</p>
                                )
                        )
                }

                <button onClick={() => {
                    this.props.LoadAllBlobs();
                }}>
                    GetAll
                </button>
            </>
        );
    }
}


export default connector( hot( Entry ) );
