import React, { ReactElement } from 'react';
import MakeModel, { MakeModelProps, ModelSize } from './MakeModel';
import ModelHeader from './ModelHeaderBundle/ModelHeader';
import ModelContent from './ModelContentBundle/ModelContent';
import Styles from './MakeModel.module.scss';

export interface FormModelProps extends MakeModelProps {
    children: ReactElement | ReactElement[];

    mainTitle: string;
    subTitle: string
}

function FormModel( props: FormModelProps ) {
    return (
        <MakeModel {...props}>
            <ModelHeader title={props.mainTitle} />
            <ModelContent>
                <div className={Styles.modelContent}>
                    <h1>{props.subTitle}</h1>
                    {props.children}
                </div>
            </ModelContent>
        </MakeModel>
    );
}

export default FormModel;
