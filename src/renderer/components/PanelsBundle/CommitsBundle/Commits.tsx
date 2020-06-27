import React, { Component, useState } from 'react';
import { BookmarkBranch, BookmarkCommit } from '../../../schemas/bookmarkSchemas';

import Styles from './Commits.module.scss';
import ContextMenuStyles from '../../../styles/components/ContextMenu.module.scss';
import SelectableListStyles from '../../../styles/components/SelectableList.module.scss';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFolderAdd, MdContentCopy } from 'react-icons/all';

import { useToggle } from 'ahooks';
import FormModel from '../../MakeModelBundle/FormModel';
import { ModelSize } from '../../MakeModelBundle/MakeModel';
import { Formik } from 'formik';
import { BookmarkBranchBuilder, BookmarkCommitBuilder } from '../../../schemas/bookmarksBuilders';
import FormStyles from '../../../styles/components/Form.module.scss';
import ButtonStyles from '../../../styles/components/Button.module.scss';
import ContextMenu from '../../MakeContextMenuBundle/ContextMenu';
import { WriteToClipboard } from '../../../services/desktop/desktopHelpers';

interface CommitsProps {
    commits: BookmarkCommit[];
    selectedCommit: string;
    selectCommit: ( branchID: string ) => void;
    addCommit: ( newCommit: BookmarkCommit ) => void;
    isEnabled: boolean;
}

function Commits( props: CommitsProps ) {

    const [ isShowing, { toggle } ] = useToggle();

    const handleClick = ( uuid: string ) => {
        props.selectCommit( uuid );
    };

    const createContextMenu = ( commit: BookmarkCommit ) => {
        return (
            <ContextMenu.Menu>
                <ContextMenu.MenuItem>
                    <span>{commit.uuid}</span>
                </ContextMenu.MenuItem>
                <ContextMenu.MenuDivider />
                <ContextMenu.MenuItemWithIcon
                    onClick={() => {
                        WriteToClipboard( commit.title );
                    }}
                    icon={<MdContentCopy />}>
                    <span>Copy To Clipboard</span>
                </ContextMenu.MenuItemWithIcon>
                <ContextMenu.MenuItemWithIcon icon={<AiOutlineEdit />}>
                    <span>Rename</span>
                </ContextMenu.MenuItemWithIcon>
                <ContextMenu.MenuItemWithIcon icon={<AiOutlineDelete />}>
                    <span>Delete</span>
                </ContextMenu.MenuItemWithIcon>
            </ContextMenu.Menu>
        );
    };


    return (
        <>
            {/*Model*/}
            <FormModel handleClose={() => toggle()}
                       isShowing={isShowing}
                       size={ModelSize.sm}
                       mainTitle="Add a new Commit"
                       subTitle="New Commit">
                <Formik
                    initialValues={{
                        title: '',
                        description: ''
                    }}
                    validate={values => {
                        const errors: any = {};
                        if ( !values.title ) {
                            errors.title = 'Commit Title is required';
                        }
                        return errors;
                    }}
                    onSubmit={( values, { setSubmitting } ) => {
                        // Submit
                        const newCommit = new BookmarkCommitBuilder()
                            .title( values.title )
                            .description( values.description || undefined )
                            .build();
                        props.addCommit( newCommit );
                        toggle();
                    }}>
                    {( {
                           values,
                           errors,
                           touched,
                           handleChange,
                           handleBlur,
                           handleSubmit
                       } ) => (
                        <form onSubmit={handleSubmit} className={FormStyles.form}>
                            <div className={FormStyles.inputGroup}>
                                <label className={FormStyles.inputLabel}>Title:</label>
                                <input type="text"
                                       name="title"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.title}
                                       className={FormStyles.input} />
                                <span className={FormStyles.error}>
                                        {errors.title && touched.title && errors.title}
                                    </span>
                            </div>
                            <div className={FormStyles.inputGroup}>
                                <label className={FormStyles.inputLabel}>Description:</label>
                                <input type="text"
                                       name="description"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.description}
                                       className={FormStyles.input} />
                                <span className={FormStyles.error}>
                                        {errors.description && touched.description && errors.description}
                                    </span>
                            </div>
                            <div className={FormStyles.inputGroupSubmit}>
                                <button type="submit"
                                        className={`${ButtonStyles.normalButton} ${FormStyles.formSubmit}`}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </FormModel>
            {/*Model*/}
            <div className={Styles.container}>
                <div className={Styles.folderTitle}>
                    <span className={Styles.folderTitleText}>Commits</span>
                    <button className={ButtonStyles.iconButton} onClick={() => toggle()}
                            disabled={!props.isEnabled}>
                        <AiOutlineFolderAdd />
                    </button>
                </div>
                <ul className={SelectableListStyles.selectableListContainer}>
                    {
                        props.commits.map( commit => {
                            return (
                                <ContextMenu.Container id={commit.uuid}
                                             key={commit.uuid}
                                             contextMenu={createContextMenu( commit )}>
                                    <li className={
                                        `${SelectableListStyles.selectableListItem} ${props.selectedCommit === commit.uuid && SelectableListStyles.selectableListItem__selected}`
                                    }
                                        onClick={() => handleClick( commit.uuid )}>
                                        {commit.title}
                                    </li>
                                </ContextMenu.Container>
                            );
                        } )
                    }
                </ul>
            </div>
        </>
    );

}

export default Commits;
