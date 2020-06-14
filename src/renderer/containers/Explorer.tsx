import React, { Component } from 'react';

import Styles from './Explorer.module.scss';

import { RootState } from '../reducers';
import { LoadAllBlobs, LoadSingleBlob } from '../actions/load/bookmarksLoadActions';
import { SaveSingleBookmarkBlob } from '../actions/save/bookmarksSaveActions';
import { connect, ConnectedProps } from 'react-redux';
import NavMenu from '../components/NavMenuBundle/NavMenu';
import Branches from '../components/BranchesBundle/Branches';
import Commits from '../components/CommitsBundle/Commits';
import Bookmarks from '../components/BookmarksBundle/Bookmarks';
import { Queryer } from '../services/bookmarks/bookmarkQueryer';
import { BookmarkBookmarks, BookmarkBranch, BookmarkCommit } from '../schemas/bookmarkSchemas';

// Redux connector
const mapStateToProps = ( state: RootState ) => ({
    ...state
});

const mapDispatchToProps = {
    LoadAllBlobs: LoadAllBlobs,
    LoadSingleBlob: LoadSingleBlob,
    SaveBlob: SaveSingleBookmarkBlob
};

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>

interface ExplorerState {
    selectedBranchID: string;
    selectedCommitID: string;
    selectedBookmarkID: string;
    selectedGroupID: string;

    branches: BookmarkBranch[] | null;
    commits: BookmarkCommit[] | null;
    bookmarks: BookmarkBookmarks[] | null;
}

// Container to handle the explorer elements
class Explorer extends Component<PropsFromRedux, ExplorerState> {
    state = {
        selectedBookmarkID: '',
        selectedBranchID: '',
        selectedCommitID: '',
        selectedGroupID: '',

        branches: null,
        commits: null,
        bookmarks: null
    };

    async componentDidMount(): Promise<void> {
        await this.props.LoadSingleBlob();
        // Select the first group
        if ( !this.haveError() ) {
            if ( this.props.singleBlob.item!.bookmarks!.data.length > 0 ) {
                this.setState( {
                    selectedGroupID: this.props.singleBlob.item!.bookmarks!.data[0].uuid
                }, () => {
                    this.setBranches();
                } );
            }
        }
    }

    handleGroupSelect = ( groupID: string ) => {
        this.setState( {
            selectedGroupID: groupID,
            selectedBranchID: '',
            selectedCommitID: '',
            selectedBookmarkID: '',
            branches: null,
            commits: null,
            bookmarks: null
        }, () => {
            this.setBranches();
        } );
    };

    handleBranchSelect = ( branchID: string ) => {
        this.setState( {
            selectedBranchID: branchID,
            selectedCommitID: '',
            selectedBookmarkID: '',
            commits: null,
            bookmarks: null
        }, () => {
            this.setCommits();
        } );
    };

    handleCommitSelect = ( commitID: string ) => {
        this.setState( {
            selectedCommitID: commitID,
            selectedBookmarkID: '',
            bookmarks: null
        }, () => {
            this.setBookmarks();
        } );
    };

    handleBookmarkSelect = ( bookmarkID: string ) => {
        this.setState( {
            selectedBookmarkID: bookmarkID
        } );
    };

    handleUpdateBookmark = ( bookmarkID: string, url: string, title: string ) => {

    };

    // If error occurred
    haveError = () => {
        return !this.props.singleBlob.item || !this.props.singleBlob.item.bookmarks || this.props.singleBlob.hasError;
    };

    // Get all branches
    setBranches = () => {
        if ( this.haveError() ) {
            return;
        }

        const { selectedBranchID, selectedGroupID, selectedBookmarkID, selectedCommitID } = this.state;
        Queryer.selectBranches( selectedGroupID, {
            groupID: selectedGroupID,
            branchID: selectedBranchID,
            commitID: selectedCommitID,
            data: this.props.singleBlob.item!.bookmarks!
        } )
            .then( branches => {
                this.setState( {
                    branches
                } );
            } )
            .catch( err => {
                alert( err );
            } );
    };

    setCommits = () => {
        if ( this.haveError() ) {
            return;
        }

        const { selectedBranchID, selectedGroupID, selectedBookmarkID, selectedCommitID } = this.state;
        Queryer.selectCommits( selectedBranchID, {
            groupID: selectedGroupID,
            branchID: selectedBranchID,
            commitID: selectedCommitID,
            data: this.props.singleBlob.item!.bookmarks!
        } )
            .then( commits => {
                this.setState( {
                    commits
                } );
            } )
            .catch( err => {
                alert( err );
            } );
    };

    setBookmarks = () => {
        if ( this.haveError() ) {
            return;
        }

        const { selectedBranchID, selectedGroupID, selectedBookmarkID, selectedCommitID } = this.state;
        Queryer.selectBookmarks( selectedCommitID, {
            groupID: selectedGroupID,
            branchID: selectedBranchID,
            commitID: selectedCommitID,
            data: this.props.singleBlob.item!.bookmarks!
        } )
            .then( bookmarks => {
                this.setState( {
                    bookmarks
                } );
            } )
            .catch( err => {
                alert( err );
            } );
    };

    render() {
        const { singleBlob: { isLoading, hasError, reason, item } } = this.props;
        const { branches, commits, bookmarks } = this.state;
        const { selectedBookmarkID, selectedGroupID, selectedBranchID, selectedCommitID } = this.state;

        return (
            <div className={Styles.explorerBody}>

                {/*NavMenu*/}
                <div className={Styles.navMenu}>
                    <NavMenu data={this.props.singleBlob.item}
                             selectedBookmarkID={selectedBookmarkID}
                             selectedGroupID={selectedGroupID}
                             selectedBranchID={selectedBranchID}
                             selectedCommitID={selectedCommitID}

                             selectBookmark={this.handleBookmarkSelect}
                             selectCommit={this.handleCommitSelect}
                             selectBranch={this.handleBranchSelect}
                             selectGroup={this.handleGroupSelect}
                    />
                </div>

                {/*NavPanes*/}
                <div className={Styles.navPanes}>
                    {
                        isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            hasError ? (
                                <p>{reason}</p>
                            ) : (
                                <>
                                    {/*BranchesPane*/}
                                    <div className={Styles.branchesPane}>
                                        <Branches selectedBranch={selectedBranchID} branches={branches || []}
                                                  selectBranch={this.handleBranchSelect} />
                                    </div>
                                    {/*CommitsPane*/}
                                    <div className={Styles.commitsPane}>

                                        <Commits selectedCommit={selectedCommitID} commits={commits || []}
                                                 selectCommit={this.handleCommitSelect} />
                                    </div>
                                    {/*BookmarksPane*/}
                                    <div className={Styles.bookmarksPane}>
                                        <Bookmarks selectBookmark={this.handleBookmarkSelect}
                                                   bookmarks={bookmarks || []}
                                                   selectedBookmark={selectedBookmarkID} />
                                    </div>
                                </>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connector( Explorer );
