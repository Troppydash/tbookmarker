import React, { Component, useState } from 'react';
import { BookmarkBranch, BookmarkCommit } from '../../../schemas/bookmarkSchemas';

import Styles from './Commits.module.scss';
import ContextMenuStyles from '../../../styles/components/ContextMenu.module.scss';
import SelectableListStyles from '../../../styles/components/SelectableList.module.scss';
import MakeContextMenu from '../../MakeContextMenuBundle/MakeContextMenu';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFolderAdd } from 'react-icons/all';

import { useToggle } from 'ahooks';
import FormModel from '../../MakeModelBundle/FormModel';
import { ModelSize } from '../../MakeModelBundle/MakeModel';
import { Formik } from 'formik';
import { BookmarkBranchBuilder, BookmarkCommitBuilder } from '../../../schemas/bookmarksBuilders';
import FormStyles from '../../../styles/components/Form.module.scss';
import ButtonStyles from '../../../styles/components/Button.module.scss';

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

    const createContextMenu = ( commitID: string ) => {
        return (
            <ul className={ContextMenuStyles.contextMenu}>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <span>{commitID}</span>
                </li>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <AiOutlineEdit />
                    <span>Rename</span>
                </li>
                <li className={ContextMenuStyles.contextMenuItems}>
                    <AiOutlineDelete />
                    <span>Delete</span>
                </li>
            </ul>
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
                                <MakeContextMenu id={commit.uuid}
                                                 key={commit.uuid}
                                                 contextMenu={createContextMenu( commit.uuid )}>
                                    <li className={
                                        `${SelectableListStyles.selectableListItem} ${props.selectedCommit === commit.uuid && SelectableListStyles.selectableListItem__selected}`
                                    }
                                        onClick={() => handleClick( commit.uuid )}>
                                        {commit.title}
                                    </li>
                                </MakeContextMenu>
                            );
                        } )
                    }
                </ul>
            </div>
        </>
    );

}

export default Commits;
