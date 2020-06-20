import React, { ReactChild, ReactChildren, ReactElement } from 'react';

interface ModelContentProps {
    children: ReactElement | ReactElement[];
}

function ModelContent( props: ModelContentProps ) {
    return (
        <div style={{overflowY: 'auto', maxHeight: 'calc(90vh - 50px)', width: '100%'}}>
            {props.children}
        </div>
    );
}

export default ModelContent;
