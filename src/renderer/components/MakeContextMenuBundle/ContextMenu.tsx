import React, { ReactChild, ReactChildren, ReactElement } from 'react';
import { ContextMenu as CMenu, ContextMenuTrigger as CMenuT, MenuItem as MItem } from 'react-contextmenu';
import ContextMenuStyles from '../../styles/components/ContextMenu.module.scss';

interface ContainerProps {
    children?: ReactElement | ReactElement[];
    id: any;
    contextMenu: ReactElement;
    onActivate?: ( id: string ) => void;
    onHide?: ( id: string ) => void;
}

interface MenuProps {
    children?: ReactElement | ReactElement[];
}

interface MenuItemProps {
    children?: ReactElement | ReactElement[];
    onClick?: () => void;
}

interface MenuItemWithIconProps extends MenuItemProps {
    icon?: ReactElement
}

const ContextMenu = {
    Container: function Container( props: ContainerProps ) {
        return (
            <>
                <CMenuT id={props.id}>
                    {props.children}
                </CMenuT>
                <CMenu id={props.id}
                       onShow={() => props.onActivate?.( props.id )}
                       onHide={() => props.onHide?.( props.id )}>
                    <MItem>
                        {props.contextMenu}
                    </MItem>
                </CMenu>
            </>
        );
    },
    Menu: function Menu( props: MenuProps ) {
        return (
            <ul className={ContextMenuStyles.contextMenu}>
                {props.children}
            </ul>
        );
    },
    MenuItem: function MenuItem( props: MenuItemProps ) {
        return (
            <li className={ContextMenuStyles.contextMenuItems} onClick={props.onClick}>
                {props.children}
            </li>
        );
    },
    MenuItemWithIcon: function MenuItemWithIcon(props: MenuItemWithIconProps) {
        return (
            <li className={ContextMenuStyles.contextMenuItems} onClick={props.onClick}>
                {props.icon}
                {props.children}
            </li>
        );
    },
    MenuDivider: function MenuDivider() {
        return (
            <div className={ContextMenuStyles.contextMenuDivider} />
        )
    }
};

export default ContextMenu;
