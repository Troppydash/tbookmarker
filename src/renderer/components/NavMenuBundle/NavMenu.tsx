import React, { useEffect, useState, Fragment } from 'react';
import { BookmarkBlob, BookmarkBookmarks, BookmarkBranch, BookmarkCommit } from '../../schemas/bookmarkSchemas';
import { Queryer } from '../../services/bookmarkQueryer';
import path from 'path';

import Styles from './NavMenu.module.scss';

interface NavMenuProps {
    selectedBranchID: string;
    selectedCommitID: string;
    selectedBookmarkID: string;
    selectedGroupID: string;

    data: BookmarkBlob | null;
}

function NavMenu( props: NavMenuProps ) {

    const [ menuPath, setMenuPath ] = useState<string[]>( [] );

    useEffect( () => {
        currentPath()
            .then( newPath => {
                setMenuPath( newPath );
            } );
    }, [ props ] );

    const currentPath = async () => {
        const { data, selectedGroupID, selectedBranchID, selectedCommitID, selectedBookmarkID } = props;
        const result: string[] = [];

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
            result.push( group ? group.name : selectedGroupID );

            if ( selectedBranchID ) {
                const branch = await Queryer.selectBranchFromBranchID( selectedBranchID, options );
                result.push( branch ? branch.name : selectedBranchID );

                if ( selectedCommitID ) {
                    const commit = await Queryer.selectCommitFromCommitID( selectedCommitID, options );
                    result.push( commit ? commit.title : selectedCommitID );

                    if ( selectedBookmarkID ) {
                        const bookmark = await Queryer.selectBookmarkFromBookmarkID( selectedBookmarkID, options );
                        result.push( bookmark ? bookmark.url : selectedBookmarkID );
                    }
                }
            }
        }

        return result;
    };

    return (
        <div className={Styles.container}>
            {
                menuPath.map( (menu, index) => {
                    return (
                        <Fragment key={index}>
                            <span className={Styles.containerHeading}>
                                {menu}
                            </span>
                            <span className={Styles.sep}>
                                {path.sep}
                            </span>
                        </Fragment>
                    );
                } )
            }
        </div>
    );
}

export default NavMenu;
