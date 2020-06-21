import { RootState } from '../../reducers';

import { connect, ConnectedProps } from 'react-redux';
import { BookmarkBookmarks, BookmarkBranch, BookmarkCommit, BookmarkGroup } from '../../schemas/bookmarkSchemas';
import { Component } from 'react';
import React from 'react';
import Styles from './GroupManager.module.scss';
import { Queryer } from '../../services/bookmarks/exports';
import GroupCard from '../../components/GroupCardBundle/GroupCard';
import EmptyGroupCard from '../../components/GroupCardBundle/EmptyGroupCard';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { Formik } from 'formik';
import { BookmarkGroupBuilder } from '../../schemas/bookmarksBuilders';
import FormStyles from '../../styles/components/Form.module.scss';
import ButtonStyles from '../../styles/components/Button.module.scss';


// Redux connector
const mapStateToProps = ( state: RootState ) => ({
    ...state
});

const mapDispatchToProps = {};

interface GroupManagerProps {
    handleSelect: ( groupID: string ) => void;
    createGroup: (group: BookmarkGroup) => Promise<void>;
}

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector> & GroupManagerProps;

interface GroupManagerState {
    selectedGroupID: string;
    groups: BookmarkGroup[] | null;
    isOpen: boolean;
}

/**
 * Main Explorer Renderer
 */
class GroupManager extends Component<PropsFromRedux, GroupManagerState> {
    state = {
        selectedGroupID: '',
        groups: null as (BookmarkGroup[] | null),

        isOpen: false
    };

    haveError = () => {
        return !this.props.singleBlob.item || !this.props.singleBlob.item.bookmarks || this.props.singleBlob.hasError;
    };

    setGroups = () => {
        if ( this.haveError() ) {
            return;
        }

        Queryer.selectGroups( this.props.singleBlob.item! )
            .then( groups => {
                this.setState( {
                    groups
                } );
            } )
            .catch( err => {
                alert( err );
            } );
    };


    componentDidMount(): void {
        if ( this.haveError() ) {
            return;
        }

        this.setGroups();
    }

    openPopover = () => {
        this.setState( {
            isOpen: true
        } );
    };

    closePopover = () => {
        this.setState( {
            isOpen: false
        } );
    };

    render() {
        const { groups } = this.state;
        return (
            <div className={Styles.container}>
                {
                    groups === null ? (
                        <p>{this.props.singleBlob.reason || 'Something went wrong'}</p>
                    ) : (
                        groups.map( group => (
                            <GroupCard group={group} key={group.uuid} onClick={this.props.handleSelect}/>
                        ) )
                    )
                }
                <Popover
                    isOpen={this.state.isOpen}
                    onClickOutside={() => this.closePopover()}
                    padding={5}
                    content={
                        ( { position, targetRect, popoverRect } ) => (
                            <ArrowContainer
                                position={position}
                                targetRect={targetRect}
                                popoverRect={popoverRect}
                                arrowColor={'#DECBB7'}
                                arrowSize={15}>
                                <div style={{padding: '0.2rem 1rem'}} className={Styles.popover}>
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
                                            this.props.createGroup( newGroup )
                                                .then(() => {
                                                    this.setGroups();
                                                    this.closePopover();
                                                })
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
                                                <h3 style={{margin: '0'}}>Create a new Group</h3>
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
                                </div>
                            </ArrowContainer>
                        )
                    }>
                    <EmptyGroupCard onClick={() => this.openPopover()} />
                </Popover>
            </div>
        );
    }

}

export default connector( GroupManager );
