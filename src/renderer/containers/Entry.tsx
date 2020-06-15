import React from 'react';
import { hot } from 'react-hot-loader/root';
import Topbar from './TopbarBundle/Topbar';

import './Entry.scss';

// Antd Import
import 'normalize.css';
import 'antd/dist/antd.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import Explorer from './Explorer';

// Entry to App
class Entry extends React.Component {
    render() {
        return (
            <>
                {/* Custom Topbar */}
                <Topbar />
                {/*Main Page*/}
                <Explorer />
            </>
        );
    }
}


export default hot( Entry );
