import React, {
    Children,
    cloneElement,
    Component,
    isValidElement,
    ReactChild,
    ReactChildren,
    ReactElement
} from 'react';

import Styles from './MakeModel.module.scss';

export enum ModelSize {
    sm, md, lg, xl
}

interface MakeModelProps {
    handleClose: () => void;
    children: ReactElement | ReactElement[];

    isShowing: boolean;
    size: ModelSize;
}

interface MakeModelStates {

}

class MakeModel extends Component<MakeModelProps, MakeModelStates> {

    calculateModelWidth = () => {
        switch ( this.props.size ) {
            case ModelSize.lg:
                return '1024px';
            case ModelSize.md:
                return '768px';
            case ModelSize.sm:
                return '486px';
            case ModelSize.xl:
                return '1600px';
        }
    };

    render() {
        const { handleClose, children, isShowing } = this.props;

        const childrenWithProps = Children.map( children, child => {
            if ( isValidElement( child ) ) {
                return cloneElement( child, { handleClose } );
            }
            return child;
        } );

        return (
            <>
                {
                    isShowing && (
                        <div className={Styles.zIndexFix}>
                            <div className={Styles.modelBackdrop} onClick={handleClose} />
                            <div className={Styles.modelContainer} style={{ width: this.calculateModelWidth() }}>
                                {childrenWithProps}
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
}

export default MakeModel;
