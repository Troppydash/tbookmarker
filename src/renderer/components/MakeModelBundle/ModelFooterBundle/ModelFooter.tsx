import React, { ReactChild, ReactChildren, ReactElement } from 'react';

import Styles from './ModelFooter.module.scss';

interface ModelFooterProps {
    children: ReactElement | ReactElement[];
}

function ModelFooter( props: ModelFooterProps ) {
    return (
        <div className={Styles.footer}>
            {props.children}
        </div>
    );
}

export default ModelFooter;
