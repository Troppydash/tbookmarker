import React, { Component } from 'react';
import { BookmarkBranch } from '../../../schemas/bookmarkSchemas';

import Styles from './Branches.module.scss';
import SelectableListStyles from '../../../styles/components/SelectableList.module.scss';
import FormStyles from '../../../styles/components/Form.module.scss';
import ButtonStyles from '../../../styles/components/Button.module.scss';
import ContextMenuStyles from '../../../styles/components/ContextMenu.module.scss';

import { AiOutlineDelete, AiOutlineEdit, AiOutlineFolderAdd, MdContentCopy } from 'react-icons/all';
import MakeModel, { ModelSize } from '../../MakeModelBundle/MakeModel';
import ModelHeader from '../../MakeModelBundle/ModelHeaderBundle/ModelHeader';
import ModelContent from '../../MakeModelBundle/ModelContentBundle/ModelContent';
import { Formik } from 'formik';
import FormModel from '../../MakeModelBundle/FormModel';
import { BookmarkBranchBuilder } from '../../../schemas/bookmarksBuilders';
import ContextMenu from '../../MakeContextMenuBundle/ContextMenu';
import { WriteToClipboard } from '../../../services/desktop/desktopHelpers';

interface BranchesProps {
    branches: BookmarkBranch[];
    selectedBranch: string;
    selectBranch: ( branchID: string ) => void;
    addBranch: ( newBranch: BookmarkBranch ) => void;
}

interface BranchesState {
    isShowing: boolean;
}

class Branches extends Component<BranchesProps, BranchesState> {
    state = {
        isShowing: false
    };

    handleClick = ( uuid: string ) => {
        this.props.selectBranch( uuid );
    };

    openModel = () => {
        this.setState( {
            isShowing: true
        } );
    };

    closeModel = () => {
        this.setState( {
            isShowing: false
        } );
    };

    createContextMenu = ( branch: BookmarkBranch ) => {
        return (
            <ContextMenu.Menu>
                <ContextMenu.MenuItem>
                    <span>{branch.uuid}</span>
                </ContextMenu.MenuItem>
                <ContextMenu.MenuDivider />
                <ContextMenu.MenuItemWithIcon
                    onClick={() => {
                        WriteToClipboard( branch.name );
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

    render() {
        const { branches, selectedBranch, selectBranch } = this.props;
        const { isShowing } = this.state;

        return (
            <>
                {/*Model*/}
                <FormModel handleClose={this.closeModel}
                           isShowing={isShowing}
                           size={ModelSize.sm}
                           mainTitle="Add a new Branch"
                           subTitle="New Branch">
                    <Formik
                        initialValues={{
                            branchName: ''
                        }}
                        validate={values => {
                            const errors: any = {};
                            if ( !values.branchName ) {
                                errors.branchName = 'Branch Name is required';
                            }
                            return errors;
                        }}
                        onSubmit={( values, { setSubmitting } ) => {
                            const newBranch = new BookmarkBranchBuilder()
                                .name( values.branchName )
                                .build();

                            this.props.addBranch( newBranch );
                            this.closeModel();
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
                                    <label className={FormStyles.inputLabel}>Branch Name:</label>
                                    <input type="text"
                                           name="branchName"
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.branchName}
                                           className={FormStyles.input} />
                                    <span className={FormStyles.error}>
                                        {errors.branchName && touched.branchName && errors.branchName}
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
                        <span className={Styles.folderTitleText}>Branches</span>
                        <div className={ButtonStyles.iconButton} onClick={this.openModel}>
                            <AiOutlineFolderAdd />
                        </div>
                    </div>

                    <div className={SelectableListStyles.scrollable}>
                        <ul className={SelectableListStyles.selectableListContainer}>
                            {
                                branches.map( branch => {
                                    return (
                                        <ContextMenu.Container id={branch.uuid}
                                                     key={branch.uuid}
                                                     contextMenu={this.createContextMenu( branch )}>
                                            <li className={
                                                `${SelectableListStyles.selectableListItem} ${selectedBranch === branch.uuid && SelectableListStyles.selectableListItem__selected}`
                                            }
                                                onClick={() => this.handleClick( branch.uuid )}>
                                                {branch.name}
                                            </li>
                                        </ContextMenu.Container>
                                    );
                                } )
                            }
                        </ul>
                    </div>
                </div>
            </>
        );
    }

}

export default Branches;
