import React, { useEffect, useState, Fragment } from 'react';
import { BookmarkBlob, BookmarkBookmarks, BookmarkBranch, BookmarkCommit } from '../../schemas/bookmarkSchemas';
import { Queryer } from '../../services/bookmarkQueryer';
import path from 'path';

import Styles from './NavMenu.module.scss';
import { Breadcrumb, Breadcrumbs, IBreadcrumbProps, Icon } from '@blueprintjs/core';
import { render } from 'react-dom';

interface NavMenuProps {
    selectedBranchID: string;
    selectedCommitID: string;
    selectedBookmarkID: string;
    selectedGroupID: string;

    data: BookmarkBlob | null;

    selectBranch: ( branchID: string ) => void;
    selectGroup: ( groupID: string ) => void;
    selectCommit: ( commitID: string ) => void;
    selectBookmark: ( bookmarkID: string ) => void;
}

function NavMenu( props: NavMenuProps ) {

    const [ menuPath, setMenuPath ] = useState<IBreadcrumbProps[]>( [] );

    useEffect( () => {
        currentPath()
            .then( newPath => {
                setMenuPath( newPath );
            } );
    }, [ props ] );

    const currentPath = async () => {
        const { data, selectedGroupID, selectedBranchID, selectedCommitID, selectedBookmarkID } = props;
        const { selectBranch, selectGroup, selectBookmark, selectCommit } = props;
        const result: IBreadcrumbProps[] = [];

        if ( !data || !data.bookmarks ) {
            return result;
        }

        if ( selectedGroupID ) {
            const options = {
                data: data.bookmarks,
                commitID: selectedCommitID,
                branchID: selectedBranchID,
                groupID: selectedGroupID
            };

            const group = await Queryer.selectGroupFromGroupID( selectedGroupID, options );

            result.push( {
                text: group ? group.name : selectedGroupID,
                icon: 'git-commit',
                onClick: () => selectGroup( selectedGroupID )
            } );

            if ( selectedBranchID ) {
                const branch = await Queryer.selectBranchFromBranchID( selectedBranchID, options );
                result.push( {
                    text: branch ? branch.name : selectedBranchID,
                    icon: 'git-branch',
                    onClick: () => selectBranch( selectedBranchID )
                } );

                if ( selectedCommitID ) {
                    const commit = await Queryer.selectCommitFromCommitID( selectedCommitID, options );
                    result.push( {
                        text: commit ? commit.title : selectedCommitID,
                        icon: 'git-commit',
                        onClick: () => selectCommit( selectedCommitID )
                    } );

                    if ( selectedBookmarkID ) {
                        const bookmark = await Queryer.selectBookmarkFromBookmarkID( selectedBookmarkID, options );
                        result.push( {
                            text: bookmark ? bookmark.url : selectedBookmarkID,
                            icon: 'bookmark',
                            onClick: () => selectBookmark( selectedBookmarkID )
                        } );
                    }
                }
            }
        }

        return result;
    };

    // TODO: Add Search Function
    const renderCurrentBreadcrumb = ( { text, icon, ...restProps }: IBreadcrumbProps ) => {
        return <Breadcrumb className={Styles.containerHeading} {...restProps}><Icon icon={icon} />{text}</Breadcrumb>;
    };

    return (
        <div className={Styles.container}>
            <Breadcrumbs currentBreadcrumbRenderer={renderCurrentBreadcrumb}
                         collapseFrom={'start'}
                         className={Styles.breadcrumbsContainer}
                         items={menuPath}
            popoverProps={{
                className: 'bp3-dark'
            }}/>
        </div>
    );
}

export default NavMenu;
