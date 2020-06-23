import React from 'react';
import { hot } from 'react-hot-loader/root';
import Topbar from './TopbarBundle/Topbar';

import './Entry.scss';
import '../styles/Fonts.scss';
import 'normalize.css';

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
