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
import { CreateBranch, CreateSchema } from '../actions/create/bookmarksCreateActions';
import { makeBookmarkBranch } from '../schemas/bookmarksEmpty';
import { JSONUpdaterOptions } from '../services/bookmarks/bookmarkCreator';
import { doesAnyBookmarksExist } from '../services/jsonBookmarksHandler';
import _ from 'lodash';

// Redux connector
const mapStateToProps = ( state: RootState ) => ({
    ...state
});

const mapDispatchToProps = {
    LoadAllBlobs: LoadAllBlobs,
    LoadSingleBlob: LoadSingleBlob,
    SaveBlob: SaveSingleBookmarkBlob,
    AddBranch: CreateBranch,
    AddSchema: CreateSchema
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
        const doesExist = await doesAnyBookmarksExist();
        if ( !doesExist ) {
            alert( 'Adding Schema' );
            await this.props.AddSchema();
        }

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

    // start::Selection
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
    haveError = () => {
        return !this.props.singleBlob.item || !this.props.singleBlob.item.bookmarks || this.props.singleBlob.hasError;
    };
    setBranches = () => {
        const options = this.getOptions();
        if ( options === null ) {
            return;
        }

        const { selectedBranchID, selectedGroupID, selectedBookmarkID, selectedCommitID } = this.state;
        Queryer.selectBranches( selectedGroupID, options )
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
        const options = this.getOptions();
        if ( options === null ) {
            return;
        }

        const { selectedBranchID, selectedGroupID, selectedBookmarkID, selectedCommitID } = this.state;
        Queryer.selectCommits( selectedBranchID, options )
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
        const options = this.getOptions();
        if ( options === null ) {
            return;
        }

        const { selectedBranchID, selectedGroupID, selectedBookmarkID, selectedCommitID } = this.state;

        Queryer.selectBookmarks( selectedCommitID, options)
            .then( bookmarks => {
                this.setState( {
                    bookmarks
                } );
            } )
            .catch( err => {
                alert( err );
            } );
    };
    // end::Selection

    handleUpdateBookmark = ( bookmarkID: string, url: string, title: string ) => {

    };

    getOptions = () => {
        if ( this.haveError() ) {
            return null;
        }
        const { selectedBranchID, selectedGroupID, selectedBookmarkID, selectedCommitID } = this.state;
        return {
            groupID: selectedGroupID,
            branchID: selectedBranchID,
            commitID: selectedCommitID,
            data: _.cloneDeep( this.props.singleBlob.item!.bookmarks! )
        };
    };

    handleAddBranch = () => {
        // TODO: Implement this
        const newBranch = makeBookmarkBranch();
        newBranch.name = 'Nice Branch';
        newBranch.description = 'Very Nice Branch indeed.';

        const options = this.getOptions();
        if ( options !== null ) {
            this.props.AddBranch( newBranch, options );
        }
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
                                                  selectBranch={this.handleBranchSelect}
                                                  addBranch={this.handleAddBranch} />
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
