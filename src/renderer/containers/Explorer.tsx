import React, { Component } from 'react';

import Styles from './Explorer.module.scss';

import { RootState } from '../reducers';
import { LoadAllBlobs, LoadSingleBlob } from '../actions/load/bookmarksLoadActions';
import { SaveSingleBookmarkBlob } from '../actions/save/bookmarksSaveActions';
import { connect, ConnectedProps } from 'react-redux';
import NavMenu from '../components/NavMenuBundle/NavMenu';
import Branches from '../components/PanelsBundle/BranchesBundle/Branches';
import Commits from '../components/PanelsBundle/CommitsBundle/Commits';
import Bookmarks from '../components/PanelsBundle/BookmarksBundle/Bookmarks';
import { BookmarkBookmarks, BookmarkBranch, BookmarkCommit, BookmarkGroup } from '../schemas/bookmarkSchemas';
import {
    CreateBookmark,
    CreateBranch,
    CreateCommit,
    CreateGroup,
    CreateSchema
} from '../actions/create/bookmarksCreateActions';
import _ from 'lodash';
import { Queryer } from '../services/bookmarks/exports';
import { doesAnyBookmarksExist } from '../services/bookmarks/json/jsonBookmarksHelpers';
import { BookmarkGroupBuilder } from '../schemas/bookmarksBuilders';

// Redux connector
const mapStateToProps = ( state: RootState ) => ({
    ...state
});

const mapDispatchToProps = {
    LoadAllBlobs: LoadAllBlobs,
    LoadSingleBlob: LoadSingleBlob,
    SaveBlob: SaveSingleBookmarkBlob,
    AddBranch: CreateBranch,
    AddSchema: CreateSchema,
    AddGroup: CreateGroup,
    AddCommit: CreateCommit,
    AddBookmark: CreateBookmark
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

/**
 * Main Explorer Renderer
 */
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

            // TODO: Show first group dialog
            const firstGroup = new BookmarkGroupBuilder()
                .name("Initial Group")
                .description("Auto Generated Group")
                .build();
            await this.props.AddGroup(firstGroup, this.getOptions());
        } else {
            await this.props.LoadSingleBlob();
        }

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

        Queryer.selectBookmarks( selectedCommitID, options )
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

    handleAddBranch = async ( newBranch: BookmarkBranch ) => {
        const options = this.getOptions();
        if ( options !== null ) {
            await this.props.AddBranch( newBranch, options );
        }
        await this.setBranches();
    };

    handleAddGroup = async ( newGroup: BookmarkGroup ) => {
        const options = this.getOptions();
        if ( options !== null ) {
            await this.props.AddGroup( newGroup, options );
            return;
        }
        return;
    };

    handleAddCommit = async ( newCommit: BookmarkCommit ) => {
        const options = this.getOptions();
        if ( options !== null ) {
            await this.props.AddCommit( newCommit, options );
        }
        await this.setCommits();
    };

    handleAddBookmarks = async ( newBookmark: BookmarkBookmarks[] ) => {
        const options = this.getOptions();
        if ( options !== null ) {
            for (const bookmark of newBookmark) {
                await this.props.AddBookmark(bookmark, options);
            }
        }
        await this.setBookmarks();
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
                             createGroup={this.handleAddGroup} />
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
                                                 selectCommit={this.handleCommitSelect}
                                                 addCommit={this.handleAddCommit}
                                                 isEnabled={!!this.state.selectedBranchID} />
                                    </div>
                                    {/*BookmarksPane*/}
                                    <div className={Styles.bookmarksPane}>
                                        <Bookmarks selectBookmark={this.handleBookmarkSelect}
                                                   bookmarks={bookmarks || []}
                                                   selectedBookmark={selectedBookmarkID}
                                        addBookmarks={this.handleAddBookmarks}
                                        isEnabled={!!this.state.selectedCommitID}/>
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
