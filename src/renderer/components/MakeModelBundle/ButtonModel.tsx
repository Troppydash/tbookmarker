import React from 'react';
import MakeModel, { MakeModelProps } from './MakeModel';
import ModelHeader from './ModelHeaderBundle/ModelHeader';
import ModelContent from './ModelContentBundle/ModelContent';
import Styles from './MakeModel.module.scss';
import FooterStyles from './ButtonModel.module.scss';
import ButtonStyles from '../../styles/components/Button.module.scss';
import ModelFooter from './ModelFooterBundle/ModelFooter';

interface ButtonModelProps extends MakeModelProps {
    mainTitle: string;
    subTitle: string;
    onOK?: () => void;
    onCancel?: () => void;
}

function ButtonModel( props: ButtonModelProps ) {
    return (
        <MakeModel {...props}>
            <ModelHeader title={props.mainTitle} />
            <ModelContent>
                <div className={Styles.modelContent}>
                    <h1>{props.subTitle}</h1>
                    {props.children}
                </div>
            </ModelContent>
            <ModelFooter>
                <div className={FooterStyles.footer}>
                    <div className={FooterStyles.buttonGroup}>
                        {
                            <button className={ButtonStyles.normalButton}
                                    onClick={props.onOK || props.handleClose}>
                                OK
                            </button>
                        }
                        {
                            props.onCancel && (
                                <button className={`${ButtonStyles.normalButton} ${ButtonStyles.normalButtonRed}`}
                                        onClick={props.onCancel}>
                                    Cancel
                                </button>
                            )
                        }
                    </div>
                </div>
            </ModelFooter>
        </MakeModel>
    );
}

export default ButtonModel;
