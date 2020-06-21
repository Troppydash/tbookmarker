import React, { useEffect, useState, Fragment } from 'react';
import { BookmarkBlob, BookmarkGroup } from '../../schemas/bookmarkSchemas';

import Styles from './NavMenu.module.scss';
import {
    AiOutlineFolderAdd,
    AiOutlineHome,
    BsFillBookmarkFill,
    FiGitBranch,
    FiGitCommit,
    MdViewColumn
} from 'react-icons/all';
import { IconType } from 'react-icons';
import ButtonStyles from '../../styles/components/Button.module.scss';
import FormModel from '../MakeModelBundle/FormModel';
import { ModelSize } from '../MakeModelBundle/MakeModel';
import { Formik } from 'formik';
import { BookmarkBranchBuilder, BookmarkGroupBuilder } from '../../schemas/bookmarksBuilders';
import FormStyles from '../../styles/components/Form.module.scss';
import Breadcrumb from './BreadcrumbBundle/Breadcrumb';
import ButtonModel from '../MakeModelBundle/ButtonModel';
import GroupManager from '../../containers/GroupMangerBundle/GroupManager';
import { useToggle } from 'ahooks';

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
    createGroup: ( newGroup: BookmarkGroup ) => Promise<void>;

}

interface NavMenuBreadcrumbItem {
    text: string;
    icon: IconType;
    onClick: () => void;

}

function NavMenu( props: NavMenuProps ) {

    const [ isShowing, { toggle } ] = useToggle();

    return (
        <>
            {/*Model*/}
            <ButtonModel handleClose={() => toggle()}
                         isShowing={isShowing}
                         size={ModelSize.lg}
                         mainTitle="Manage Groups"
                         subTitle="Available Groups">
                <GroupManager
                    handleSelect={groupID => {
                        props.selectGroup( groupID );
                        toggle();
                    }}
                    createGroup={( group ) => {
                        return props.createGroup( group );
                    }}
                />
            </ButtonModel>
            {/*Model*/}

            <div className={Styles.container}>
                <Breadcrumb {...props} />
                <div className={`${ButtonStyles.iconButtonContainer}`}
                     onClick={() => toggle()}>
                    <div className={`${ButtonStyles.iconButton} ${ButtonStyles.iconButtonSmall}`}>
                        <MdViewColumn />
                    </div>
                    <span>View Groups</span>
                </div>
            </div>
        </>
    );
}

export default NavMenu;
