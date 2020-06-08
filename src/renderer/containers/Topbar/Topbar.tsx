import React from 'react';

import TitleBar from 'frameless-titlebar';
const icon = require( './icon.png' );

import * as Menus from './Menu/customMenu';
import { remote } from 'electron';

const currentWindow = remote.getCurrentWindow();
require( './Topbar.scss' );

function Topbar() {
    return (
        <div>
            <TitleBar
                icon={<img src={icon} className="icon" alt="App Icon" />}
                currentWindow={currentWindow}
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
