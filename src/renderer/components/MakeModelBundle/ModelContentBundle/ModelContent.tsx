import React, { ReactChild, ReactChildren, ReactElement } from 'react';

interface ModelContentProps {
    children: ReactElement | ReactElement[];
}

function ModelContent( props: ModelContentProps ) {
    return (
        <>
            {props.children}
        </>
    );
}

export default ModelContent;
