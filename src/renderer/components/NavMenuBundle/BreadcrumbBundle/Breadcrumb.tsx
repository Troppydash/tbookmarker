import React, { Fragment, useEffect, useState } from 'react';
import { Queryer } from '../../../services/bookmarks/exports';
import { AiOutlineHome, BsFillBookmarkFill, FiGitBranch, FiGitCommit } from 'react-icons/all';
import { BookmarkBlob, BookmarkGroup } from '../../../schemas/bookmarkSchemas';
import { IconType } from 'react-icons';
import BreadcrumbStyles from '../../../styles/components/Breadcrumb.module.scss';

interface BreadcrumbProps {
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
    icon: IconType;
    onClick: () => void;
}

function Breadcrumb( props: BreadcrumbProps ) {
    const [ menuPath, setMenuPath ] = useState<NavMenuBreadcrumbItem[]>( [] );

    useEffect( () => {
        getCurrentPath()
            .then( newPath => {
                setMenuPath( newPath );
            } );
    }, [ props ] );

    const getCurrentPath = async () => {
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
                icon: AiOutlineHome,
                onClick: () => selectGroup( selectedGroupID )
            } );

            if ( selectedBranchID ) {
                const branch = await Queryer.selectBranchFromBranchID( selectedBranchID, options );
                result.push( {
                    text: branch ? branch.name : selectedBranchID,
                    icon: FiGitBranch,
                    onClick: () => selectBranch( selectedBranchID )
                } );

                if ( selectedCommitID ) {
                    const commit = await Queryer.selectCommitFromCommitID( selectedCommitID, options );
                    result.push( {
                        text: commit ? commit.title : selectedCommitID,
                        icon: FiGitCommit,
                        onClick: () => selectCommit( selectedCommitID )
                    } );

                    if ( selectedBookmarkID ) {
                        const bookmark = await Queryer.selectBookmarkFromBookmarkID( selectedBookmarkID, options );
                        result.push( {
                            text: bookmark ? bookmark.url : selectedBookmarkID,
                            icon: BsFillBookmarkFill,
                            onClick: () => selectBookmark( selectedBookmarkID )
                        } );
                    }
                }
            }
        }

        return result;
    };

    return (
        <div className={BreadcrumbStyles.breadcrumbContainer}>
            {
                menuPath.map( ( item, index ) => {
                    return (
                        <Fragment key={index}>
                            {
                                index !== 0 && (
                                    <div className={BreadcrumbStyles.breadcrumbSeparator}>
                                        <span>/</span>
                                    </div>
                                )
                            }
                            <div className={BreadcrumbStyles.breadcrumbItem}
                                 onClick={item.onClick}>
                                <div className={BreadcrumbStyles.breadcrumbIcon}>
                                    <item.icon />
                                </div>
                                <div className={BreadcrumbStyles.breadcrumbText}>
                                    <span>{item.text}</span>
                                </div>
                            </div>
                        </Fragment>
                    );
                } )
            }
        </div>
    );
}

export default Breadcrumb;
