import React from 'react';

import TitleBar from 'frameless-titlebar';

const icon = require( './icon.png' );

import * as Menus from './Menu/customMenu';
import { remote } from 'electron';

const currentWindow = remote.getCurrentWindow();
import Styles from './Topbar.scss';

function Topbar() {
    return (
        <div className={Styles.icon}>
            <TitleBar
                iconSrc={icon}
                currentWindow={currentWindow}
                platform={process.platform as any}
                theme={{}}
                title="TBookmarker"
                menu={Menus.MainMenu}
                onClose={() => currentWindow.close()}
                onMinimize={() => currentWindow.minimize()}
                onMaximize={() => {
                    currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
                }}
                onDoubleClick={() => currentWindow.maximize()}>

            </TitleBar>
        </div>
    );
}

export default Topbar;
