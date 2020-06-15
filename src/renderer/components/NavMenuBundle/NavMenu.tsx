import React, { useEffect, useState, Fragment } from 'react';
import { BookmarkBlob } from '../../schemas/bookmarkSchemas';

import Styles from './NavMenu.module.scss';
// import { Breadcrumb, Breadcrumbs, IBreadcrumbProps, Icon } from '@blueprintjs/core';
import { Queryer } from '../../services/bookmarks/exports';
import { Breadcrumb } from 'antd';
import { Icon } from '@blueprintjs/core';

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

interface NavMenuBreadcrumbItem {
    text: string;
    icon: string;
    onClick: () => void;
}

function NavMenu( props: NavMenuProps ) {

    const [ menuPath, setMenuPath ] = useState<NavMenuBreadcrumbItem[]>( [] );

    useEffect( () => {
        currentPath()
            .then( newPath => {
                setMenuPath( newPath );
            } );
    }, [ props ] );

    const currentPath = async () => {
        const { data, selectedGroupID, selectedBranchID, selectedCommitID, selectedBookmarkID } = props;
        const { selectBranch, selectGroup, selectBookmark, selectCommit } = props;
        const result: NavMenuBreadcrumbItem[] = [];

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

    return (
        <div className={Styles.container}>
            {
                menuPath.map( ( item, index ) => {
                    return (
                        <>
                            {
                                index !== 0 && (
                                    <div className={Styles.breadcrumbSep}>
                                        <span>/</span>
                                    </div>
                                )
                            }
                            <div className={`${Styles.breadcrumbItem}`} onClick={item.onClick}>
                                <Icon icon={item.icon as any}/>
                                <span>{item.text}</span>
                            </div>
                        </>
                    );
                } )
            }
        </div>
    );
}

export default NavMenu;
