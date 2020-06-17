import React, { Component, ReactChild, ReactChildren } from 'react';

import Styles from './ModelHeader.module.scss';
import { AiOutlineClose, IoMdClose } from 'react-icons/all';

interface ModelHeaderProps {
    title: string;
    handleClose?: () => void;
}

interface ModelHeaderStates {

}

class ModelHeader extends Component<ModelHeaderProps, ModelHeaderStates> {
    render() {
        return (
            <div className={Styles.modelHeaderContainer}>
                <div className={Styles.modelHeaderText}>
                    <span>{this.props.title}</span>
                </div>

                <div className={Styles.modelHeaderButton}>
                    <button onClick={this.props.handleClose}>
                        <IoMdClose/>
                    </button>
                </div>
            </div>
        );
    }
}

export default ModelHeader;
