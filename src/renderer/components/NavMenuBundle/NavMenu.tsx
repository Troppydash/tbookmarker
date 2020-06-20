import React, { useEffect, useState, Fragment } from 'react';
import { BookmarkBlob, BookmarkGroup } from '../../schemas/bookmarkSchemas';

import Styles from './NavMenu.module.scss';
import { AiOutlineFolderAdd, AiOutlineHome, BsFillBookmarkFill, FiGitBranch, FiGitCommit } from 'react-icons/all';
import { IconType } from 'react-icons';
import ButtonStyles from '../../styles/components/Button.module.scss';
import FormModel from '../MakeModelBundle/FormModel';
import { ModelSize } from '../MakeModelBundle/MakeModel';
import { Formik } from 'formik';
import { BookmarkBranchBuilder, BookmarkGroupBuilder } from '../../schemas/bookmarksBuilders';
import FormStyles from '../../styles/components/Form.module.scss';
import Breadcrumb from './BreadcrumbBundle/Breadcrumb';

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
    createGroup: ( newGroup: BookmarkGroup ) => void;

}

interface NavMenuBreadcrumbItem {
    text: string;
    icon: IconType;
    onClick: () => void;

}

function NavMenu( props: NavMenuProps ) {

    const [ isShowing, setIsShowing ] = useState( false );

    return (
        <>
            {/*Model*/}
            <FormModel handleClose={() => setIsShowing( false )}
                       isShowing={isShowing}
                       size={ModelSize.sm}
                       mainTitle="Add a new Group"
                       subTitle="New Group">
                <Formik
                    initialValues={{
                        name: '',
                        description: ''
                    }}
                    validate={values => {
                        const errors: any = {};
                        if ( !values.name ) {
                            errors.name = 'Group Name is required';
                        }
                        return errors;
                    }}
                    onSubmit={( values, { setSubmitting } ) => {
                        const builder = new BookmarkGroupBuilder()
                            .name( values.name );
                        if ( values.description ) {
                            builder
                                .description( values.description );
                        }
                        const newGroup = builder.build();
                        props.createGroup( newGroup );
                        setIsShowing( false );
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
                                <label className={FormStyles.inputLabel}>Name:</label>
                                <input type="text"
                                       name="name"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.name}
                                       className={FormStyles.input} />
                                <span className={FormStyles.error}>
                                    {errors.name && touched.name && errors.name}
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
                <Breadcrumb {...props} />
                <div className={`${ButtonStyles.iconButtonContainer}`}
                     onClick={() => setIsShowing( true )}>
                    <div className={`${ButtonStyles.iconButton} ${ButtonStyles.iconButtonSmall}`}>
                        <AiOutlineFolderAdd />
                    </div>
                    <span>Add Group</span>
                </div>
                {/*TODO: View Groups*/}
                <div className={`${ButtonStyles.iconButtonContainer}`}
                     onClick={() => setIsShowing( true )}>
                    <div className={`${ButtonStyles.iconButton} ${ButtonStyles.iconButtonSmall}`}>
                        <AiOutlineFolderAdd />
                    </div>
                    <span>View Groups</span>
                </div>
            </div>
        </>
    );
}

export default NavMenu;
