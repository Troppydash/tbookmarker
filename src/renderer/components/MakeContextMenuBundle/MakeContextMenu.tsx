import React, { ReactChild, ReactChildren } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

interface MakeContextMenuProps {
    children: ReactChild | ReactChildren;
    id: any;
    contextMenu: ReactChild;
}

// Little ReactContextMenu wrapper
function MakeContextMenu( props: MakeContextMenuProps ) {
    return (
        <>
            <ContextMenuTrigger id={props.id}>
                {props.children}
            </ContextMenuTrigger>
            <ContextMenu id={props.id}>
                <MenuItem>
                    {props.contextMenu}
                </MenuItem>
            </ContextMenu>
        </>
    );
}

export default MakeContextMenu;